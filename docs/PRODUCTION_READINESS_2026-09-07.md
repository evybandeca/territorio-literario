# Território Literário — Relatório de Prontidão para Produção

Data de referência: 07/09/2026 — atualização após P7

## Resumo executivo

O Território Literário está em fase de **pré-produção avançada**. O portal público, o modelo editorial e o pipeline de publicação já funcionam; o principal gargalo técnico de crescimento dos corpora foi removido no P7.

**Prontidão estimada para produção v1 planejada: 72%.**

**Prontidão estimada para beta público controlado: 90%.**

O núcleo validado contém **6 obras canônicas, 433 capítulos auditados, 86 entidades geográficas/literárias e 149 ocorrências com evidência textual**, mantendo **0 rotas inferidas**. O CI valida automaticamente todos os corpora registrados e 149 URLs de evidência; 97 URLs são únicas e todas as evidências atuais usam `pt.wikisource.org`.

## Estado por eixo

| Eixo | Prontidão | Estado |
|---|---:|---|
| Shell, navegação e páginas públicas | 90% | Funcional e publicado |
| Atlas/Biblioteca/Autores/Linha do Tempo | 84% | Funcional; refinamentos finais pendentes |
| Corpus fundador | 50% | 6 de 12 obras fundadoras canônicas |
| Integridade de dados e CI | 92% | Registry, validador genérico, evidências e sintaxe sob gate único |
| Deploy e operação | 90% | GitHub Actions + Pages estáveis |
| Arquitetura/performance | 78% | Lazy loading por obra implementado; medição Lighthouse ainda pendente |
| SEO e acessibilidade | 64% | Base existente; auditoria WCAG/Lighthouse pendente |
| Direitos, edição e governança editorial | 60% | Política definida; revisão documental final por obra pendente |
| Geocodificação histórica | 40% | Política conservadora correta; validação histórica ainda incompleta |

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

## P7 concluído — escala e automação

- `js/corpus-registry.js` tornou-se o ponto único de registro das obras canônicas.
- A página de obra usa lazy loading e baixa somente o corpus solicitado.
- Atlas, Biblioteca e Autores carregam os corpora pelo registry, sem conhecer nomes individuais de arquivos.
- `js/page-bootstrap.js` preserva os módulos de página existentes e inicializa a interface somente após os dados necessários estarem disponíveis.
- `scripts/test-corpus-registry.mjs` verifica registry e idempotência do loader.
- `scripts/validate-corpora.mjs` valida todas as obras registradas com uma regra única.
- Memórias Póstumas e Dom Casmurro agora estão cobertos pelo mesmo gate dos corpora mais recentes.
- `scripts/audit-evidence-links.mjs` valida HTTPS, host, estrutura e duplicações das evidências.
- `.github/workflows/evidence-links.yml` executa auditoria externa semanal e falha apenas para 404/410 confirmados; bloqueios/rate limits transitórios são avisos.
- O CI continua executando smoke check e verificação de sintaxe JavaScript.

## Bloqueadores restantes para produção v1

### P0 — obrigatórios antes de declarar produção definitiva

1. **Auditoria editorial de direitos e edição.** Congelar para cada obra: domínio público do texto/autoria, edição exata, fonte digital e proveniência.
2. **QA responsivo e acessibilidade.** Desktop/mobile, teclado, foco, contraste, landmarks, ARIA e operação do mapa sem mouse.
3. **Performance mensurada.** Lighthouse/Core Web Vitals, orçamento de payload, dependências CDN e comportamento em conexão móvel.
4. **Teste funcional de lazy loading no navegador.** Cobrir página individual, Atlas e falha parcial de um corpus com teste automatizado de browser quando a infraestrutura permitir.

### P1 — necessários para v1 robusta

- Fechar as outras 6 obras fundadoras.
- Criar identidade canônica transversal para lugares compartilhados entre obras sem fuzzy merge automático.
- Geocodificar apenas lugares historicamente defensáveis e registrar fonte da geocodificação.
- Criar página 404 e estados de erro/ausência de dados.
- Adicionar JSON-LD para `Book`, `Person` e `CreativeWork`.
- Criar imagem OG institucional e por obra.
- Adicionar monitoramento de disponibilidade do portal.
- Criar tags/releases e rotina de backup dos corpora publicados.

## Obras fundadoras restantes

| Obra | Estado |
|---|---|
| Os Sertões | pendente |
| Úrsula | pendente |
| Memórias de um Sargento de Milícias | pendente |
| O Ateneu | pendente |
| Macunaíma | revisão de direitos/edição obrigatória antes de inclusão |
| Vidas Secas | revisão de direitos/edição obrigatória antes de inclusão |

## Decisão de lançamento

### Beta público

**GO condicionado — 90% pronto.** O portal possui massa crítica, modelo editorial consistente, CI, deploy e agora arquitetura de corpus escalável. Antes de divulgar amplamente, executar auditoria de direitos/edições das seis obras atuais e uma rodada curta de QA mobile/acessibilidade/performance.

### Produção v1 definitiva

**NO-GO por escopo, não por infraestrutura.** O maior déficit passa a ser editorial: apenas 6 das 12 obras fundadoras estão fechadas. A infraestrutura já não é o principal impedimento.

## Caminho crítico atualizado

1. Auditoria automatizada/manual de direitos e proveniência das seis obras publicadas.
2. Lighthouse + acessibilidade + QA mobile.
3. Publicar beta público controlado.
4. Produzir `Os Sertões`, `Úrsula`, `Memórias de um Sargento de Milícias` e `O Ateneu` no pipeline automatizado.
5. Resolver direitos/edições de `Macunaíma` e `Vidas Secas` antes de qualquer corpus público.
6. Consolidar identidade transversal de lugares e geocodificação histórica.
7. Auditoria editorial final, tag e release `v1.0.0`.

## Métrica de conclusão

A ponderação continua:

- 30% corpus fundador;
- 20% integridade/validação;
- 15% UX e acessibilidade;
- 15% performance/arquitetura;
- 10% direitos/proveniência;
- 10% operação/deploy/monitoramento.

Com o P7 concluído, a estimativa sobe de **65% para 72% da produção v1 planejada**. O próximo ganho de prontidão virá menos de adicionar páginas e mais de fechar QA, direitos/proveniência e o restante do corpus fundador.
