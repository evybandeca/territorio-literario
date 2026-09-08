# UX v1.1 — UX-01 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganizar navegação, Home e Biblioteca para reduzir tempo de decisão, destacar leitura hospedada e tornar a descoberta mais clara em desktop e mobile sem regressão de performance ou acessibilidade.

**Architecture:** Preservar HTML estático, JavaScript sem framework e CSS modular. A UX-01 introduz somente comportamento de jornada e apresentação, reutilizando `READER_REGISTRY`, estado local já existente e os componentes atuais. Nenhum schema editorial, corpus ou mecanismo de geocodificação será alterado.

**Tech Stack:** HTML, CSS, JavaScript, GitHub Pages, GitHub Actions, Playwright/Chromium, Lighthouse.

**Spec:** `docs/superpowers/specs/2026-09-08-ux-v1-1-journey-design.md`

## Global Constraints

- Cada tela deve ter uma ação principal inequívoca.
- Mobile é contexto principal de uso.
- Preservar lazy loading dos corpora.
- Não adicionar framework nem dependência runtime nova.
- Preservar `prefers-reduced-motion`, foco visível, teclado e semântica SEO.
- Não alterar schema dos corpora, `reader registry`, política de evidência, direitos/proveniência ou semântica de geocodificação.
- Manter zero rotas inferidas.
- Baseline de produção: Lighthouse Performance 99, Accessibility 100, Best Practices 100, SEO 100, FCP 0.8 s, LCP 0.8 s, TBT 0 ms, CLS 0.011.

---

### Task 1: Gate automatizado de UX-01

**Files:**
- Create: `scripts/validate-ux01.mjs`
- Modify: `.github/workflows/quality.yml`

**Interfaces:**
- Consumes: HTML e JS públicos existentes.
- Produces: gate estático de contrato UX-01 executado no CI.

- [ ] **Step 1: Escrever o teste falhando**

Criar `scripts/validate-ux01.mjs` para exigir:

```js
import fs from 'node:fs';

const read = path => fs.readFileSync(path, 'utf8');
const home = read('index.html');
const library = read('biblioteca.html');
const nav = read('js/navigation.js');
const libraryJs = read('js/biblioteca.js');

const requireText = (source, token, label) => {
  if (!source.includes(token)) throw new Error(`${label}: ausente ${token}`);
};

requireText(home, 'data-continue-reading', 'Home');
requireText(home, 'Começar por uma obra', 'Home');
requireText(library, 'id="biblioteca-filtros-toggle"', 'Biblioteca');
requireText(library, 'js/reader-registry.js', 'Biblioteca');
requireText(nav, 'aria-current="page"', 'Navegação');
requireText(libraryJs, 'READER_REGISTRY', 'Biblioteca');
requireText(libraryJs, 'Ler agora', 'Biblioteca');

console.log('UX-01 contract OK');
```

- [ ] **Step 2: Executar para confirmar RED**

Run: `node scripts/validate-ux01.mjs`

Expected: FAIL porque Home, Biblioteca e lógica atual ainda não contêm os novos contratos.

- [ ] **Step 3: Conectar o gate ao CI**

Adicionar em `.github/workflows/quality.yml`, após `Auditar páginas públicas`:

```yaml
      - name: Validar contrato UX-01
        run: node scripts/validate-ux01.mjs
```

- [ ] **Step 4: Commit do gate vermelho**

```bash
git add scripts/validate-ux01.mjs .github/workflows/quality.yml
git commit -m "test(ux): add UX-01 journey contract"
```

### Task 2: Navegação e Home orientadas a decisão

**Files:**
- Modify: `index.html`
- Modify: `js/navigation.js`
- Modify: `js/catalogo.js` only if needed to avoid duplicate home card behavior
- Modify: `css/production-polish.css` or create `css/ux-v1-1.css` if separation is clearer

**Interfaces:**
- Consumes: `localStorage` reader progress keys already written by `js/leitura.js`.
- Produces: Home with primary library action, Atlas secondary action and conditional continue-reading entry.

- [ ] **Step 1: Confirmar formato do progresso existente**

Inspecionar `js/leitura.js` e `js/reader-registry.js`. Reutilizar as chaves existentes, sem criar um segundo modelo de progresso.

- [ ] **Step 2: Implementar hierarquia do hero**

Atualizar o hero para:

```html
<a class="button button--light" href="biblioteca.html">Começar por uma obra</a>
<a class="button button--ghost" href="atlas.html">Explorar o Atlas</a>
<a class="continue-reading" data-continue-reading hidden href="leitura.html">Continuar lendo</a>
```

O link condicional deve permanecer `hidden` quando não houver progresso válido.

- [ ] **Step 3: Resolver “Continuar lendo” sem nova dependência**

Adicionar em `js/navigation.js` uma função focada:

```js
function hydrateContinueReading(){
  const links=document.querySelectorAll('[data-continue-reading]');
  if(!links.length) return;
  try{
    const raw=localStorage.getItem('tl:reader:last');
    if(!raw) return;
    const state=JSON.parse(raw);
    if(!state?.workId) return;
    links.forEach(link=>{
      const chapter=state.chapterId?`&cap=${encodeURIComponent(state.chapterId)}`:'';
      link.href=`leitura.html?id=${encodeURIComponent(state.workId)}${chapter}`;
      link.hidden=false;
    });
  }catch(_){ }
}
```

Se `js/leitura.js` usar chave ou formato diferente, adaptar exatamente ao formato real em vez de introduzir `tl:reader:last`.

- [ ] **Step 4: Melhorar estado ativo e menu mobile**

