# Território Literário

**Toda história ocupa um lugar.**

Território Literário é um atlas cultural e biblioteca digital de literatura brasileira em domínio público. O projeto relaciona obras, autores, períodos e lugares por meio de pesquisa editorial e cartográfica auditável.

## Release atual

**v1.0.0 — produção.**

O acervo fundador possui 12 obras em corpus profundo auditado, 591 unidades estruturais, 219 entidades, 342 ocorrências documentadas, zero rotas inferidas e seis leituras integrais hospedadas. O CI mantém um gate global de release que exige fila estrutural vazia e preserva as políticas de incerteza, ficcionalidade e proveniência.

## Estrutura

- `index.html` — entrada institucional e descoberta do acervo
- `atlas.html` — exploração geográfica
- `biblioteca.html` — busca e filtros por obra
- `autores.html` — índice derivado de autores
- `linha-do-tempo.html` — exploração cronológica
- `leitura.html` — leitor literário hospedado
- `sobre.html` — metodologia e critérios editoriais
- `obra.html?id=<obra-id>` — página de obra
- `js/corpus/` — corpus profundo por obra
- `js/corpus-registry.js` — carregamento lazy dos corpora
- `js/reader-registry.js` — catálogo de leituras integrais hospedadas

## Modelo editorial

A arquitetura geográfica separa:

- `place_entity`: identidade do lugar no mundo
- `place_mention`: ocorrência desse lugar dentro de uma obra

Na ocorrência ficam três eixos editoriais:

- `tipo`: por que o lugar importa
- `escala`: dimensão espacial
- `certeza`: confiança na representação cartográfica

Nenhuma rota é criada pela simples ordem dos lugares. Coordenadas aproximadas não são tratadas como precisão histórica. Espaços ficcionais, anonimizações deliberadas e topônimos históricos ambíguos permanecem explicitamente marcados em vez de serem completados por inferência externa.

## Tecnologia e operação

HTML estático, CSS modular, JavaScript, Leaflet, Three.js, GitHub Pages e GitHub Actions. O site público não depende de backend obrigatório. O deploy do `main` prepara as edições do leitor, publica no GitHub Pages e é seguido por smoke e monitoramento de produção.

## Validação

O workflow principal verifica páginas, assets, budget de performance, registry, os 12 corpora, gates editoriais específicos, fila estrutural, invariantes globais do release, identidade de lugares, proveniência, direitos, evidências e sintaxe JavaScript.

## Execução local

Sirva a raiz do repositório com um servidor HTTP estático. Exemplo:

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Documentação

O estado final de produção está em `docs/PRODUCTION_READINESS_2026-09-07.md`.

A especificação canônica está em `docs/superpowers/specs/2026-09-07-territorio-literario-portal-design.md`.
