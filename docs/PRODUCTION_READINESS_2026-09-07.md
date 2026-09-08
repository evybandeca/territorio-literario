# Território Literário — Relatório de Prontidão para Produção

Data de referência: 08/09/2026 — atualização após Fase 5, SEO semântico e validação pós-deploy em produção

## Resumo executivo

O Território Literário está em **beta público tecnicamente pronto**, com a camada de infraestrutura, experiência de navegação, QA, performance, SEO técnico e observabilidade de produção consolidada. O conjunto fundador completo permanece representado no registry e os principais riscos técnicos estão protegidos por gates automáticos antes e depois do deploy.

**Prontidão estimada para produção v1 planejada: 91%.**

**Prontidão técnica para beta público controlado: 100%.**

O CI valida atualmente **12 obras publicadas, 591 unidades estruturais auditadas, 127 entidades geográficas/literárias, 210 ocorrências com evidência textual e 0 rotas inferidas**. As evidências totalizam 210 referências estruturais e 117 URLs únicas.

A distinção editorial permanece explícita: **6 obras possuem corpus profundo v1.0 com auditoria contínua**, enquanto **6 obras possuem cobertura estrutural v0.1 integral**, com edição congelada e camada geográfica inicial conservadora, ainda sem alegação de exaustividade toponímica.

A principal mudança desde o relatório anterior é que os bloqueadores técnicos de release foram reduzidos de forma substancial. A Fase 5 de polish foi integrada ao `main`, o SEO semântico passou a ser validado em navegador real e o portal publicado ganhou um smoke test pós-deploy que verifica runtime, HTTP interno, busca global, dados estruturados e Lighthouse diretamente no GitHub Pages.

## Estado por eixo

| Eixo | Prontidão | Estado |
|---|---:|---|
| Shell, navegação e páginas públicas | 100% | Publicado, 404, busca global, navegação contextual e auditoria automática |
| Atlas/Biblioteca/Autores/Linha do Tempo | 98% | Fluxos consolidados, filtros persistentes e estados de loading validados |
| Corpus fundador — presença estrutural | 100% | 12 de 12 obras no registry |
| Corpus fundador — profundidade editorial | 72% | 6 v1.0 profundas + 6 v0.1 estruturais |
| Integridade de dados e CI | 99% | Gates globais de schema, direitos, evidências, páginas, sintaxe e runtime |
| Deploy e operação | 100% | Pages automático, uptime e smoke pós-deploy no ambiente público |
| Arquitetura/performance | 99% | Lazy loading preservado, budget estático e Lighthouse local + produção |
| SEO técnico | 100% | Canonical, Open Graph, Twitter Card, JSON-LD e Lighthouse SEO 100 |
| Acessibilidade técnica | 99% | Lighthouse 100 e QA de teclado/reduced-motion; revisão manual WCAG residual |
| Direitos, edição e governança editorial | 97% | 12 obras publicadas com autoria e edição-fonte documentadas |
| Geocodificação histórica | 45% | Política conservadora; aprofundamento histórico ainda necessário |

## Métricas validadas automaticamente

- 12 obras publicadas derivadas do manifest de direitos/proveniência.
- 591 unidades estruturais auditadas.
- 127 entidades geográficas/literárias.
- 210 ocorrências com evidência.
- 117 URLs únicas de evidência.
- 0 rotas inferidas.
- 9 páginas públicas e referências locais sob auditoria estática.
- QA real em Chromium para shell, busca global, lazy loading, Atlas, persistência de filtros, viewport móvel, teclado e `prefers-reduced-motion`.
- Gate de SEO em runtime para canonical, Open Graph, Twitter Card e JSON-LD.
- Smoke de produção contra o GitHub Pages após deploy, incluindo erros de console, falhas HTTP internas, busca global e dados estruturados dinâmicos.
- Lighthouse no ambiente público: **performance 99, acessibilidade 100, best practices 100 e SEO 100**.
- Core metrics no ambiente público: **FCP 0,8 s; LCP 0,8 s; TBT 0 ms; CLS 0,016** no baseline desktop validado.

## Corpus fundador

| Obra | Estrutura | Entidades | Ocorrências | Estado editorial |
|---|---:|---:|---:|---|
| Memórias Póstumas de Brás Cubas | 160 capítulos | 30 | 62 | v1.0 profunda |
| Dom Casmurro | 148 capítulos | 10 | 22 | v1.0 profunda |
| O Cortiço | 23 capítulos | 16 | 24 | v1.0 profunda |
| Triste Fim de Policarpo Quaresma | 15 capítulos | 11 | 15 | v1.0 profunda |
| O Guarani | 54 capítulos | 9 | 14 | v1.0 profunda |
| Iracema | 33 capítulos | 10 | 12 | v1.0 profunda |
| Os Sertões | 44 unidades | 16 | 30 | v0.1 estrutural |
| Úrsula | 22 unidades | 4 | 4 | v0.1 estrutural |
| Memórias de um Sargento de Milícias | 48 unidades | 4 | 4 | v0.1 estrutural |
| O Ateneu | 12 unidades | 4 | 4 | v0.1 estrutural |
| Macunaíma | 19 unidades | 8 | 11 | v0.1 estrutural |
| Vidas Secas | 13 unidades | 5 | 8 | v0.1 estrutural |
| **Total** | **591 unidades** | **127** | **210** | **12/12 no registry** |

