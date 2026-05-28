# 🧠 SimulaTech — Plataforma de Simulação de Entrevistas Técnicas

> **"Ace sua próxima entrevista tech."**  
> Treine com perguntas reais, cronômetro integrado e feedback imediato. Do júnior ao pleno.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Usar](#-como-usar) 
- [Trilhas e Níveis](#-trilhas-e-níveis)
- [Banco de Perguntas](#-banco-de-perguntas)
- [Armazenamento de Dados](#-armazenamento-de-dados)
- [Responsividade](#-responsividade)
- [Desenvolvedores](#-desenvolvedores)

---

## 📖 Sobre o Projeto

O **SimulaTech** é uma aplicação web voltada para desenvolvedores que desejam se preparar para entrevistas técnicas. A plataforma simula o ambiente de uma entrevista real, com perguntas selecionadas das áreas de **Front-end** e **Back-end**, organizadas por nível de senioridade (**Júnior** e **Pleno**).

A ideia é simples: o candidato recebe uma pergunta, tem **2 minutos** para pensar, revela a resposta esperada, se auto-avalia e avança. Ao final de 5 questões, um relatório com o desempenho é exibido e salvo no histórico local do navegador.

O projeto foi desenvolvido com foco em:

- Experiência de usuário limpa e moderna
- Design dark com estética tech
- Funcionamento 100% no navegador, sem backend
- Leveza e performance (apenas HTML, CSS e JavaScript puro)

---

## ✨ Funcionalidades

### ⏱️ Cronômetro Real
Cada questão tem um limite de **2 minutos** (120 segundos). O timer é exibido de forma destacada na arena e zera automaticamente quando o tempo acaba, registrando a questão como errada.

### 🎯 Seleção de Trilha e Nível
Antes de iniciar, o usuário escolhe:
- **Trilha:** Front-end ou Back-end
- **Nível:** Júnior ou Pleno

O sistema sorteia aleatoriamente 5 perguntas do banco correspondente.

### 👁️ Revelar Resposta
O usuário pensa na resposta antes de revelá-la. Quando pronto, clica em **"Revelar Resposta"** para ver a resposta esperada e então se auto-avalia.

### ✅ Auto-avaliação
Após visualizar a resposta, o usuário registra se **acertou** ou **errou**. Essa honestidade é fundamental para o aprendizado.

### 📊 Resultado por Sessão
Ao finalizar as 5 questões, uma tela de resultado exibe:
- Percentual de acertos com animação de círculo SVG
- Número de acertos e erros
- Histórico de todas as sessões anteriores

### 📜 Histórico de Sessões
Cada sessão finalizada é salva no **localStorage** do navegador com a data e o score. O histórico persiste entre visitas e pode ser limpo manualmente.

### 🌐 Navegação por Seções
A landing page conta com 4 seções navegáveis via menu fixo:
- **Início** — Hero com estatísticas e cards flutuantes
- **Sobre** — Apresentação das features da plataforma
- **Carreiras** — Cards de trilhas disponíveis
- **Simulado** — A arena de perguntas

### 📱 Menu Mobile (Hamburger)
Em telas menores, o menu de navegação colapsa em um ícone hamburguer com um menu deslizante.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica da página |
| **CSS3** | Estilização, animações, layout com Flexbox e Grid |
| **JavaScript (ES6+)** | Lógica do simulado, timer, histórico, DOM manipulation |
| **Google Fonts** | Tipografias: *Syne* (títulos) e *DM Sans* (corpo) |
| **localStorage API** | Persistência do histórico de sessões no navegador |
| **SVG** | Ícones inline e círculo de progresso animado |

Nenhuma biblioteca ou framework externo foi utilizado — o projeto roda com **HTML, CSS e JavaScript puros**.

---

## 📁 Estrutura do Projeto

```
simulatech/
│
├── index.html        # Estrutura HTML completa da aplicação
├── style.css         # Estilos globais, temas, componentes e responsividade
├── main.js           # Lógica principal: timer, sorteio, registro e histórico
├── perguntas.js      # Banco de perguntas (array bancoPerguntas)
└── cerebro.png       # Favicon e identidade visual da plataforma
```

### Descrição dos arquivos

**`index.html`**  
Contém toda a marcação da aplicação, dividida em seções: `#hero`, `#sobre`, `#carreiras`, `#simulado` e `footer`. A arena do simulado é composta por três painéis (`#sim-setup`, `#arena`, `#resultado`) que alternam visibilidade via classes CSS.

**`style.css`**  
Define o tema dark com variáveis CSS customizadas, além de animações, efeitos de glow, gradientes e layout responsivo para mobile e desktop.

**`main.js`**  
Centraliza toda a lógica JavaScript:
- `iniciarSimulado()` — inicia a sessão de perguntas
- `sortearPergunta()` — filtra e sorteia aleatoriamente do banco
- `iniciarCronometro()` — controla o timer regressivo de 120s
- `revelar()` — exibe a resposta esperada
- `registrar(nota)` — salva o resultado e avança ou finaliza a sessão

**`perguntas.js`**  
Exporta o array global `bancoPerguntas` com mais de **120 perguntas** divididas por `cat` (categoria) e `nivel`.

---

## 🚀 Como Usar

### Abrir diretamente no navegador

Não é necessário nenhum servidor ou instalação. Basta:

1. Acessar o link a seguir em seu navegador:

[Simula Tech](https://jordana-code.github.io/Simula-Tech/)

---

## 🗂️ Trilhas e Níveis

### 🖥️ Front-end

| Nível | Exemplos de temas abordados |
|---|---|
| **Júnior** | DOM, Box Model, Flexbox, eventos JS, localStorage, seletores CSS, callbacks, arrays, responsividade |
| **Pleno** | Virtual DOM, React Hooks, Promises, Closures, Event Loop, CORS, TypeScript, Web Workers, PWA, Redux |

### ⚙️ Back-end

| Nível | Exemplos de temas abordados |
|---|---|
| **Júnior** | REST API, SQL, HTTP status codes, Git, Docker, CRUD, autenticação, variáveis de ambiente, JSON |
| **Pleno** | JWT, Middleware, ACID, Redis, OAuth2, CI/CD, WebSockets, mensageria, rate limiting, sharding, Kubernetes |

---

## 📚 Banco de Perguntas

O banco (`bancoPerguntas`) é um array de objetos JavaScript com a seguinte estrutura:

```javascript
{
  q: "O que é o Virtual DOM?",       // Pergunta
  a: "Cópia leve para otimizar renderizações.", // Resposta esperada
  cat: "frontend",                    // Categoria: "frontend" | "backend"
  nivel: "pleno"                      // Nível: "junior" | "pleno"
}
```

### Distribuição atual

| Categoria | Nível | Quantidade |
|---|---|---|
| Front-end | Júnior | 30 perguntas |
| Front-end | Pleno | 30 perguntas |
| Back-end | Júnior | 30 perguntas |
| Back-end | Pleno | 30 perguntas |
| **Total** | | **120 perguntas** |

Para adicionar novas perguntas, basta inserir novos objetos no array `bancoPerguntas` dentro do arquivo `perguntas.js`, seguindo o modelo acima.

---

## 💾 Armazenamento de Dados

O SimulaTech utiliza o **localStorage** do navegador para salvar o histórico de sessões. Nenhum dado é enviado para servidores externos.

```javascript
// Estrutura salva no localStorage
// Chave: 'historicoTech'
// Valor: array de objetos
[
  { data: "27/05/2026", score: 80 },
  { data: "26/05/2026", score: 60 },
  // ...
]
```

- Os dados persistem entre sessões e fechamentos do navegador
- O histórico pode ser apagado pelo botão **"Limpar histórico"** na tela de resultado
- Os dados são armazenados apenas localmente, sem coleta ou rastreamento

---

## 📱 Responsividade

O layout é totalmente responsivo e adaptado para diferentes tamanhos de tela:

- **Desktop (> 768px):** Layout completo com hero em duas colunas, cards flutuantes e navegação horizontal
- **Tablet / Mobile (≤ 768px):** Menu hamburguer, colunas empilhadas, cards adaptados e fonte redimensionada

---

## 👨‍💻 Desenvolvedores

Este projeto foi desenvolvido com dedicação por:

| Nome | Papel |
|---|---|
| **Jordana Moreira** | Desenvolvedora |
| **Caio Goddoy** | Desenvolvedor |
| **Gabriella Lima** | Desenvolvedora |

---

<div align="center">
  <p>Feito com 💜 para a comunidade dev brasileira.</p>
  <p><strong>© 2026 SimulaTech</strong> · Todos os dados são salvos localmente no seu navegador.</p>
</div>
