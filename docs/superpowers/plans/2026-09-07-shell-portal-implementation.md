# Território Literário — Shell do Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar um shell completo, elegante, navegável e responsivo para o Território Literário, sem quebrar o acervo e o deploy atuais.

**Architecture:** Manter HTML estático, CSS modular, JavaScript modular, Leaflet, Three.js e GitHub Pages. A Fase A cria a camada pública de navegação e apresentação, deixando o schema legado `OBRAS[].lugares` intacto e adiando a migração `PLACE_ENTITY` / `PLACE_MENTION` para uma fase posterior.

**Tech Stack:** HTML5, CSS3, JavaScript ES6, Leaflet 1.9.4, Three.js, GitHub Pages, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-07-territorio-literario-portal-design.md`

## Global Constraints

- Manter HTML estático, CSS modular, JavaScript modular, Leaflet, Three.js e GitHub Pages nesta fase.
- Não migrar para React, Next.js, banco de dados ou PostGIS.
- Preservar `OBRAS[].lugares`, `tipo`, `escala` e `certeza` sem alteração semântica nesta fase.
- Nenhum menu pode levar a 404.
- Conteúdo ausente não deve gerar placeholder vazio.
- Navegação por teclado, foco visível e contraste adequado são requisitos mínimos.
- Nenhuma informação cartográfica nova pode ser inferida nesta fase.
- Deploy deve continuar automatizado por `.github/workflows/deploy.yml`.

---

## Mapa de arquivos

### Criar
- `biblioteca.html` — página integral do acervo e filtros.
- `autores.html` — índice de autores.
- `sobre.html` — propósito, metodologia e critérios editoriais.
- `linha-do-tempo.html` — cronologia do acervo.
- `js/site.js` — navegação global, menu mobile, utilitários de shell.
- `js/biblioteca.js` — filtros e ordenação da biblioteca.
- `js/autores.js` — agregação e renderização de autores.
- `js/timeline.js` — construção da linha do tempo.
- `css/tokens.css` — variáveis de design.
- `css/base.css` — reset, tipografia, layout base e acessibilidade.
- `css/components.css` — cabeçalho, navegação, cartões, botões, filtros e rodapé.
- `css/pages.css` — estilos específicos das páginas.
- `robots.txt` — política de rastreamento.
- `sitemap.xml` — páginas estáticas públicas.
- `README.md` — visão do projeto, execução e estrutura.
- `assets/favicon.svg` — favicon vetorial simples e textual.
- `tests/smoke.mjs` — verificação estática de páginas, links e referências.

### Modificar
- `index.html` — nova homepage e navegação global.
- `atlas.html` — adotar shell global sem redesenho profundo do Atlas nesta fase.
- `obra.html` — adotar shell global sem alterar lógica editorial profunda nesta fase.
- `css/style.css` — virar arquivo compatível que importa os módulos CSS novos durante a transição.
- `.github/workflows/deploy.yml` — adicionar smoke test antes do upload do Pages.

### Preservar
- `js/data.js`
- `js/lugares.js`
- `js/atlas.js`
- `js/catalogo.js`
- `js/globo.js`
- `js/obra.js`
- `js/corpus/*`

---

### Task 1: Criar smoke test estático do portal

**Files:**
- Create: `tests/smoke.mjs`
- Modify: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: arquivos HTML/CSS/JS do repositório.
- Produces: comando `node tests/smoke.mjs` com exit code 0 em sucesso e 1 em falha.

- [ ] **Step 1: Escrever o teste inicialmente falhando**

Criar `tests/smoke.mjs` com verificação explícita para os arquivos finais ainda inexistentes:

```js
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'index.html',
  'atlas.html',
  'obra.html',
  'biblioteca.html',
  'autores.html',
  'sobre.html',
  'linha-do-tempo.html',
  'robots.txt',
  'sitemap.xml',
  'README.md',
  'assets/favicon.svg'
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error(`Arquivos ausentes: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Smoke test: estrutura mínima presente.');
```

- [ ] **Step 2: Executar para confirmar falha**

Run:

```bash
node tests/smoke.mjs
```

Expected: FAIL listando pelo menos `biblioteca.html`, `autores.html`, `sobre.html` e `linha-do-tempo.html`.

- [ ] **Step 3: Adicionar o smoke test ao workflow antes do artefato**

Inserir após o checkout:

```yaml
      - name: Validar estrutura do portal
        run: node tests/smoke.mjs
```

- [ ] **Step 4: Commit**

```bash
git add tests/smoke.mjs .github/workflows/deploy.yml
git commit -m "test: add portal smoke validation"
```

---

### Task 2: Modularizar a base visual sem quebrar páginas existentes

**Files:**
- Create: `css/tokens.css`
- Create: `css/base.css`
- Create: `css/components.css`
- Create: `css/pages.css`
- Modify: `css/style.css`

**Interfaces:**
- Consumes: paleta, tipografia e classes públicas já existentes.
- Produces: `style.css` compatível, importando os quatro módulos.

- [ ] **Step 1: Criar tokens**

`css/tokens.css` deve declarar exatamente:

```css
:root {
  --mata: #183a32;
  --mata-fraca: #2a4d43;
  --terracota: #a45535;
  --urucum: #c45132;
  --papel: #f1ebdd;
  --papel-forte: #e6ddc7;
  --tinta: #20211f;
  --tinta-suave: #57544a;
  --atlantico: #274c59;
  --ouro: #b08a4a;
  --linha: #c9bb9c;
  --linha-forte: #a8987a;
  --max-w: 1180px;
  --content-w: 760px;
  --radius-sm: 6px;
  --radius-md: 12px;
  --shadow-soft: 0 10px 30px rgba(32, 33, 31, 0.08);
}
```

- [ ] **Step 2: Mover estilos globais para `base.css`**

Incluir import de Google Fonts, box sizing, body, links, headings, foco, container e `prefers-reduced-motion`:

```css
@import url('https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,500&family=Source+Sans+3:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--papel);
  color: var(--tinta);
  font-family: 'Literata', Georgia, serif;
  font-size: 17px;
  line-height: 1.65;
}
img { max-width: 100%; }
a { color: var(--terracota); text-underline-offset: 3px; }
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
  outline: 3px solid var(--ouro);
  outline-offset: 3px;
}
.container { width: min(calc(100% - 2rem), var(--max-w)); margin-inline: auto; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

- [ ] **Step 3: Extrair componentes reutilizáveis para `components.css`**

Criar classes para `.site-header`, `.site-nav`, `.site-nav-toggle`, `.site-footer`, `.button`, `.card`, `.section-kicker`, `.section-title`, `.filter-bar`, `.stat-card`, `.breadcrumbs`.

- [ ] **Step 4: Levar estilos específicos das páginas para `pages.css`**

Mover estilos de hero, Atlas, obra, mapa, timeline e catálogo, preservando nomes de classes existentes nesta fase.

- [ ] **Step 5: Tornar `style.css` um agregador compatível**

```css
@import url('./tokens.css');
@import url('./base.css');
@import url('./components.css');
@import url('./pages.css');
```

- [ ] **Step 6: Verificar que nenhum HTML precisa mudar ainda**

Run:

```bash
node tests/smoke.mjs
```

Expected: ainda FAIL apenas por páginas ausentes, sem falha relacionada aos CSS existentes.

- [ ] **Step 7: Commit**

```bash
git add css/
git commit -m "refactor: modularize portal styles"
```

---

### Task 3: Implementar navegação global acessível

**Files:**
- Create: `js/site.js`
- Modify: `index.html`
- Modify: `atlas.html`
- Modify: `obra.html`

**Interfaces:**
- Consumes: `data-page` no `<body>`.
- Produces: menu desktop e mobile com `aria-expanded` atualizado pelo `site.js`.

- [ ] **Step 1: Criar `js/site.js`**

```js
(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.dataset.open = String(!open);
  });
})();
```

- [ ] **Step 2: Substituir a navegação de `index.html` por shell global**

Usar esta estrutura:

```html
<header class="site-header">
  <div class="container site-header-inner">
    <a class="site-brand" href="index.html" aria-label="Território Literário, início">
      <span>Território</span><strong>Literário</strong>
    </a>
    <button class="site-nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="site-nav" id="site-nav" data-nav aria-label="Navegação principal">
      <a href="atlas.html">Atlas</a>
      <a href="biblioteca.html">Biblioteca</a>
      <a href="autores.html">Autores</a>
      <a href="linha-do-tempo.html">Linha do Tempo</a>
      <a href="sobre.html">Sobre</a>
    </nav>
  </div>
</header>
```

- [ ] **Step 3: Repetir o shell em `atlas.html` e `obra.html`**

Marcar `aria-current="page"` no link correspondente quando aplicável.

- [ ] **Step 4: Carregar `js/site.js` no fim de cada página**

```html
<script src="js/site.js"></script>
```

- [ ] **Step 5: Testar teclado e menu mobile manualmente**

Verificar Tab, Shift+Tab e Enter/Space no botão Menu.

- [ ] **Step 6: Commit**

```bash
git add js/site.js index.html atlas.html obra.html
git commit -m "feat: add global accessible navigation"
```

---

### Task 4: Redesenhar a homepage como portal editorial

**Files:**
- Modify: `index.html`
- Modify: `js/catalogo.js`
- Modify: `css/pages.css`

**Interfaces:**
- Consumes: `OBRAS`, `MOVIMENTOS`, `globo.js`.
- Produces: hero, descobertas editoriais, obras em destaque, prévia do Atlas e amostra da Biblioteca.

- [ ] **Step 1: Manter o globo, mas reorganizar o hero**

Hero deve conter marca, assinatura, texto curto e CTAs:

```html
<a class="button button-primary" href="atlas.html">Explorar o Atlas</a>
<a class="button button-secondary" href="biblioteca.html">Abrir a Biblioteca</a>
```

- [ ] **Step 2: Criar seção editorial “Descobrir o Brasil pela literatura”**

Adicionar quatro cards estáticos de curadoria que apontam para filtros ou páginas existentes sem inventar conteúdo novo:

- Rio de Janeiro na literatura
- Sertões brasileiros
- Romantismo e construção nacional
- Machado de Assis

- [ ] **Step 3: Criar módulo “Obras em destaque”**

Selecionar IDs existentes em `OBRAS`:

```js
const DESTAQUES_HOME = ['memorias-postumas', 'o-guarani', 'iracema', 'os-sertoes'];
```

Renderizar apenas se o ID existir.

- [ ] **Step 4: Transformar o mapa geral em prévia do Atlas**

Reduzir texto e adicionar CTA final para `atlas.html`.

- [ ] **Step 5: Remover catálogo integral da homepage**

Manter no máximo 8 obras em uma amostra “Da Biblioteca”, com CTA para `biblioteca.html`.

- [ ] **Step 6: Verificar responsividade em 375px, 768px e desktop**

- [ ] **Step 7: Commit**

```bash
git add index.html js/catalogo.js css/pages.css
git commit -m "feat: redesign editorial homepage"
```

---

### Task 5: Criar Biblioteca completa com busca, filtros e ordenação

**Files:**
- Create: `biblioteca.html`
- Create: `js/biblioteca.js`
- Modify: `css/pages.css`

**Interfaces:**
- Consumes: global `OBRAS` e `MOVIMENTOS` de `js/data.js`.
- Produces: `renderBiblioteca()`, filtros por texto, movimento e ordenação.

- [ ] **Step 1: Criar HTML da Biblioteca**

Incluir shell global, título, descrição, busca, select de movimento e select de ordenação:

```html
<input id="biblioteca-busca" type="search" placeholder="Buscar obra ou autor">
<select id="biblioteca-movimento"><option value="">Todos os movimentos</option></select>
<select id="biblioteca-ordem">
  <option value="cronologica">Ordem cronológica</option>
  <option value="alfabetica">Ordem alfabética</option>
</select>
<div id="biblioteca-resultados"></div>
```

- [ ] **Step 2: Implementar normalização de busca**

```js
function normalizar(texto = '') {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
```

- [ ] **Step 3: Implementar filtro e ordenação**

```js
function filtrarObras({ busca, movimento, ordem }) {
  const termo = normalizar(busca);
  const lista = OBRAS.filter((obra) => {
    const alvo = normalizar(`${obra.titulo} ${obra.autor}`);
    return (!termo || alvo.includes(termo)) && (!movimento || obra.movimento === movimento);
  });

  return lista.sort((a, b) => ordem === 'alfabetica'
    ? a.titulo.localeCompare(b.titulo, 'pt-BR')
    : a.ano - b.ano);
}
```

- [ ] **Step 4: Renderizar cards com links para `obra.html?id=`**

- [ ] **Step 5: Criar estado vazio**

```html
<p class="empty-state">Nenhuma obra corresponde aos filtros selecionados.</p>
```

- [ ] **Step 6: Testar busca sem acento**

Buscar `Memorias`, `Gregorio`, `Sertoes` e confirmar correspondência.

- [ ] **Step 7: Commit**

```bash
git add biblioteca.html js/biblioteca.js css/pages.css
git commit -m "feat: add searchable literature library"
```

---

### Task 6: Criar índice de autores

**Files:**
- Create: `autores.html`
- Create: `js/autores.js`
- Modify: `css/pages.css`

**Interfaces:**
- Consumes: `OBRAS`.
- Produces: lista agregada de autores com quantidade de obras, movimentos e territórios registrados.

- [ ] **Step 1: Agregar autores a partir de `OBRAS`**

```js
function agregarAutores() {
  const mapa = new Map();
  for (const obra of OBRAS) {
    const atual = mapa.get(obra.autor) || { nome: obra.autor, obras: [], movimentos: new Set(), lugares: new Set() };
    atual.obras.push(obra);
    atual.movimentos.add(obra.movimento);
    for (const lugar of obra.lugares || []) atual.lugares.add(lugar.nome);
    mapa.set(obra.autor, atual);
  }
  return [...mapa.values()].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}
```

- [ ] **Step 2: Criar busca por autor**

Usar a mesma função `normalizar` localmente nesta fase.

- [ ] **Step 3: Renderizar cards de autor**

Cada card deve mostrar nome, número de obras, movimentos e número de lugares associados.

- [ ] **Step 4: Não criar links para `autor.html` ainda**

Como a página individual pertence à Fase B, o card é informativo nesta fase e não deve apontar para uma rota inexistente.

- [ ] **Step 5: Commit**

```bash
git add autores.html js/autores.js css/pages.css
git commit -m "feat: add authors index"
```

---

### Task 7: Criar página Sobre e Metodologia

**Files:**
- Create: `sobre.html`
- Modify: `css/pages.css`

**Interfaces:**
- Consumes: especificação canônica como fonte editorial.
- Produces: documentação pública de propósito, método e incerteza.

- [ ] **Step 1: Criar estrutura semântica**

Seções obrigatórias:

```text
O projeto
Como selecionamos as obras
Como tratamos os lugares
Tipo, escala e certeza
Rotas
Fontes e proveniência
Domínio público
Limites e revisão editorial
```

- [ ] **Step 2: Definir publicamente os três eixos**

Texto deve dizer de forma inequívoca:

```text
Tipo responde por que o lugar importa na obra.
Escala descreve o tamanho ou granularidade do referente geográfico.
Certeza informa quão defensável é a representação cartográfica utilizada.
```

- [ ] **Step 3: Incluir regra de rotas**

```text
A presença de dois ou mais lugares em uma obra não implica percurso entre eles. Linhas cartográficas só são exibidas quando o deslocamento é explicitamente sustentado por evidência textual ou documental.
```

- [ ] **Step 4: Commit**

```bash
git add sobre.html css/pages.css
git commit -m "feat: publish editorial methodology"
```

---

### Task 8: Criar Linha do Tempo do acervo

**Files:**
- Create: `linha-do-tempo.html`
- Create: `js/timeline.js`
- Modify: `css/pages.css`

**Interfaces:**
- Consumes: `OBRAS` e `MOVIMENTOS`.
- Produces: agrupamento por década e movimento, sem misturar ano de publicação com período narrativo.

- [ ] **Step 1: Agrupar obras por década**

```js
function decada(ano) {
  return Math.floor(ano / 10) * 10;
}
```

- [ ] **Step 2: Ordenar cronologicamente**

```js
const obras = [...OBRAS].sort((a, b) => a.ano - b.ano);
```

- [ ] **Step 3: Renderizar blocos de década**

Cada obra mostra ano, título, autor e movimento, com link para `obra.html?id=`.

- [ ] **Step 4: Adicionar nota metodológica**

Explicar que a cronologia usa ano de publicação e não período narrativo.

- [ ] **Step 5: Commit**

```bash
git add linha-do-tempo.html js/timeline.js css/pages.css
git commit -m "feat: add literature timeline"
```

---

### Task 9: Padronizar rodapé, favicon e metadados

**Files:**
- Create: `assets/favicon.svg`
- Modify: `index.html`
- Modify: `atlas.html`
- Modify: `obra.html`
- Modify: `biblioteca.html`
- Modify: `autores.html`
- Modify: `sobre.html`
- Modify: `linha-do-tempo.html`

**Interfaces:**
- Consumes: páginas públicas.
- Produces: favicon, meta description, Open Graph básico e rodapé consistente.

- [ ] **Step 1: Criar favicon SVG simples**

Usar símbolo geométrico abstrato de página/mapa, sem imagem externa.

- [ ] **Step 2: Adicionar em todas as páginas**

```html
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
```

- [ ] **Step 3: Garantir título e description específicos**

- [ ] **Step 4: Adicionar Open Graph básico**

```html
<meta property="og:site_name" content="Território Literário">
<meta property="og:type" content="website">
```

- [ ] **Step 5: Padronizar rodapé**

Rodapé deve conter links para Biblioteca, Atlas, Autores, Linha do Tempo e Sobre, além de nota curta de domínio público e metodologia.

- [ ] **Step 6: Commit**

```bash
git add assets/favicon.svg *.html
git commit -m "feat: add portal metadata and identity"
```

---

### Task 10: Criar SEO técnico e documentação do repositório

**Files:**
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `README.md`

**Interfaces:**
- Consumes: URLs públicas estáticas.
- Produces: arquivos de rastreamento e documentação do projeto.

- [ ] **Step 1: Criar `robots.txt`**

```txt
User-agent: *
Allow: /
Sitemap: https://evybandeca.github.io/territorio-literario/sitemap.xml
```

- [ ] **Step 2: Criar sitemap apenas com páginas estáticas existentes**

Incluir:

```text
/
/atlas.html
/biblioteca.html
/autores.html
/linha-do-tempo.html
/sobre.html
```

Não listar `obra.html?id=` nesta fase porque o sitemap estático não deve fingir URLs canônicas individuais não geradas.

- [ ] **Step 3: Criar README**

Seções:

```text
Território Literário
Objetivo
Estado atual
Arquitetura
Estrutura de dados
Rodar localmente
Deploy
Metodologia editorial
Roadmap
```

Rodar localmente com:

```bash
python3 -m http.server 8000
```

- [ ] **Step 4: Commit**

```bash
git add robots.txt sitemap.xml README.md
git commit -m "docs: add SEO files and project README"
```

---

### Task 11: Expandir smoke test para links, assets e scripts

**Files:**
- Modify: `tests/smoke.mjs`

**Interfaces:**
- Consumes: todos os HTML públicos.
- Produces: gate automatizado para referências locais quebradas.

- [ ] **Step 1: Ler cada HTML público**

```js
const htmlFiles = ['index.html', 'atlas.html', 'obra.html', 'biblioteca.html', 'autores.html', 'sobre.html', 'linha-do-tempo.html'];
```

- [ ] **Step 2: Extrair `href` e `src` locais**

Ignorar `http:`, `https:`, `mailto:`, `#` e URLs com query string após validar apenas o arquivo base.

- [ ] **Step 3: Falhar se arquivo local não existir**

Mensagem esperada:

```text
Referência quebrada em <pagina>: <caminho>
```

- [ ] **Step 4: Validar ausência de links para `autor.html` nesta fase**

O arquivo ainda não existe e nenhum HTML deve apontar para ele.

- [ ] **Step 5: Executar**

```bash
node tests/smoke.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tests/smoke.mjs
git commit -m "test: validate portal links and assets"
```

---

### Task 12: Gate final da Fase A e deploy

**Files:**
- Modify only if validation finds a defect.

**Interfaces:**
- Consumes: portal completo da Fase A.
- Produces: GitHub Pages publicado sem 404 no shell principal.

- [ ] **Step 1: Rodar smoke test**

```bash
node tests/smoke.mjs
```

Expected: PASS.

- [ ] **Step 2: Verificar sintaxe dos módulos JavaScript**

```bash
for f in js/*.js js/corpus/*.js; do node --check "$f"; done
```

Expected: todos com exit code 0.

- [ ] **Step 3: Verificar manualmente as páginas**

Abrir localmente:

```text
/
/atlas.html
/obra.html?id=memorias-postumas
/biblioteca.html
/autores.html
/linha-do-tempo.html
/sobre.html
```

Verificar desktop e mobile.

- [ ] **Step 4: Verificar navegação por teclado**

Tab deve alcançar todos os links principais e o menu mobile.

- [ ] **Step 5: Confirmar workflow GitHub Pages**

O run deve concluir:

```text
checkout: success
smoke test: success
configure-pages: success
upload-pages-artifact: success
deploy-pages: success
```

- [ ] **Step 6: Commit apenas se houver correção final**

```bash
git add <arquivos-corrigidos>
git commit -m "fix: complete portal shell validation"
```

---

## Self-review

### Cobertura da especificação para esta fase

Coberto na Fase A:
- shell global
- homepage
- Biblioteca
- Autores índice
- Linha do Tempo
- Sobre/Metodologia
- rodapé
- favicon
- SEO técnico
- acessibilidade básica
- CSS modular
- smoke tests
- deploy automatizado

Deliberadamente reservado para planos posteriores:
- redesign profundo do Atlas
- página individual de autor
- redesign profundo da página de obra
- schema `PLACE_ENTITY` / `PLACE_MENTION`
- corpus profundo e geocodificação histórica

### Placeholder scan

O plano não contém `TBD`, `TODO` ou passos sem critério de conclusão.

### Consistência de interfaces

- `OBRAS` permanece a fonte pública desta fase.
- `biblioteca.js`, `autores.js` e `timeline.js` consomem apenas `OBRAS` e `MOVIMENTOS`.
- `autor.html` não é criado nem referenciado nesta fase.
- `style.css` continua como ponto de entrada CSS para preservar compatibilidade.
- O smoke test entra no workflow antes da geração do artefato.
