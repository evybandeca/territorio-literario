# UI/UX Fase 3 — Biblioteca + Página da Obra Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** elevar Biblioteca e página da obra ao padrão Atlas-Museu Editorial Imersivo sem alterar dados editoriais.

**Architecture:** adicionar uma camada CSS dedicada e enriquecer o HTML existente com containers semânticos; manter os IDs atuais e adaptar `biblioteca.js` e `obra.js` para renderizar objetos editoriais e métricas. O mapa, registry e lazy loading permanecem intactos.

**Tech Stack:** HTML estático, CSS, JavaScript, Leaflet, Playwright/Chromium, Lighthouse.

**Spec:** `docs/superpowers/specs/2026-09-07-uiux-phase3-library-work.md`

## Global Constraints
- não criar capas históricas falsas;
- não alterar corpus, coordenadas, direitos, proveniência ou registry;
- preservar IDs consumidos pelo JavaScript e QA;
- gates: CI estrutural + Chromium + Lighthouse.

---

### Task 1: Biblioteca como coleção
**Files:** `biblioteca.html`, `js/biblioteca.js`, `css/library-work-experience.css`
- [ ] criar hero/collection shell e trilho de movimentos;
- [ ] renderizar objetos-livro tipográficos com metadados e indicadores de pesquisa;
- [ ] preservar busca, filtros, ordenação e query string de autor;
- [ ] validar responsividade e estado vazio.

### Task 2: Página da obra como dossiê museológico
**Files:** `obra.html`, `js/obra.js`, `css/library-work-experience.css`
- [ ] criar abertura com objeto-livro tipográfico e ficha rápida;
- [ ] preencher métricas do corpus no topo;
- [ ] preservar mapa, lugares, personagens, eventos, evidências e edição-base;
- [ ] manter subnavegação atual.

### Task 3: QA de regressão
**Files:** `scripts/browser-qa.mjs`
- [ ] testar Biblioteca com filtro de movimento e objetos de coleção;
- [ ] testar abertura de obra, ficha museológica e lazy loading único;
- [ ] incluir Biblioteca/obra no mobile sem overflow;
- [ ] executar CI e Lighthouse, corrigir qualquer regressão antes do merge.
