# UX v1.1 — UX-02 Work Hub + Reader Implementation Plan

**Goal:** Tornar a página da obra um hub claro entre contexto, leitura e território e transformar o leitor mobile em uma experiência de longa permanência com índice em drawer, progresso explícito e retomada de contexto.

**Architecture:** Preservar HTML/CSS/JS estáticos, `READER_REGISTRY`, corpus e URLs atuais. O reader continua sem framework e sem dependência runtime nova. Estados persistidos permanecem em `localStorage`; a navegação por capítulo continua baseada em query string compartilhável.

**Spec:** `docs/superpowers/specs/2026-09-08-ux-v1-1-journey-design.md`

### Task 1: Gate UX-02
- Criar `scripts/validate-ux02.mjs`.
- Conectar ao workflow `quality.yml`.
- Exigir drawer mobile, progresso estruturado, CTA `Ler agora`/`Continuar leitura`, Atlas secundário quando há reader e alias legado de Policarpo preservado.
- Confirmar RED no CI antes da implementação.

### Task 2: Página da obra como hub
- Atualizar `obra.html`, `js/obra.js`, `js/reader-cta.js` e CSS existente.
- Reader disponível: leitura é ação primária e Atlas é secundária.
- Progresso salvo: CTA vira `Continuar leitura` e aponta ao capítulo salvo.
- Reader indisponível: Atlas ganha peso primário e texto externo vira ação secundária.
- Resumo territorial permanece antes do dossiê extenso.

### Task 3: Reader desktop/mobile
- Atualizar `leitura.html`, `js/leitura.js`, `css/reader.css`.
- Desktop preserva sidebar.
- Mobile usa botão `Capítulos` e drawer lateral com backdrop.
- Escape fecha drawer e devolve foco ao gatilho.
- Seleção de capítulo fecha drawer no mobile.
- Toolbar mostra `Capítulo N de total` e barra de progresso estrutural.
- A barra usa posição do capítulo no array reconhecido, não estimativa por pixels/texto.
- Persistência atual permanece compatível.

### Task 4: QA e release UX-02
- Expandir browser QA para drawer, foco, progresso e CTA de retomada.
- Exigir Quality + Browser QA verdes no SHA final.
- Merge via PR separado.
- Validar deploy, production smoke e Lighthouse.
- Não aceitar regressão significativa do baseline UX-01: 99/100/100/100; FCP 0.8s; LCP 0.8s; TBT 0ms; CLS 0.011.
