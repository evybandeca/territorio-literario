# Território Literário

**Toda história ocupa um lugar.**

Território Literário é um atlas cultural e biblioteca digital de literatura brasileira em domínio público. O projeto relaciona obras, autores, períodos e lugares por meio de pesquisa editorial e cartográfica auditável.

## Estrutura atual

- `index.html` — entrada institucional e descoberta do acervo
- `atlas.html` — exploração geográfica
- `biblioteca.html` — busca e filtros por obra
- `autores.html` — índice derivado de autores
- `linha-do-tempo.html` — exploração cronológica
- `sobre.html` — metodologia e critérios editoriais
- `obra.html?id=<obra-id>` — página de obra
- `js/data.js` — catálogo legado compatível
- `js/corpus/` — corpus profundo por obra

## Modelo editorial

A arquitetura geográfica separa:

- `place_entity`: identidade do lugar no mundo
- `place_mention`: ocorrência desse lugar dentro de uma obra

Na ocorrência ficam os três eixos editoriais:

- `tipo`: por que o lugar importa
- `escala`: dimensão espacial
- `certeza`: confiança na representação cartográfica

Nenhuma rota é criada pela simples ordem dos lugares. Coordenadas aproximadas não são tratadas como precisão histórica.

## Tecnologia

HTML estático, CSS modular, JavaScript, Leaflet, Three.js, GitHub Pages e GitHub Actions. Não há build step obrigatório nesta fase.

## Execução local

Sirva a raiz do repositório com qualquer servidor HTTP estático. Exemplo:

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Documentação

A especificação canônica está em `docs/superpowers/specs/2026-09-07-territorio-literario-portal-design.md`.

O plano da Fase A está em `docs/superpowers/plans/2026-09-07-shell-portal-implementation.md`.
