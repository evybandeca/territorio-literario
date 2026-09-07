# Production QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatizar QA estático, links internos, budgets de performance e disponibilidade do portal antes do beta.

**Architecture:** Manter CI dependency-free em Node.js. Auditar HTML e assets diretamente do repositório; usar um workflow agendado separado para disponibilidade HTTP do GitHub Pages. Corrigir apenas falhas verificáveis encontradas pelos gates.

**Tech Stack:** HTML/CSS/JavaScript, Node.js, GitHub Actions, GitHub Pages.

**Spec:** `docs/PRODUCTION_READINESS_2026-09-07.md`

## Global Constraints
- Sem framework/build novo.
- Sem coordenadas ou dados editoriais inventados.
- CI de PR deve continuar rápido e sem depender da disponibilidade de terceiros.
- Monitoramento externo deve ficar em workflow agendado separado.

### Task 1: Gate de páginas públicas
- Create `scripts/audit-public-pages.mjs`.
- Validar lang, viewport, description, h1, main, footer, links internos e assets locais.
- Exigir página `404.html`.

### Task 2: Orçamento de performance
- Create `scripts/audit-performance-budget.mjs`.
- Limitar tamanho de JS/CSS próprios e impedir retorno de tags diretas de corpora nas páginas genéricas.

### Task 3: Correções mínimas e 404
- Create `404.html`.
- Corrigir apenas violações encontradas pelos gates.

### Task 4: Monitoramento externo
- Create `.github/workflows/uptime.yml` com verificação periódica da home, Atlas, Biblioteca e uma obra canônica.

### Task 5: Integração
- Atualizar `.github/workflows/quality.yml`.
- Rodar RED/GREEN via PR.
- Atualizar readiness, merge e confirmar deploy.
