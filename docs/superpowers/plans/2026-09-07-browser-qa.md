# Browser QA + Lighthouse Implementation Plan

**Goal:** Fechar o P0 técnico restante com testes reais de navegador, lazy loading, mobile/teclado e Lighthouse sem penalizar PRs editoriais de corpus.

**Architecture:** Workflow separado com Playwright/Chromium e Lighthouse. Ele roda em PR/push apenas quando shell, HTML, CSS, JS de aplicação ou o próprio QA mudarem; corpora de conteúdo isolados continuam usando o CI leve existente.

**Versions frozen:** Playwright 1.63.0; Lighthouse 13.4.1.

### Task 1 — Browser QA
- Create `scripts/browser-qa.mjs`.
- Testar home, obra individual, Atlas, mobile, teclado e erros JS.
- Confirmar lazy loading: página de `O Cortiço` não pode baixar outros corpora.
- Confirmar Atlas carrega os 6 corpora registrados.

### Task 2 — Lighthouse budget
- Create `scripts/audit-lighthouse.mjs`.
- Thresholds iniciais: performance >= 0.70; accessibility >= 0.85; best-practices >= 0.85; SEO >= 0.90.

### Task 3 — workflow seletivo
- Create `.github/workflows/browser-qa.yml`.
- Trigger em mudanças de shell/UI/core e semanal/manual.
- Servidor local, Chromium, Playwright e Lighthouse.
- Upload de relatórios Lighthouse se disponível.

### Task 4 — estabilização
- Rodar RED/GREEN na PR.
- Corrigir somente problemas reais encontrados.
- Atualizar readiness, merge e deploy.
