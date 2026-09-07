# Atlas-Museu Editorial Imersivo — Fase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar a camada visual transversal do Território Literário sem alterar corpus, registry ou regras editoriais.

**Architecture:** Manter HTML/CSS/JS estáticos e os hooks existentes. A mudança será concentrada em tokens, base, components, pages e markup da homepage, com navegação preservando o mesmo JS. O QA atual de Chromium/Lighthouse permanece como gate de aceitação.

**Tech Stack:** HTML5, CSS custom properties, JavaScript existente, Leaflet existente, GitHub Actions, Playwright/Lighthouse já instalados no projeto.

**Spec:** `docs/superpowers/specs/2026-09-07-atlas-museu-editorial-design.md`

## Global Constraints
- Não alterar dados de corpus, registry, geocodificação ou proveniência.
- Manter Literata + Source Sans 3 e a paleta-base existente.
- Preservar IDs usados por `globo-loader.js`, `catalogo.js` e Leaflet.
- Respeitar `prefers-reduced-motion`.
- Manter teclado, foco visível e navegação mobile.
- Não adicionar dependências novas nesta fase.

---

### Task 1: Design tokens e base tipográfica

**Files:**
- Modify: `css/tokens.css`
- Modify: `css/base.css`

**Interfaces:**
- Consumes: tokens existentes `--mata`, `--papel`, `--terracota`, `--ouro`.
- Produces: novos tokens de superfície, sombra, largura e espaçamento usados pelos componentes seguintes.

- [ ] **Step 1:** adicionar tokens de superfície museológica (`--papel-claro`, `--papel-profundo`, `--vidro`, `--sombra-suave`, `--sombra-profunda`, `--max-w-wide`).
- [ ] **Step 2:** ampliar escala tipográfica e espaçamento de seções usando `clamp()` sem quebrar mobile.
- [ ] **Step 3:** manter foco visível e reduced-motion existentes.
- [ ] **Step 4:** rodar `node scripts/audit-performance-budget.mjs` e confirmar PASS.

### Task 2: Header e componentes editoriais

**Files:**
- Modify: `css/components.css`
- Verify: `js/navigation.js`

**Interfaces:**
- Consumes: HTML do header gerado por `js/navigation.js`.
- Produces: header translúcido/refinado, navegação desktop/mobile, botões e cards editoriais.

- [ ] **Step 1:** transformar o header em barra museológica com borda, blur e contraste controlados.
- [ ] **Step 2:** refinar brand mark, estados ativos e menu mobile sem mudar seletores usados pelo JS.
- [ ] **Step 3:** substituir aparência genérica dos cards por superfícies editoriais com linha, numeração/metadata e hover sutil.
- [ ] **Step 4:** manter todos os controles navegáveis por teclado.

### Task 3: Homepage narrativa

**Files:**
- Modify: `index.html`
- Modify: `css/pages.css`

**Interfaces:**
- Consumes: `#globo-canvas`, `#globo-dica`, `#mapa-geral`, `#timeline`, `#catalogo`.
- Produces: hero editorial, portas de entrada, curadoria, atlas preview e biblioteca preview com nova hierarquia.

- [ ] **Step 1:** preservar todos os IDs consumidos pelo JS e reorganizar apenas wrappers/classes.
- [ ] **Step 2:** criar hero com placa curatorial, manifesto curto, CTAs e estatística editorial discreta.
- [ ] **Step 3:** trocar a seção “Descobrir” por três entradas editoriais numeradas, visualmente distintas.
- [ ] **Step 4:** transformar “Obras para começar” em coleção editorial com cards de capa abstrata via CSS, sem imagens externas.
- [ ] **Step 5:** elevar a prévia do Atlas com moldura de mapa tipo mesa/cartoteca.
- [ ] **Step 6:** refinar biblioteca/timeline como faixa de acervo, sem alterar hooks JS.

### Task 4: Responsividade e QA

**Files:**
- Modify: `css/components.css`
- Modify: `css/pages.css`

**Interfaces:**
- Consumes: layout da homepage e header.
- Produces: comportamento robusto em 360–430 px, tablet e desktop largo.

- [ ] **Step 1:** revisar hero e navegação em `max-width: 900px` e `640px`.
- [ ] **Step 2:** impedir overflow horizontal e garantir CTAs com área de toque adequada.
- [ ] **Step 3:** confirmar que o globo continua utilizável e não encobre texto essencial no mobile.
- [ ] **Step 4:** abrir PR e rodar `Verificar portal` + `QA real de navegador`.
- [ ] **Step 5:** mesclar apenas se smoke, auditorias, Chromium e Lighthouse concluírem com sucesso.
