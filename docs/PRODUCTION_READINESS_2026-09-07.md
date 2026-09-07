# Território Literário — Relatório de Prontidão para Produção

Data de referência: 07/09/2026 — atualização após P10 e fechamento estrutural das 12 obras fundadoras

## Resumo executivo

O Território Literário está em **pré-produção final / beta tecnicamente pronto**. Os principais riscos de infraestrutura, escala, QA, performance e proveniência foram transformados em gates automáticos; o conjunto fundador completo já está representado no registry.

**Prontidão estimada para produção v1 planejada: 88%.**

**Prontidão estimada para beta público controlado: 99%.**

O CI valida atualmente **12 obras publicadas, 591 unidades estruturais auditadas, 127 entidades geográficas/literárias, 210 ocorrências com evidência textual e 0 rotas inferidas**. As evidências totalizam 210 referências estruturais e 117 URLs únicas.

A distinção editorial permanece explícita: **6 obras possuem corpus profundo v1.0 com auditoria contínua**, enquanto **6 obras mais recentes possuem cobertura estrutural v0.1 integral**, com edição congelada e camada geográfica inicial conservadora, mas ainda sem alegação de exaustividade toponímica.

## Estado por eixo

| Eixo | Prontidão | Estado |
|---|---:|---|
| Shell, navegação e páginas públicas | 97% | Publicado, 404 e auditoria automática |
| Atlas/Biblioteca/Autores/Linha do Tempo | 90% | Funcional; refinamentos finais pendentes |
| Corpus fundador — presença estrutural | 100% | 12 de 12 obras no registry |
| Corpus fundador — profundidade editorial | 72% | 6 v1.0 profundas + 6 v0.1 estruturais |
| Integridade de dados e CI | 98% | Gates globais de schema, direitos, evidências, páginas e sintaxe |
| Deploy e operação | 97% | Pages automático, uptime e QA seletivo |
| Arquitetura/performance | 95% | Lazy loading, budget estático e Lighthouse real |
| SEO e acessibilidade | 92% | Lighthouse 100 SEO / 96 acessibilidade; refinamento WCAG manual residual |
| Direitos, edição e governança editorial | 97% | 12 obras publicadas com autoria e edição-fonte documentadas |
| Geocodificação histórica | 45% | Política conservadora; aprofundamento histórico ainda necessário |

## Métricas validadas automaticamente

- 12 obras publicadas derivadas do manifest de direitos/proveniência.
- 591 unidades estruturais auditadas.
- 127 entidades geográficas/literárias.
- 210 ocorrências com evidência.
- 117 URLs únicas de evidência.
- 0 rotas inferidas.
- 9 páginas públicas e 99 referências locais sob auditoria estática.
- 221,3 KiB de JavaScript próprio e 23,7 KiB de CSS dentro do budget atual.
- QA real em Chromium para shell, lazy loading, Atlas, viewport móvel e teclado.
- Lighthouse no `main`: performance 95, acessibilidade 96, best practices 100 e SEO 100.
- FCP 1,1 s; LCP 1,1 s; TBT 30 ms; CLS 0,06 no baseline Lighthouse desktop validado.

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

## P7–P10 concluídos

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
- Correção de regressão real em `obra.js` detectada somente pelo navegador.

## O que ainda bloqueia a produção v1 definitiva

### P0 editorial

1. **Aprofundar as 6 obras v0.1.** A estrutura integral está fechada, mas Úrsula, Memórias de um Sargento de Milícias, O Ateneu, Macunaíma e Vidas Secas ainda possuem camada geográfica inicial; Os Sertões possui camada mais ampla, porém também classificada como estrutural.
2. **Auditoria transversal de lugares compartilhados.** Criar identidade canônica entre obras sem fuzzy merge e sem perder formas históricas distintas.
3. **Geocodificação histórica documentada.** Adicionar coordenadas somente quando houver fonte histórico-cartográfica defensável e registrar essa proveniência.

### P1 de acabamento para release

- JSON-LD para `Book`, `Person` e `CreativeWork`.
- Imagem OG institucional e por obra.
- Revisão manual WCAG final focada em mapa, foco visível e leitores de tela.
- Release/tag e backup formal dos corpora publicados.
- Checklist final de smoke test do domínio público de produção.

## Decisão de lançamento

### Beta público controlado

**GO — 99% pronto.** Não há bloqueador técnico conhecido para um beta público controlado. O portal possui QA estático e dinâmico, performance medida, deploy automatizado, monitoramento e proveniência editorial documentada. O beta deve ser apresentado como **acervo em expansão e aprofundamento**, porque seis obras ainda estão em v0.1 estrutural.

### Produção v1 definitiva

**GO condicionado ao aprofundamento editorial.** A infraestrutura deixou de ser bloqueadora. A versão v1 definitiva deve aguardar principalmente o aprofundamento das seis obras estruturais e a consolidação transversal de lugares/geocodificação.

## Caminho crítico otimizado

1. Aprofundar em lote as seis obras v0.1, priorizando maior retorno espacial: `Os Sertões` → `Macunaíma` → `Memórias de um Sargento de Milícias` → `O Ateneu` → `Úrsula` → `Vidas Secas`.
2. Executar deduplicação assistida de lugares entre obras com revisão humana/semântica obrigatória antes de qualquer fusão.
3. Criar camada de proveniência da geocodificação histórica.
4. Adicionar JSON-LD/OG e fechar acessibilidade manual residual.
5. Gerar release candidate, congelar corpora e executar QA final.
6. Marcar `v1.0.0` somente após o gate editorial final.

## Métrica de conclusão

Ponderação operacional: 30% corpus fundador/profundidade; 20% integridade/validação; 15% UX/acessibilidade; 15% performance/arquitetura; 10% direitos/proveniência; 10% operação/deploy/monitoramento.

Com P10 concluído e as 12 obras fundadoras presentes no registry, a estimativa sobe de **79% para 88% da produção v1 planejada**. O trabalho restante é predominantemente editorial e histórico-cartográfico, não mais de infraestrutura básica.