## P7–P11 concluídos

### P7 — escala e corpus
- Registry único e lazy loading.
- Bootstrap assíncrono.
- Validador genérico de corpora.
- Auditoria estrutural e semanal das evidências.

### P8 — QA e operação
- Auditoria de páginas, links e assets.
- Budgets de JS/CSS.
- Página 404.
- Monitoramento periódico do portal.

### P9 — direitos, edição e proveniência
- Manifest das 12 obras fundadoras.
- Gate operacional baseado no art. 41 da Lei 9.610/1998.
- Edição-fonte congelada para todas as 12 obras atualmente publicadas.
- Controle separado para autoria, edição/transcrição digital e materiais visuais.

### P10 — navegador real e Lighthouse
- Playwright/Chrome em workflow seletivo.
- Teste funcional de lazy loading.
- Teste do Atlas com registry completo.
- QA mobile e teclado.
- Lighthouse com budgets mínimos e relatório preservado como artefato.
- Correção de regressões detectadas somente pelo navegador real.

### P11 — polish, SEO e observabilidade de produção
- Busca global acessível por botão, `/` e Cmd/Ctrl+K.
- Índice completo de obras, autores, páginas e lugares sem quebrar lazy loading por obra.
- Persistência resiliente de filtros em Biblioteca, Atlas, Autores e Linha do Tempo.
- Precedência explícita de parâmetros de URL sobre filtros persistidos no Atlas.
- Navegação contextual entre entidades e obras vizinhas.
- Microinterações, transições discretas, skeleton/loading e evento `tl:page-ready`.
- Focus-visible, live region, teclado e `prefers-reduced-motion` revisados.
- Canonical dinâmico para páginas por query string.
- Open Graph, Twitter Card e JSON-LD para `WebSite`, `Book`, `Person` e `CreativeWork`.
- Gate SEO em Chromium com ciclo TDD validado.
- Smoke automático pós-deploy no GitHub Pages.
- Lighthouse diretamente no ambiente público com performance 99 e acessibilidade/SEO/best practices em 100.

## O que ainda bloqueia a produção v1 definitiva

### P0 editorial

1. **Aprofundar as 6 obras v0.1.** A estrutura integral está fechada, mas Úrsula, Memórias de um Sargento de Milícias, O Ateneu, Macunaíma e Vidas Secas ainda possuem camada geográfica inicial. Os Sertões possui camada mais ampla, porém permanece classificada como estrutural.
2. **Auditoria transversal de lugares compartilhados.** Consolidar identidade canônica entre obras sem fuzzy merge automático e sem apagar formas históricas distintas.
3. **Geocodificação histórica documentada.** Adicionar coordenadas apenas quando houver fonte histórico-cartográfica defensável e registrar a proveniência correspondente.

### P1 de acabamento para release

- Produzir imagem Open Graph institucional e estratégia de imagens por obra. Os metadados sociais textuais já existem, mas o GitHub Pages não produz HTML server-side específico para cada query string, o que limita previews sociais realmente individualizados por obra.
- Executar revisão manual WCAG final, com foco especial no mapa, ordem de leitura, leitores de tela e contraste em estados interativos.
- Gerar release candidate, tag e backup formal dos corpora publicados.
- Congelar a versão editorial que será denominada `v1.0.0` após o aprofundamento do corpus fundador.

## Decisão de lançamento

### Beta público controlado

**GO técnico — 100%.** O portal publicado possui QA estático e dinâmico, performance medida, deploy automatizado, monitoramento, smoke pós-deploy, SEO semântico e proveniência editorial documentada. O beta deve continuar apresentado como **acervo em expansão e aprofundamento**, porque seis obras ainda estão em v0.1 estrutural. A prontidão técnica de 100% não significa completude editorial do corpus.

### Produção v1 definitiva

**GO condicionado ao aprofundamento editorial.** A infraestrutura e a camada técnica não constituem mais o caminho crítico. A v1 definitiva deve aguardar principalmente o aprofundamento das seis obras estruturais, a consolidação transversal dos lugares e a geocodificação histórica documentada, além do fechamento manual de acessibilidade e governança de release.

## Caminho crítico otimizado

1. Aprofundar em lote as seis obras v0.1, priorizando maior retorno espacial: `Os Sertões` → `Macunaíma` → `Memórias de um Sargento de Milícias` → `O Ateneu` → `Úrsula` → `Vidas Secas`.
2. Executar deduplicação assistida de lugares entre obras com revisão humana/semântica obrigatória antes de qualquer fusão.
3. Expandir a camada de proveniência da geocodificação histórica.
4. Fechar revisão manual WCAG e ativos Open Graph.
5. Gerar release candidate, backup formal e congelamento editorial.
6. Executar smoke final e marcar `v1.0.0` somente após o gate editorial final.

## Métrica de conclusão

Ponderação operacional: 30% corpus fundador/profundidade; 20% integridade/validação; 15% UX/acessibilidade; 15% performance/arquitetura; 10% direitos/proveniência; 10% operação/deploy/monitoramento.

Com a Fase 5, SEO semântico e smoke pós-deploy concluídos, a estimativa passa de **88% para 91% da produção v1 planejada**. O aumento é deliberadamente moderado porque o peso residual está concentrado em profundidade editorial e geocodificação histórica. A infraestrutura, o QA e a experiência pública já deixaram de ser os fatores limitantes.
