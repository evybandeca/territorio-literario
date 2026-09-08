# Atlas Experience Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Converter o Atlas atual em uma experiência cartográfica full-viewport com sidebar contextual, sincronização mapa/lista e dossiê de evidências.

**Architecture:** Manter Leaflet/markercluster e o registry atuais. Reestruturar apenas a composição do Atlas, adicionar uma folha CSS dedicada e enriquecer o índice de lugares com ocorrências canônicas para alimentar o painel de evidências.

**Tech Stack:** HTML, CSS, JavaScript vanilla, Leaflet 1.9.4, Leaflet.markercluster 1.4.1.

**Spec:** `docs/superpowers/specs/2026-09-07-atlas-experience-phase2-design.md`

## Global Constraints
- Nenhuma nova biblioteca de runtime.
- Nenhuma coordenada nova.
- Nenhuma fusão automática de lugares.
- IDs públicos usados pelo JS devem permanecer estáveis.
- Mobile deve usar bottom sheet, não uma coluna longa.
- Merge somente com CI, Chromium e Lighthouse verdes.

---

### Task 1: Índice de evidências
**Files:** Modify `js/lugares.js`.
- [ ] Adicionar `mencoes` ao agregado de cada lugar.
- [ ] Em cada `place_mention`, guardar obra, unidade/capítulo, função, certeza e URL/nota da evidência.
- [ ] Preservar todos os campos e ordenação atuais.
- [ ] Rodar validadores existentes.

### Task 2: Shell do Atlas
**Files:** Modify `atlas.html`; Create `css/atlas-experience.css`.
- [ ] Reorganizar a página para `atlas-app` com sidebar e mapa lado a lado.
- [ ] Preservar `busca-lugar`, `filtro-tipo`, `filtro-certeza`, `limpar-filtros`, `atlas-resultados`, `atlas-lista`, `atlas-detalhe`, `atlas-mapa`, `legenda-atlas`, `atlas-stats`.
- [ ] Criar estados desktop e bottom sheet mobile.
- [ ] Manter footer fora do shell full-viewport.

### Task 3: Estado e interação
**Files:** Modify `js/atlas.js`.
- [ ] Introduzir `selectedId` e sincronizar mapa/lista/detalhe.
- [ ] Destacar marcador e item selecionados sem perder clustering.
- [ ] Renderizar dossiê com metadados, obras e ocorrências auditadas.
- [ ] Implementar botão voltar ao explorar e Escape.
- [ ] Garantir que filtros removendo a seleção retornem ao modo explorar.

### Task 4: Verificação
**Files:** Existing CI/browser QA.
- [ ] Abrir PR.
- [ ] Confirmar CI leve verde.
- [ ] Confirmar Chromium verde.
- [ ] Confirmar Lighthouse verde.
- [ ] Merge squash e confirmar GitHub Pages.
