# Território Literário — Relatório de Prontidão para Produção

Data de referência: 07/09/2026 — atualização após P9

## Resumo executivo

O Território Literário está em **pré-produção avançada**, com arquitetura de corpus escalável, CI transversal, deploy automático, QA estático, monitoramento operacional e governança de direitos/proveniência sob gates automáticos.

**Prontidão estimada para produção v1 planejada: 79%.**

**Prontidão estimada para beta público controlado: 96%.**

O núcleo validado contém **6 obras canônicas, 433 capítulos auditados, 86 entidades geográficas/literárias e 149 ocorrências com evidência textual**, mantendo **0 rotas inferidas**.

## Estado por eixo

| Eixo | Prontidão | Estado |
|---|---:|---|
| Shell, navegação e páginas públicas | 94% | 9 páginas sob auditoria automática, incluindo 404 |
| Atlas/Biblioteca/Autores/Linha do Tempo | 85% | Funcional; refinamentos finais pendentes |
| Corpus fundador | 50% | 6 de 12 obras fundadoras canônicas |
| Integridade de dados e CI | 96% | Gates globais ativos para corpus, direitos, evidências, páginas e sintaxe |
| Deploy e operação | 94% | Pages automático + monitoramento periódico |
| Arquitetura/performance | 84% | Lazy loading + budget estático; Lighthouse real pendente |
| SEO e acessibilidade | 70% | Semântica básica sob gate; QA dinâmica/WCAG pendente |
| Direitos, edição e governança editorial | 90% | 12 autores documentados; 6 edições publicadas congeladas; futuras bloqueadas por edição |
| Geocodificação histórica | 40% | Política conservadora correta; validação histórica incompleta |

## Métricas atuais sob CI

- 9 páginas públicas auditadas e 99 referências locais verificadas.
- 175,3 KiB de JavaScript próprio e 23,7 KiB de CSS próprio dentro dos budgets.
- 6 corpora canônicos no registry.
- 433 capítulos auditados continuamente.
- 86 entidades geográficas/literárias.
- 149 ocorrências e 97 URLs únicas de evidência.
- 0 rotas inferidas.
- 12 obras fundadoras cobertas pelo manifest de direitos/proveniência.
- 6 obras publicadas com edição congelada e 6 planejadas bloqueadas até seleção da edição exata.

## Corpus validado automaticamente

| Obra | Capítulos | Entidades | Ocorrências | Estado |
|---|---:|---:|---:|---|
| Memórias Póstumas de Brás Cubas | 160 | 30 | 62 | v1.0 canônica |
| Dom Casmurro | 148 | 10 | 22 | v1.0 canônica |
| O Cortiço | 23 | 16 | 24 | v1.0 canônica |
| Triste Fim de Policarpo Quaresma | 15 | 11 | 15 | v1.0 canônica |
| O Guarani | 54 | 9 | 14 | v1.0 canônica |
| Iracema | 33 | 10 | 12 | v1.0 canônica |
| **Total** | **433** | **86** | **149** | **6 obras** |

## P7 — escala e corpus — concluído

- Registry único e lazy loading.
- Bootstrap assíncrono das superfícies.
- Validador genérico de todos os corpora.
- Auditoria estrutural e semanal de evidências.

## P8 — QA e operação — concluído

- Auditoria automática de páginas, links e assets locais.
- Budgets de JS/CSS e proteção contra regressão do carregamento de corpora.
- Página 404.
- Monitoramento de uptime a cada 6 horas.

## P9 — direitos, edição e proveniência — concluído

- `data/rights-provenance.json` cobre as 12 obras fundadoras.
- O cálculo operacional aplica o art. 41 da Lei 9.610/1998 e recalcula automaticamente a data de término do prazo patrimonial autoral.
- As 6 obras publicadas exigem `edition_status = frozen_in_corpus` e são cruzadas com `corpus.edicao` real.
- Obras planejadas permanecem bloqueadas até a escolha da edição-fonte exata.
- `Macunaíma` e `Vidas Secas` deixam de ser tratadas como dúvida de prazo autoral: o gargalo passa a ser a edição/transcrição/fonte específica.
- `docs/RIGHTS_AND_PROVENANCE.md` explicita que edição, tradução, transcrição digital, imagens e aparato crítico possuem verificações próprias.
- O controle é editorial/operacional e não é apresentado como parecer jurídico.

## Bloqueadores restantes para produção v1

### P0

1. **QA de navegador e acessibilidade dinâmica:** teclado, foco, mapa, estados assíncronos e viewport móvel real.
2. **Lighthouse/Core Web Vitals:** medição real e revisão de dependências externas/CDN.
3. **Teste funcional do lazy loading no navegador:** confirmar que a página individual baixa somente o corpus solicitado e tolera falha parcial.

### P1

- Fechar as outras 6 obras fundadoras.
- Criar identidade canônica transversal para lugares compartilhados, sem fuzzy merge automático.
- Geocodificar somente lugares historicamente defensáveis, com fonte.
- Adicionar JSON-LD e imagens OG.
- Criar tags/releases e backup formal dos corpora.

## Obras fundadoras restantes

| Obra | Prazo autoral | Edição-fonte | Corpus |
|---|---|---|---|
| Os Sertões | documentado/expirado | pendente | pendente |
| Úrsula | documentado/expirado | pendente | pendente |
| Memórias de um Sargento de Milícias | documentado/expirado | pendente | pendente |
| O Ateneu | documentado/expirado | pendente | pendente |
| Macunaíma | documentado/expirado | pendente | bloqueado até edição |
| Vidas Secas | documentado/expirado | pendente | bloqueado até edição |

## Decisão de lançamento

### Beta público

**GO condicionado — 96% pronto.** Os principais controles de infraestrutura e governança editorial estão automatizados. Resta uma rodada de QA dinâmica em navegador/Lighthouse antes de divulgação ampla.

### Produção v1 definitiva

**NO-GO principalmente por escopo editorial.** A infraestrutura e os controles transversais estão próximos de produção; a lacuna dominante é o corpus fundador, ainda em 6 de 12 obras.

## Caminho crítico atualizado

1. Automatizar QA real em navegador e Lighthouse.
2. Abrir beta público controlado após QA dinâmica verde.
3. Produzir `Os Sertões`, `Úrsula`, `Memórias de um Sargento de Milícias` e `O Ateneu` no pipeline atual.
4. Selecionar/validar edições de `Macunaíma` e `Vidas Secas`, então produzir seus corpora.
5. Consolidar identidade transversal de lugares e geocodificação histórica.
6. Auditoria final, tag e release `v1.0.0`.

## Métrica de conclusão

Ponderação: 30% corpus fundador; 20% integridade/validação; 15% UX/acessibilidade; 15% performance/arquitetura; 10% direitos/proveniência; 10% operação/deploy/monitoramento.

Após P7, P8 e P9, a estimativa de produção v1 evoluiu de **65% para 79%**. O maior ganho seguinte virá do QA real de navegador e, sobretudo, da conclusão das seis obras fundadoras restantes.
