# Território Literário — Relatório de Prontidão para Produção

Data de referência: 07/09/2026

## Resumo executivo

O Território Literário já deixou a fase de protótipo: há navegação pública completa, Atlas, Biblioteca, Autores, Linha do Tempo, páginas de obra, metodologia pública, CI e deploy automático no GitHub Pages. O corpus profundo possui agora seis obras canônicas em padrão v1.0 ou em fechamento v1.0: Memórias Póstumas de Brás Cubas, Dom Casmurro, O Cortiço, Triste Fim de Policarpo Quaresma, O Guarani e Iracema.

**Estimativa de prontidão para a versão de produção v1 planejada: 65%.**

**Estimativa de prontidão para um beta público controlado: 82%.**

A diferença existe porque o produto já pode ser usado por público real, mas ainda faltam controles de escala, validação transversal e fechamento editorial do conjunto fundador antes de ser apresentado como versão v1 definitiva.

## Estado por eixo

| Eixo | Prontidão | Estado |
|---|---:|---|
| Shell, navegação e páginas públicas | 88% | Funcional e publicado |
| Atlas/Biblioteca/Autores/Linha do Tempo | 82% | Funcional; requer refinamento e escala |
| Corpus fundador | 50% | 6 de 12 obras fundadoras em padrão canônico |
| Integridade de dados e CI | 70% | Gates existem, mas ainda não são uniformes para todos os corpora |
| Deploy e operação | 88% | GitHub Actions + Pages funcionando |
| SEO, acessibilidade e performance | 62% | Base existente; auditoria final ainda necessária |
| Direitos, edição e governança editorial | 58% | Política definida; auditoria documental final por obra ainda necessária |
| Geocodificação histórica | 40% | Política conservadora correta; muitos topônimos aguardam validação histórica |

## Concluído

- Identidade e design system inicial.
- Homepage e navegação global.
- Atlas com busca e filtros.
- Biblioteca pesquisável.
- Autores e perfil individual.
- Linha do Tempo.
- Página Sobre/Metodologia.
- Página de obra com navegação interna, personagens, eventos, território e evidências.
- SEO técnico básico: metadados, canonical dinâmico, Open Graph básico, robots.txt e sitemap.xml.
- GitHub Actions para qualidade e deploy.
- Smoke check do portal.
- Política canônica de `place_entity` versus `place_mention`.
- Política explícita de `tipo`, `escala` e `certeza`.
- Regra de não inventar coordenadas ou rotas.
- Evidência textual por ocorrência geográfica.
- Corpus canônico v1.0 de Memórias Póstumas de Brás Cubas.
- Corpus canônico v1.0 de Dom Casmurro.
- Corpus canônico v1.0 de O Cortiço.
- Corpus canônico v1.0 de Triste Fim de Policarpo Quaresma.
- Corpus canônico v1.0 de O Guarani.
- Corpus canônico v1.0 de Iracema em fechamento neste PR.

## Bloqueadores para produção v1

### P0 — obrigatórios

1. **Registro/lazy loading dos corpora.** Atualmente páginas genéricas carregam vários arquivos de corpus diretamente. Com 12+ obras, isso aumenta payload, acoplamento e risco de regressão. Criar um `corpus-registry.js`/manifest e carregar somente os corpora necessários por página/obra.
2. **Validador genérico para todos os corpora.** Unificar regras de schema e garantir que Memórias Póstumas e Dom Casmurro também sejam cobertos pelo CI, além dos validadores específicos atuais.
3. **Auditoria editorial final de direitos e edição.** Confirmar, para cada obra publicada, autor em domínio público e a edição/texto exato utilizado, mantendo referência e proveniência congeladas.
4. **Auditoria de links/evidências.** Validar automaticamente URLs de fonte e detectar capítulos/links quebrados.
5. **QA responsivo e acessibilidade.** Testes em desktop/mobile, teclado, contraste, landmarks, aria e navegação do mapa.
6. **Performance.** Medir Lighthouse/Core Web Vitals, reduzir JS global, evitar carregar corpora desnecessários e revisar dependências CDN.

### P1 — necessário para v1 robusta

- Fechar as 12 obras fundadoras.
- Criar identidade canônica transversal de lugares compartilhados entre obras, sem fusão automática por similaridade nominal.
- Geocodificar apenas os lugares historicamente defensáveis e registrar fonte da geocodificação.
- Criar página 404 e estados de erro/ausência de dados.
- Adicionar JSON-LD para `Book`, `Person` e `CreativeWork` quando aplicável.
- Criar imagem social/OG institucional e por obra.
- Adicionar monitoramento externo de disponibilidade do site.
- Criar rotina de backup/release/tag para corpora publicados.

### P2 — pode entrar após lançamento

- Mapas históricos sobrepostos.
- Imagens históricas com proveniência avançada.
- Reader sincronizado texto-mapa.
- Story beats e narrativa guiada.
- Rotas literárias apenas quando explicitamente comprovadas.
- Busca full-text avançada.
- Migração futura de GitHub Pages/estático para Next.js + PostgreSQL/PostGIS quando o volume justificar.

## Corpus fundador

| Obra | Estado |
|---|---|
| Memórias Póstumas de Brás Cubas | v1.0 canônica |
| Dom Casmurro | v1.0 canônica |
| O Cortiço | v1.0 canônica |
| Triste Fim de Policarpo Quaresma | v1.0 canônica |
| O Guarani | v1.0 canônica |
| Iracema | v1.0 em fechamento |
| Os Sertões | pendente |
| Úrsula | pendente |
| Memórias de um Sargento de Milícias | pendente |
| O Ateneu | pendente |
| Macunaíma | pendente de revisão de direitos/edição antes de inclusão |
| Vidas Secas | pendente de revisão de direitos/edição antes de inclusão |

## Decisão de lançamento

### Beta público

**GO condicionado.** O portal já possui conteúdo, arquitetura editorial e experiência suficientes para um beta público, desde que seja explicitamente rotulado como acervo em expansão e que as seis obras canônicas sejam tratadas como o núcleo validado.

Antes do beta, executar os P0 de lazy loading/registry, validador genérico, auditoria de direitos/edições das obras publicadas, link check e QA básico.

### Produção v1 definitiva

**NO-GO neste momento.** O principal motivo não é instabilidade do site, mas incompletude do escopo fundador e controles transversais ainda insuficientes para sustentar crescimento sem dívida técnica/editorial.

## Caminho crítico recomendado

1. Concluir TL-06 — Iracema.
2. Implementar `corpus-registry` + lazy loading.
3. Criar validador genérico único e colocar os seis corpora sob o mesmo gate.
4. Auditar direitos/edições e links das seis obras.
5. Executar Lighthouse + acessibilidade + QA mobile.
6. Publicar beta controlado.
7. Produzir as seis obras fundadoras restantes em lotes.
8. Consolidar identidade canônica de lugares e geocodificação histórica.
9. Executar auditoria editorial final e marcar release `v1.0.0` do portal.

## Métrica de progresso sugerida

A partir deste ponto, o projeto não deve ser medido apenas por número de páginas ou obras. A métrica de conclusão deve combinar:

- 30% corpus fundador;
- 20% integridade/validação;
- 15% UX e acessibilidade;
- 15% performance/arquitetura;
- 10% direitos/proveniência;
- 10% operação/deploy/monitoramento.

Com essa ponderação, o estado atual fica em aproximadamente **65% da produção v1 planejada**.
