const times = {
    cfc: 'CFC',
    estressados: 'Estressados FC',
    chupisco: 'Chupisco FC',
    monobola: 'Monobola RFC'
  };
  
  const odds = {
    cfc: 7.00, // Odds para o time mais fraco (CFC)
    estressados: 4.00, // Odds para Estressados FC
    chupisco: 1.50, // Odds para Chupisco FC
    monobola: 2.50 // Odds para o time mais forte (Monobola RFC)
  };
  
  const chaves = Object.keys(times);
  
  // Inicializa votos
  if (!localStorage.getItem('votos_jogos')) {
    const votos = {};
    // Gera todos os jogos possíveis entre os times
    for (let i = 0; i < chaves.length; i++) {
      for (let j = i + 1; j < chaves.length; j++) {
        const jogo = `${chaves[i]}_vs_${chaves[j]}`;
        votos[jogo] = { [chaves[i]]: 0, [chaves[j]]: 0 };
      }
    }
    localStorage.setItem('votos_jogos', JSON.stringify(votos));
  }
  
  if (!localStorage.getItem('votos_final')) {
    const votosFinal = { cfc: 0, estressados: 0, chupisco: 0, monobola: 0 };
    localStorage.setItem('votos_final', JSON.stringify(votosFinal));
  }
  
  function criarBotoesDeJogo() {
    const votos = JSON.parse(localStorage.getItem('votos_jogos'));
    const jogosDiv = document.getElementById('jogos-section');
    
    // Gera todos os jogos entre os times
    for (let i = 0; i < chaves.length; i++) {
      for (let j = i + 1; j < chaves.length; j++) {
        const a = chaves[i];
        const b = chaves[j];
        const jogoId = `${a}_vs_${b}`;
        const jogoDiv = document.createElement('div');
        jogoDiv.className = 'jogo';
        jogoDiv.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
            <div style="flex: 1; text-align: left;">
              <img src="img/${a === 'cfc' ? 'cabaco.jpg' : a + '.jpg'}" alt="${times[a]} Logo" class="team-logo">
              <strong>${times[a]}</strong>
            </div>
            <div style="flex: 0 0 auto; text-align: center;">vs</div>
            <div style="flex: 1; text-align: right;">
              <strong>${times[b]}</strong>
              <img src="img/${b === 'cfc' ? 'cabaco.jpg' : b + '.jpg'}" alt="${times[b]} Logo" class="team-logo">
            </div>
          </div>
  
          <div class="button-group">
            <button onclick="votarJogo('${jogoId}', '${a}')">${times[a]}</button>
            <button onclick="votarJogo('${jogoId}', '${b}')">${times[b]}</button>
          </div>
  
          <div class="odds" style="text-align: center;">
            Odds: R$ ${odds[a].toFixed(2)} vs R$ ${odds[b].toFixed(2)}
          </div>
  
          <div style="text-align: center;">
            <small>${times[a]}: ${votos[jogoId][a]} | ${times[b]}: ${votos[jogoId][b]}</small>
          </div>
        `;
        jogosDiv.appendChild(jogoDiv);
      }
    }
  }
  
  function votarJogo(jogoId, time) {
    const votos = JSON.parse(localStorage.getItem('votos_jogos'));
    votos[jogoId][time]++;
    localStorage.setItem('votos_jogos', JSON.stringify(votos));
    location.reload(); // Atualiza contagem
  }
  
  function votarFinal(time) {
    const votosFinal = JSON.parse(localStorage.getItem('votos_final'));
    votosFinal[time]++;
    localStorage.setItem('votos_final', JSON.stringify(votosFinal));
    atualizarFinal();
  }
  
  function atualizarFinal() {
    const votos = JSON.parse(localStorage.getItem('votos_final'));
    document.getElementById('final-cfc').innerText = votos.cfc;
    document.getElementById('final-estressados').innerText = votos.estressados;
    document.getElementById('final-chupisco').innerText = votos.chupisco;
    document.getElementById('final-monobola').innerText = votos.monobola;
  }
  
  criarBotoesDeJogo();
  atualizarFinal();
  