Preservar `aria-current="page"`, garantir fechamento por Escape e ao clicar em link, e impedir que menu aberto permaneça incoerente após resize para desktop.

- [ ] **Step 5: Validar manualmente estrutura estática**

Run:

```bash
node scripts/smoke-check.mjs
node scripts/audit-public-pages.mjs
node scripts/validate-ux01.mjs
```

Expected: UX-01 ainda pode falhar na parte Biblioteca, mas Home e navegação devem satisfazer seus contratos.

- [ ] **Step 6: Commit**

```bash
git add index.html js/navigation.js css/ux-v1-1.css
git commit -m "feat(ux): clarify home discovery journey"
```

### Task 3: Biblioteca orientada a escolha e leitura

**Files:**
- Modify: `biblioteca.html`
- Modify: `js/biblioteca.js`
- Modify: `css/library-work-experience.css`
- Load existing: `js/reader-registry.js`

**Interfaces:**
- Consumes: `OBRAS`, `CORPUS_PROFUNDO`, `READER_REGISTRY`.
- Produces: cards com indicador de leitura hospedada, ação secundária “Ler agora”, toolbar mobile recolhível e estados claros.

- [ ] **Step 1: Disponibilizar reader registry**

Adicionar antes de `corpus-registry.js`:

```html
<script src="js/reader-registry.js"></script>
```

- [ ] **Step 2: Adicionar controle mobile de filtros**

Estrutura mínima:

```html
<div class="library-mobile-controls">
  <button id="biblioteca-filtros-toggle" type="button" aria-expanded="false" aria-controls="biblioteca-filtros">Filtros</button>
  <p class="result-count" id="contador-obras" aria-live="polite"></p>
</div>
<div class="collection-toolbar" id="biblioteca-filtros">...</div>
```

No desktop, toolbar permanece aberta. No mobile, JS alterna classe `is-open` e `aria-expanded`.

- [ ] **Step 3: Tornar cards semanticamente bifocais sem link aninhado**

Trocar o card de um único `<a>` para um `<article>` contendo links irmãos:

```html
<article class="book-object">
  <a class="book-primary-link" href="obra.html?id=...">...</a>
  <div class="book-actions">
    <a class="book-open-work" href="obra.html?id=...">Ver obra</a>
    <a class="book-read-now" href="leitura.html?id=...">Ler agora</a>
  </div>
</article>
```

`Ler agora` só aparece quando `READER_REGISTRY[o.id]` existir e estiver habilitado pela estrutura atual do registry.

- [ ] **Step 4: Exibir sinais de decisão úteis**

No card, preservar título, autor, ano e movimento e acrescentar:

```js
const reader=globalThis.READER_REGISTRY?.[o.id];
const hasReader=Boolean(reader);
const readBadge=hasReader?'<span class="book-pill book-pill--reader">Leitura integral</span>':'';
```

Manter entidades/ocorrências somente como informação secundária.

- [ ] **Step 5: Estado sem resultados com ação de recuperação**

Usar:

```html
<div class="empty-state">
  <strong>Nenhuma obra encontrada.</strong>
  <p>Tente remover os filtros ou buscar por outro título ou autor.</p>
  <button type="button" data-clear-library>Limpar filtros</button>
</div>
```

O botão deve zerar busca e movimento, persistir e renderizar novamente.

- [ ] **Step 6: Mobile CSS**

Em até 600 px:

- busca sempre visível
- filtros secundários recolhíveis
- alvos de toque >= 44 px
- contador visível fora do painel
- cards em uma coluna a <=430 px
- sem overflow horizontal

- [ ] **Step 7: Executar gate completo**

Run:

```bash
node scripts/validate-ux01.mjs
node scripts/smoke-check.mjs
node scripts/audit-public-pages.mjs
node scripts/audit-performance-budget.mjs
node scripts/validate-corpora.mjs
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add biblioteca.html js/biblioteca.js css/library-work-experience.css
git commit -m "feat(ux): make library selection reader-aware"
```

### Task 4: QA browser e PR UX-01

**Files:**
- Modify: browser QA script/workflow only if current coverage does not exercise the new controls.
- No production data changes.

**Interfaces:**
- Consumes: UX-01 implementation.
- Produces: evidence that desktop/mobile keyboard and runtime behavior remain valid.

- [ ] **Step 1: Inspecionar cobertura Browser QA existente**

Confirmar testes para Home e Biblioteca em viewport mobile. Se inexistentes, adicionar asserts específicos para 390 px:

```js
await page.setViewportSize({width:390,height:844});
await page.goto(`${base}/biblioteca.html`);
await page.getByRole('button',{name:'Filtros'}).click();
await expect(page.locator('#biblioteca-filtros')).toHaveClass(/is-open/);
```

E Home:

```js
await page.goto(`${base}/`);
await expect(page.getByRole('link',{name:'Começar por uma obra'})).toBeVisible();
```

- [ ] **Step 2: Abrir PR UX-01**

Título:

`UX-01: melhorar descoberta, navegação e Biblioteca`

- [ ] **Step 3: Exigir CI verde no SHA final**

Validar `Verificar portal` e Browser QA aplicável. Não mergear com job pendente, falho ou cancelado.

- [ ] **Step 4: Verificar threads de revisão**

Exigir zero threads abertas antes de merge.

- [ ] **Step 5: Merge e pós-deploy**

Após merge no `main`, exigir:

- deploy GitHub Pages: success
- production smoke: success
- Lighthouse production: performance sem regressão significativa, accessibility 100, best practices 100, SEO 100

- [ ] **Step 6: Registrar baseline UX-01**

Atualizar documentação de UX somente com métricas extraídas do workflow final, nunca estimadas.
