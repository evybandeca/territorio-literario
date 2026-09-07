# Território Literário — Relatório de Prontidão para Produção

Data de referência: 07/09/2026 — atualização após P8

## Resumo executivo

O Território Literário está em **pré-produção avançada**, com arquitetura de corpus escalável, CI transversal, deploy automático, QA estático e monitoramento operacional automatizados.

**Prontidão estimada para produção v1 planejada: 76%.**

**Prontidão estimada para beta público controlado: 93%.**

O núcleo validado contém **6 obras canônicas, 433 capítulos auditados, 86 entidades geográficas/literárias e 149 ocorrências com evidência textual**, mantendo **0 rotas inferidas**.

O pipeline agora valida automaticamente: estrutura pública, semântica básica das páginas, links e assets locais, orçamento de performance, registry/lazy loading, todos os corpora, evidências e sintaxe JavaScript.

## Estado por eixo

| Eixo | Prontidão | Estado |
|---|---:|---|
| Shell, navegação e páginas públicas | 94% | 9 páginas sob auditoria automática, incluindo 404 |
| Atlas/Biblioteca/Autores/Linha do Tempo | 85% | Funcional; refinamentos finais pendentes |
| Corpus fundador | 50% | 6 de 12 obras fundadoras canônicas |
| Integridade de dados e CI | 95% | Gates globais ativos para corpus, evidências, páginas e sintaxe |
| Deploy e operação | 94% | Pages automático + monitoramento periódico configurado |
| Arquitetura/performance | 84% | Lazy loading + budget estático; Lighthouse/Core Web Vitals pendentes |
| SEO e acessibilidade | 70% | Semântica básica sob gate; auditoria WCAG/browser pendente |
| Direitos, edição e governança editorial | 60% | Revisão documental final ainda necessária |
| Geocodificação histórica | 40% | Política correta; validação histórica incompleta |

## Métricas atuais validadas pelo CI

- 9 páginas públicas auditadas.
- 99 referências locais verificadas.
- 175,3 KiB de JavaScript próprio.
- 23,7 KiB de CSS próprio.
- 22 arquivos JavaScript e 10 arquivos CSS dentro dos budgets.
- 6 corpora canônicos no registry.
- 433 capítulos auditados continuamente.
- 86 entidades geográficas/literárias.
- 149 ocorrências com evidência.
- 97 URLs únicas de evidência.
- 0 rotas inferidas.

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

## P7 concluído — escala e corpus

- `js/corpus-registry.js`: ponto único de registro.
- Lazy loading na página individual de obra.
- Bootstrap assíncrono nas superfícies agregadoras.
- `scripts/validate-corpora.mjs`: gate único para todas as obras.
- `scripts/audit-evidence-links.mjs`: validação estrutural das evidências.
- Auditoria externa semanal das URLs de evidência.

## P8 concluído — QA e operação

- `scripts/audit-public-pages.mjs` valida doctype, `lang`, viewport, descrição, h1, main, footer, imagens, `noopener`, links internos e assets locais.
- `scripts/audit-performance-budget.mjs` impede crescimento descontrolado do JS/CSS e regressão para carregamento direto de corpora.
- `404.html` criada e integrada ao design público.
- `.github/workflows/uptime.yml` verifica a cada 6 horas home, Atlas, Biblioteca e uma página de obra.
- O CI de PR passou a tratar QA estrutural e performance como requisitos de merge.

## Bloqueadores restantes para produção v1

### P0 — obrigatórios

1. **Auditoria editorial de direitos e edição.** Congelar para cada obra domínio público/autoria, edição exata, fonte digital e proveniência.
2. **QA de navegador e acessibilidade dinâmica.** Teclado, foco, interação do mapa, estados assíncronos e viewport móvel real.
3. **Lighthouse/Core Web Vitals.** Medição em browser, rede móvel simulada e revisão de dependências externas/CDN.
4. **Teste funcional do lazy loading.** Confirmar no navegador que a página individual baixa apenas o corpus solicitado e que falha parcial não derruba a interface.

### P1 — necessários para v1 robusta

- Fechar as outras 6 obras fundadoras.
- Criar identidade canônica transversal de lugares compartilhados sem fuzzy merge automático.
- Geocodificar apenas lugares historicamente defensáveis, com fonte.
- Adicionar JSON-LD para `Book`, `Person` e `CreativeWork`.
- Criar imagem OG institucional e por obra.
- Criar tags/releases e rotina de backup dos corpora.

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

**GO condicionado — 93% pronto.** Tecnicamente o portal já suporta um beta público controlado. Restam uma revisão editorial de direitos/proveniência e uma rodada de QA dinâmica em navegador antes de divulgação ampla.

### Produção v1 definitiva

**NO-GO por escopo editorial.** A infraestrutura deixou de ser o limitante principal. A maior lacuna é o corpus fundador: 6 de 12 obras estão concluídas.

## Caminho crítico atualizado

1. Automatizar QA real em navegador + Lighthouse quando possível sem tornar o pipeline excessivamente pesado.
2. Auditar direitos/proveniência das 6 obras publicadas.
3. Abrir beta público controlado.
4. Produzir `Os Sertões`, `Úrsula`, `Memórias de um Sargento de Milícias` e `O Ateneu` usando o registry/gates atuais.
5. Resolver direitos/edições de `Macunaíma` e `Vidas Secas` antes de publicação.
6. Consolidar identidade transversal de lugares e geocodificação histórica.
7. Auditoria editorial final, tag e release `v1.0.0`.

## Métrica de conclusão

Ponderação:
- 30% corpus fundador;
- 20% integridade/validação;
- 15% UX e acessibilidade;
- 15% performance/arquitetura;
- 10% direitos/proveniência;
- 10% operação/deploy/monitoramento.

Após P7 e P8, a estimativa de produção v1 sobe de **65% para 76%**. A partir daqui, o melhor retorno vem de QA real de navegador, direitos/proveniência e produção acelerada das obras fundadoras restantes.
