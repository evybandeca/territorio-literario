# P12 Integrated Reader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hospedar e renderizar dentro do Território Literário a leitura integral de obras elegíveis em domínio público, começando por Memórias Póstumas de Brás Cubas.

**Architecture:** Um `READER_REGISTRY` separado declara as obras legíveis e sua fonte editorial. Um script de vendoring baixa e valida a edição pública durante build/QA, gerando um arquivo local incluído no artefato do GitHub Pages. `leitura.html` carrega apenas esse arquivo local, segmenta capítulos e integra progresso, busca, Atlas e SEO sem tocar no corpus cartográfico.

**Tech Stack:** HTML/CSS/JavaScript estático, Node.js para scripts de build/QA, Playwright/Chromium e Lighthouse já existentes.

**Spec:** `docs/superpowers/specs/2026-09-08-integrated-reader-design.md`

## Global Constraints
- Sem dependências runtime novas.
- Somente obras explicitamente aprovadas no registry podem ser lidas localmente.
- O texto integral deve ser servido do mesmo domínio do portal.
- O leitor não pode carregar todos os corpora nem quebrar lazy loading.
- A fonte externa permanece registrada como proveniência, não como CTA principal.
- TDD: cada comportamento novo entra primeiro como gate que falha pelo motivo esperado.

---

### Task 1: Gate do leitor e registry

**Files:**
- Create: `scripts/reader-runtime-qa.mjs`
- Modify: `.github/workflows/browser-qa.yml`
- Create: `js/reader-registry.js`

**Interfaces:**
- Produces: `window.READER_REGISTRY`, `readerConfig(id)`.

- [ ] Criar teste Playwright que exige `leitura.html?obra=memorias-postumas&capitulo=1`, título interno, texto do capítulo, navegação próximo/anterior e URL canônica.
- [ ] Inserir o gate no browser QA e confirmar RED antes da implementação.
- [ ] Criar registry mínimo para `memorias-postumas` com fonte Gutenberg #54829, versão esperada `October 23, 2024`, arquivo `reader-content/memorias-postumas.txt` e metadados da edição 1881.

### Task 2: Vendoring reproduzível do texto

**Files:**
- Create: `scripts/vendor-reader-content.mjs`
- Modify: `.github/workflows/browser-qa.yml`
- Modify: `.github/workflows/deploy.yml`
- Modify: `.github/workflows/production-smoke.yml`

**Interfaces:**
- Consumes: `READER_REGISTRY`/manifest equivalente serializável.
- Produces: `reader-content/memorias-postumas.txt` no workspace/artefato.

- [ ] Baixar `https://www.gutenberg.org/cache/epub/54829/pg54829.txt` no build.
- [ ] Falhar se não contiver `Most recently updated: October 23, 2024`, `MACHADO DE ASSIS`, `CAPITULO I` e `CAPITULO II`.
- [ ] Remover apenas o envelope Project Gutenberg anterior ao início da obra e posterior ao fim da obra; preservar a grafia do texto.
- [ ] Gerar o arquivo local antes do servidor QA, do upload Pages e do smoke de produção.

### Task 3: Shell e motor de leitura

**Files:**
- Create: `leitura.html`
- Create: `css/reader.css`
- Create: `js/leitura.js`
- Modify: `scripts/audit-public-pages.mjs`

**Interfaces:**
- Consumes: `readerConfig(id)` e arquivo local do registry.
- Produces: leitor navegável por `obra` e `capitulo`.

- [ ] Criar layout semântico com cabeçalho, índice, artigo, controles de fonte, busca e navegação de capítulo.
- [ ] Implementar parser de capítulos por `CAPITULO <romano>` e título imediatamente subsequente.
- [ ] Implementar fallback explícito para obra/capítulo inexistente.
- [ ] Persistir último capítulo e tamanho de fonte em `localStorage` com `try/catch`.
- [ ] Atualizar `document.title`, description, canonical e JSON-LD `Book` + `Chapter`.
- [ ] Adicionar `leitura.html` à auditoria de páginas públicas.

### Task 4: Integração Obra → Leitura → Atlas

**Files:**
- Modify: `obra.html`
- Modify: `js/obra.js`
- Modify: `js/leitura.js`

**Interfaces:**
- `obra.js` consulta `readerConfig(obra.id)`.
- `leitura.js` consulta ocorrências já carregadas apenas quando disponíveis, sem forçar `loadAllCorpora()`.

- [ ] Carregar `reader-registry.js` na página da obra.
- [ ] Trocar CTA principal para `Ler esta obra` somente quando a obra estiver habilitada no registry.
- [ ] Manter a fonte externa na seção Edição-base.
- [ ] No leitor, exibir link para Atlas quando o capítulo atual possuir menções geográficas conhecidas; caso contrário ocultar o bloco.

### Task 5: Busca, progresso e acessibilidade

**Files:**
- Modify: `js/leitura.js`
- Modify: `css/reader.css`
- Modify: `scripts/reader-runtime-qa.mjs`

**Interfaces:**
- Produces: busca local, preferências e restauração de leitura.

- [ ] Implementar busca textual case-insensitive com lista de capítulos correspondentes.
- [ ] Implementar restauração do último capítulo quando `capitulo` não estiver explícito na URL.
- [ ] Adicionar `aria-live`, foco no título do capítulo após navegação e suporte completo a teclado.
- [ ] Validar viewport móvel sem overflow.

### Task 6: Produção e observabilidade

**Files:**
- Modify: `scripts/production-smoke.mjs`
- Modify: `docs/PRODUCTION_READINESS_2026-09-07.md`

**Interfaces:**
- Consumes: leitor publicado no GitHub Pages.

- [ ] Validar HTTP 200 para `leitura.html` e para `reader-content/memorias-postumas.txt`.
- [ ] Validar em produção que capítulo I renderiza texto, canonical contém obra/capítulo e não há erro de console.
- [ ] Rodar browser QA + Lighthouse + smoke de produção.
- [ ] Atualizar relatório de prontidão com P12 piloto e estado do acervo de leitura.
