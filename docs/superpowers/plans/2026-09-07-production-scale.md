# Production Scale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar o custo marginal crescente para novas obras, substituindo carregamento manual de corpora por registro/lazy loading, unificando validação estrutural e automatizando checagem de evidências.

**Architecture:** Introduzir um `corpus-registry.js` que conhece os arquivos por obra e expõe loaders Promise-based. Páginas agregadoras carregam todos os corpora por registro; página de obra carrega somente o corpus correspondente ao `id` da URL. O CI passa a executar um validador genérico sobre todos os corpora registrados e um link-check leve que valida formato/host/duplicatas de evidências sem depender da rede para cada commit.

**Tech Stack:** HTML/CSS/JavaScript estático, GitHub Pages, Node.js para scripts de CI, GitHub Actions.

**Spec:** `docs/PRODUCTION_READINESS_2026-09-07.md`

## Global Constraints
- Manter GitHub Pages e arquitetura estática nesta fase.
- Não inventar coordenadas ou rotas.
- Preservar `window.CORPUS_PROFUNDO` como objeto canônico compartilhado.
- Não criar schema concorrente.
- Compatibilidade com `OBRAS[].lugares` permanece.
- Falha de carregamento de um corpus não pode quebrar navegação pública inteira.

---

### Task 1: Corpus Registry e Loader
**Files:** Create `js/corpus-registry.js`; Test `scripts/test-corpus-registry.mjs`.
- [ ] Escrever teste que falha sem o registry.
- [ ] Implementar registry com as seis obras canônicas e arquivos base/canonical quando necessários.
- [ ] Implementar loader idempotente que injeta scripts em ordem e resolve Promise após carregamento.
- [ ] Validar IDs conhecidos/desconhecidos e idempotência.

### Task 2: Integração das páginas
**Files:** Modify `obra.html`, `atlas.html`, `biblioteca.html`, `autores.html`, `autor.html` e JS de inicialização quando necessário.
- [ ] Remover tags de corpus individuais.
- [ ] Carregar somente `js/corpus-registry.js`.
- [ ] Página de obra carrega apenas o corpus do `id` atual.
- [ ] Páginas agregadoras carregam todos por registry antes das métricas/listas.
- [ ] Preservar fallback legado.

### Task 3: Validador Genérico
**Files:** Create `scripts/validate-corpora.mjs`; Modify `.github/workflows/quality.yml`.
- [ ] Validar versão/status/cobertura/IDs/place_id/enums/evidência/rotas.
- [ ] Cobrir também Memórias Póstumas e Dom Casmurro.
- [ ] Substituir gates específicos no workflow por gate genérico.

### Task 4: Auditoria Automática de Evidências
**Files:** Create `scripts/audit-evidence-links.mjs`; Modify `.github/workflows/quality.yml`.
- [ ] Garantir HTTPS e URL parseável.
- [ ] Restringir hosts permitidos atuais.
- [ ] Detectar ausência/duplicação estrutural.
- [ ] Não depender de dezenas de requests externos em todo commit.

### Task 5: Verificação e documentação
**Files:** Modify `docs/PRODUCTION_READINESS_2026-09-07.md`.
- [ ] Rodar registry test, validador, auditoria, smoke check e sintaxe JS.
- [ ] Atualizar readiness.
- [ ] PR, CI verde, squash merge e Pages.
