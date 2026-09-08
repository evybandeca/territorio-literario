# UI/UX Fase 3 — Biblioteca + Página da Obra

## Objetivo
Transformar Biblioteca e página de obra em experiências editoriais de acervo, alinhadas ao Atlas-Museu Editorial Imersivo.

## Biblioteca
- tratar cada livro como objeto tipográfico de coleção, sem inventar capa histórica;
- preservar busca, movimento, ordenação e autor via query string;
- criar trilho de movimentos com filtros rápidos;
- destacar título, autor, ano, movimento, densidade territorial e maturidade do corpus;
- reduzir aparência de grid SaaS.

## Página da obra
- abertura museológica com objeto-livro tipográfico, título, autoria, ano e movimento;
- síntese editorial + ficha rápida antes das camadas analíticas;
- preservar mapa, lugares publicados, personagens, eventos, ocorrências e fonte-base;
- integrar métricas do corpus no topo para orientar exploração;
- manter subnavegação e lazy loading atual.

## Restrições
- não criar capas históricas falsas;
- não alterar corpus, coordenadas, direitos, proveniência ou registry;
- preservar IDs consumidos pelo JavaScript e QA;
- CSS responsivo e compatível com reduced motion;
- gates: CI estrutural + Chromium + Lighthouse.
