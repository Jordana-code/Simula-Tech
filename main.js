let perguntaAtual = {};
let timeLeft = 120;
let timerId;
let acertos = 0;
let respondidas = 0;
let historicoSessoes = JSON.parse(localStorage.getItem('historicoTech') || '[]');

function toggleTema() {
    document.body.classList.toggle('light-mode');
}

function mostrarPagina(id, btn) {
    // Esconder todas as telas
    document.getElementById('sobre').classList.add('hidden');
    document.getElementById('carreira').classList.add('hidden');
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('arena').classList.add('hidden');
    
    // Mostrar a selecionada
    document.getElementById(id).classList.remove('hidden');
    
    // Atualizar estilo dos botões do menu
    document.querySelectorAll('#menu button').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
}

function iniciarSimulado() {
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('arena').classList.remove('hidden');
    document.querySelectorAll('#menu button').forEach(b => b.classList.remove('active'));
    sortearPergunta();
}

function iniciarCronometro() {
    clearInterval(timerId);
    timeLeft = 120;
    timerId = setInterval(() => {
        timeLeft--;
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        document.getElementById('timer').innerText = `${min}:${sec < 10 ? '0'+sec : sec}`;
        if(timeLeft <= 0) { 
            clearInterval(timerId); 
            alert("Tempo esgotado!"); 
            registrar(0);
        }
    }, 1000);
}

function sortearPergunta() {
    const trilha = document.getElementById('select-trilha').value;
    const nivel = document.getElementById('select-nivel').value;
    const filtradas = bancoPerguntas.filter(p => p.cat === trilha && p.nivel === nivel);
    
    perguntaAtual = filtradas[Math.floor(Math.random() * filtradas.length)];
    document.getElementById('pergunta').innerText = perguntaAtual.q;
    document.getElementById('resposta').innerText = perguntaAtual.a;
    document.getElementById('resposta').classList.add('hidden');
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('btnRevelar').classList.remove('hidden');
    iniciarCronometro();
}

function revelar() {
    document.getElementById('resposta').classList.remove('hidden');
    document.getElementById('feedback').classList.remove('hidden');
    document.getElementById('btnRevelar').classList.add('hidden');
}

function registrar(nota) {
    clearInterval(timerId);
    acertos += nota;
    respondidas++;
    if(respondidas < 5) {
        sortearPergunta();
    } else {
        const porcentagem = (acertos / 5) * 100;
        historicoSessoes.push({ data: new Date().toLocaleDateString(), score: porcentagem });
        localStorage.setItem('historicoTech', JSON.stringify(historicoSessoes));
        alert(`Simulado Finalizado! 🎉\nVocê acertou ${acertos} de 5 (${porcentagem}%).`);
        location.reload();
    }
}