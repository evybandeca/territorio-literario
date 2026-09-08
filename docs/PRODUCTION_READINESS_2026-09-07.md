# Território Literário — Relatório Final de Prontidão para Produção v1.0.0

Data de referência: 08/09/2026

## Decisão de lançamento

**GO para produção v1.0.0.**

O caminho crítico técnico-editorial foi fechado. O gate global de release executado no PR de release confirmou `RELEASE_V1_READY=true`, com os 12 corpora em estado profundo auditado, fila estrutural zerada, zero percursos inferidos e seis leituras integrais hospedadas.

A próxima etapa do produto passa a ser otimização de UX e refinamento de experiência, sem bloqueio estrutural para o release atual.

## Métricas finais validadas pelo CI

- 12 obras publicadas e profundas.
- 591 unidades estruturais auditadas.
- 219 entidades geográficas ou literárias.
- 342 ocorrências com evidência estrutural.
- 159 URLs únicas de evidência.
- 0 rotas inferidas.
- 0 corpora restantes na fila estrutural.
- 6 leituras integrais hospedadas no `READER_REGISTRY`.
- 10 páginas públicas auditadas.
- 123 referências locais verificadas.
- Budget estático validado: 342,7 KiB de JavaScript e 66,6 KiB de CSS.
- 17 grupos candidatos de identidade transversal detectados e preservados para revisão semântica, com 0 fusões automáticas.
- 219 entidades submetidas à política de proveniência de geocodificação, com 0 auto-geocoding.
- 12 obras com direitos e proveniência editorial documentados.

## Estado editorial das 12 obras

| Obra | Estrutura | Entidades | Ocorrências | Estado |
|---|---:|---:|---:|---|
| Memórias Póstumas de Brás Cubas | 160 capítulos | 30 | 62 | profundo auditado |
| Dom Casmurro | 148 capítulos | 10 | 22 | profundo auditado |
| O Cortiço | 23 capítulos | 16 | 24 | profundo auditado |
| Triste Fim de Policarpo Quaresma | 15 capítulos | 11 | 15 | profundo auditado |
| O Guarani | 54 capítulos | 9 | 14 | profundo auditado |
| Iracema | 33 capítulos | 10 | 12 | profundo auditado |
| Os Sertões | 44 unidades | 48 | 75 | profundo auditado |
| Úrsula | 22 unidades | 9 | 12 | profundo auditado |
| Memórias de um Sargento de Milícias | 48 unidades | 17 | 20 | profundo auditado |
| O Ateneu | 12 unidades | 12 | 13 | profundo auditado |
| Macunaíma | 19 unidades | 36 | 49 | profundo auditado |
| Vidas Secas | 13 unidades | 11 | 24 | profundo auditado |
| **Total** | **591** | **219** | **342** | **12/12 profundos** |

## Invariantes editoriais preservados

- Não são criadas rotas a partir da simples sequência narrativa dos lugares.
- Topônimos históricos ambíguos permanecem distintos até haver prova suficiente para consolidação.
- O Ateneu permanece instituição ficcional, sem coordenada real inferida por equivalência biográfica.
- Úrsula preserva as anonimizações da edição de 1859 e não recebe localização externa para comarca, cidade, convento ou origem africana omitidos no texto.
- Vidas Secas preserva a indeterminação espacial deliberada e não recebe município, estado ou rota migratória inferidos.
- Macunaíma preserva a natureza fantástica e descontínua da geografia narrativa.
- Os Sertões mantém a campanha militar documentada como ocorrências históricas, sem convertê-la automaticamente em itinerário cartográfico.

## Gates de produção

O workflow principal valida antes do merge:

1. estrutura pública e assets obrigatórios;
2. páginas e referências locais;
3. budget estático;
4. registry e lazy loading dos corpora;
5. schema e integridade dos 12 corpora;
6. gates específicos das seis obras aprofundadas na etapa final;
7. fila estrutural igual a zero;
8. invariantes globais do release v1;
9. identidade transversal de lugares sem fusão automática;
10. proveniência de geocodificação;
11. direitos e proveniência editorial;
12. evidências estruturais;
13. sintaxe JavaScript.

O gate global do release exige ainda 12 corpora profundos, zero fila estrutural, zero percursos inferidos e pelo menos seis leituras hospedadas.

## Operação e deploy

O GitHub Pages continua sendo publicado somente por push em `main`. O deploy prepara localmente os textos do leitor, publica o artefato estático e é seguido pelos workflows de smoke e monitoramento de produção já existentes.

A arquitetura permanece estática e de baixo custo operacional, com carregamento de corpus por registry e sem backend obrigatório para navegação pública.

## Itens que deixam de bloquear o release e passam ao backlog de UX

Os pontos abaixo são melhorias de produto, não condições para manter o v1.0.0 em produção:

- revisão manual aprofundada de acessibilidade e leitores de tela;
- refinamento da hierarquia visual, navegação e descoberta;
- otimização mobile e ergonomia dos controles;
- evolução do Atlas e da leitura integrada;
- estratégia visual e Open Graph por obra;
- aprofundamento gradual de geocodificação histórica com fontes defensáveis;
- revisão assistida dos 17 grupos candidatos de lugares compartilhados;
- expansão adicional do `READER_REGISTRY`.

## Conclusão

A etapa de fundação, integridade editorial, corpus e operação está encerrada para o escopo v1.0.0. O projeto pode prosseguir para otimização de UX sobre uma base versionada, auditável e protegida por CI.
