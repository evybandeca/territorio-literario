# Production Polish Phase 5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fechar a experiência pública do Território Literário com busca global, microinterações, loading states, persistência de filtros, navegação contextual e acessibilidade consistente.

**Architecture:** Criar `css/production-polish.css` e `js/production-polish.js` como camada transversal carregada por `js/navigation.js`. Manter filtros e estado específico dentro de Biblioteca, Atlas, Autores e Linha do Tempo. `page-bootstrap.js` emite estado de carregamento e evento `tl:page-ready`.

**Tech Stack:** HTML/CSS/JavaScript estático, LocalStorage, History API, HTML Dialog, Leaflet existente, Playwright/Lighthouse existentes.

## Global Constraints
- Sem novas dependências de runtime.
- Respeitar `prefers-reduced-motion`.
- Busca global deve funcionar por botão, `/` e Cmd/Ctrl+K.
- Nenhuma busca pode alterar corpus, coordenadas ou proveniência.
- Persistência é local ao navegador e deve poder ser limpa pelos controles existentes.
- Todos os fluxos precisam permanecer navegáveis por teclado.

### Task 1: Shell global de polish
- Criar CSS e JS compartilhados.
- Adicionar busca global acessível, focus trap via `<dialog>`, atalhos, live region, transições e navegação contextual.
- Carregar automaticamente pelo `navigation.js`.

### Task 2: Loading e skeleton
- Marcar páginas com `data-loading` durante `page-bootstrap`.
- Remover estado e emitir `tl:page-ready` após scripts de página.
- Exibir skeleton apenas em regiões dinâmicas já presentes.

### Task 3: Persistência de filtros
- Biblioteca: busca, movimento e ordenação.
- Atlas: busca, tipo e certeza; query-string explícita tem precedência.
- Autores: busca.
- Linha do Tempo: movimento.
- Limpar filtros também limpa persistência relevante.

### Task 4: QA de produção
- Testar busca global, atalhos e foco.
- Testar persistência após reload.
- Testar estado de loading resolvido.
- Reexecutar todos os fluxos existentes, mobile, teclado e Lighthouse.
