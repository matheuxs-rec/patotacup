const times = {
    cfc: 'CFC',
    estressados: 'Estressados FC',
    chupisco: 'Chupisco FC',
    monobola: 'Monobola RFC'
  };
  
  const odds = {
    cfc: 7.00,
    estressados: 4.00,
    chupisco: 1.50,
    monobola: 2.50
  };
  
  const chaves = Object.keys(times);
  
  // Inicializa votos
  if (!localStorage.getItem('votos_jogos')) {
    const votos = {};
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
    
    for (let i = 0; i < chaves.length; i++) {
      for (let j = i + 1; j < chaves.length; j++) {
        const a = chaves[i];
        const b = chaves[j];
        const jogoId = `${a}_vs_${b}`;
        const jogoDiv = document.createElement('div');
        jogoDiv.className = 'jogo';
        jogoDiv.innerHTML = `
          <span>
            <img src="img/${a === 'cfc' ? 'cabaco.jpg' : a + '.jpg'}" alt="${times[a]} Logo" class="team-logo">${times[a]} vs 
            <img src="img/${b === 'cfc' ? 'cabaco.jpg' : b + '.jpg'}" alt="${times[b]} Logo" class="team-logo">${times[b]}
          </span>
          <div class="button-group">
            <button onclick="votarJogo('${jogoId}', '${a}')">${times[a]}</button>
            <button onclick="votarJogo('${jogoId}', '${b}')">${times[b]}</button>
          </div>
          <div class="odds">
            <span>Odds: R$ ${odds[a].toFixed(2)} vs R$ ${odds[b].toFixed(2)}</span>
          </div>
          <div>
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
    location.reload();
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
  