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
    document.getElementById('carreiras').classList.add('hidden');
    document.getElementById('sim-setup').classList.add('hidden');
    document.getElementById('arena').classList.add('hidden');
    
    // Mostrar a selecionada
    document.getElementById(id).classList.remove('hidden');
    
    // Atualizar estilo dos botões do menu
    document.querySelectorAll('#menu button').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
}

function iniciarSimulado() {
    // Resetar variáveis para nova sessão
    acertos = 0;
    respondidas = 0;
    
    document.getElementById('sim-setup').classList.add('hidden');
    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('arena').classList.remove('hidden');
    
    sortearPergunta();
}

function iniciarCronometro() {
    clearInterval(timerId);
    timeLeft = 120;
    document.getElementById('timer').innerText = "02:00";
    
    timerId = setInterval(() => {
        timeLeft--;
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        document.getElementById('timer').innerText = `${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`;
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
    
    // Fallback caso não encontre perguntas com o filtro
    const listaSorteio = filtradas.length > 0 ? filtradas : bancoPerguntas;
    perguntaAtual = listaSorteio[Math.floor(Math.random() * listaSorteio.length)];
    
    // Atualiza metadados da arena
    document.getElementById('arena-trilha-label').innerText = trilha === 'frontend' ? 'Front-end' : 'Back-end';
    document.getElementById('arena-nivel-label').innerText = nivel === 'junior' ? 'Júnior' : 'Pleno';
    document.getElementById('arena-questao').innerText = `Questão ${respondidas + 1}/5`;
    
    // Atualiza a barra de progresso da arena
    const pctProgresso = (respondidas / 5) * 100;
    document.getElementById('arenaProgressFill').style.width = `${pctProgresso}%`;
    
    // Injeta os textos correspondentes
    document.getElementById('pergunta').innerText = perguntaAtual.q;
    document.getElementById('resposta').innerText = perguntaAtual.a;
    
    // Reseta visibilidade dos componentes de resposta
    document.getElementById('resposta-wrapper').classList.add('hidden');
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('btnRevelar').classList.remove('hidden');
    
    iniciarCronometro();
}

function revelar() {
    document.getElementById('resposta-wrapper').classList.remove('hidden');
    document.getElementById('feedback').classList.remove('hidden');
    document.getElementById('btnRevelar').classList.add('hidden');
}

function registrar(nota) {
    clearInterval(timerId);
    acertos += nota;
    respondidas++;
    
    // Atualiza a barra de progresso do painel principal de setup em paralelo
    document.getElementById('progressFill').style.width = `${(respondidas / 5) * 100}%`;
    document.getElementById('progressLabel').innerText = `${respondidas} de 5 questões`;
    document.getElementById('scoreLabel').innerText = `Score: ${Math.round((acertos / (respondidas || 1)) * 100)}%`;

    if(respondidas < 5) {
        sortearPergunta();
    } else {
        encerrarSimulado();
    }
}

function encerrarSimulado() {
    const porcentagem = (acertos / 5) * 100;
    
    // Salva sessão no histórico local
    historicoSessoes.push({ data: new Date().toLocaleDateString(), score: porcentagem });
    localStorage.setItem('historicoTech', JSON.stringify(historicoSessoes));
    
    // Altera visibilidade dos painéis
    document.getElementById('arena').classList.add('hidden');
    document.getElementById('resultado').classList.remove('hidden');
    
    // Altera feedbacks dinâmicos por pontuação
    if (porcentagem >= 80) {
        document.getElementById('resultEmoji').innerText = "🎉";
        document.getElementById('resultTitle').innerText = "Excelente!";
        document.getElementById('resultMsg').innerText = "Você demonstrou um ótimo domínio técnico. Pronto para as entrevistas!";
    } else if (porcentagem >= 50) {
        document.getElementById('resultEmoji').innerText = "💪";
        document.getElementById('resultTitle').innerText = "Bom trabalho!";
        document.getElementById('resultMsg').innerText = "Você foi bem, mas vale a pena revisar os pontos que errou para garantir a vaga.";
    } else {
        document.getElementById('resultEmoji').innerText = "📚";
        document.getElementById('resultTitle').innerText = "Continue estudando!";
        document.getElementById('resultMsg').innerText = "A prática leva à perfeição. Revise os conceitos básicos e tente novamente.";
    }
    
    // Exibe notas numéricas e gráfico em círculo
    document.getElementById('rbAcertos').innerText = acertos;
    document.getElementById('rbErros').innerText = 5 - acertos;
    document.getElementById('resultPct').innerText = `${porcentagem}%`;
    
    // Controla a animação do SVG circular de resultado (dasharray máximo = 326.7)
    const offsetCirculo = 326.7 - (326.7 * porcentagem) / 100;
    document.getElementById('scoreCircle').style.strokeDashoffset = offsetCirculo;
    
    atualizarHistoricoTela();
}

function reiniciar() {
    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('sim-setup').classList.remove('hidden');
    
    // Reseta visualmente o progresso do setup para o estado inicial
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressLabel').innerText = '0 de 5 questões';
    document.getElementById('scoreLabel').innerText = 'Score: 0%';
}

function atualizarHistoricoTela() {
    const listaEl = document.getElementById('historicoList');
    if (!listaEl) return;
    
    listaEl.innerHTML = '';
    historicoSessoes.slice(-3).reverse().forEach((sessao, index) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justify = 'space-between';
        item.style.padding = '8px 12px';
        item.style.background = 'rgba(255,255,255,0.04)';
        item.style.borderRadius = '6px';
        item.style.marginBottom = '6px';
        item.style.fontSize = '14px';
        item.innerHTML = `<span>Sessão de ${sessao.data}</span> <strong style="color: ${sessao.score >= 70 ? '#05ffa1' : '#ff71ce'}">${sessao.score}% acertos</strong>`;
        listaEl.appendChild(item);
    });
}

function limparHistorico() {
    historicoSessoes = [];
    localStorage.removeItem('historicoTech');
    atualizarHistoricoTela();
}

function selectCareer(trilha) {
    document.getElementById('select-trilha').value = trilha;
    document.getElementById('simulado').scrollIntoView({behavior:'smooth'});
}
