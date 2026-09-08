# Atlas Experience — Phase 2 Design

## Goal
Transformar o Atlas de uma página vertical em uma mesa cartográfica editorial imersiva, com mapa dominante, exploração persistente e transição clara lugar → obra → ocorrência auditada.

## Interaction model
- Desktop: viewport de aplicação sob o header, sidebar de 380px e mapa ocupando o restante.
- Sidebar: cabeçalho curto, busca primária, filtros compactos, contador, lista rolável e modo de dossiê do lugar.
- Mapa e lista são sincronizados: seleção em qualquer um destaca o outro.
- Dossiê mostra classificação, certeza, geocodificação, obras e ocorrências auditadas com links de evidência quando existirem.
- Mobile: mapa permanece dominante e a sidebar se torna bottom sheet rolável, com estado de exploração/dossiê.
- Escape retorna do dossiê para a exploração; botão explícito também retorna.

## Visual language
Continua a direção Atlas-Museu Editorial Imersivo: mata profunda, papel, terracota, linhas finas, tipografia Literata + Source Sans 3, controles discretos e forte hierarquia editorial. O mapa deve parecer uma cartoteca digital contemporânea, não uma dashboard SaaS.

## Data and methodology
- Leaflet e markercluster permanecem.
- Nenhuma coordenada nova é criada.
- Lugares sem coordenadas permanecem listados e pesquisáveis.
- `js/lugares.js` passa a expor as ocorrências canônicas associadas a cada lugar para permitir o dossiê de evidências.
- Nenhuma fusão automática ou alteração de corpus.

## Accessibility and performance
- Navegação por teclado preservada.
- Botões de lugar usam estado `aria-pressed`/seleção visual.
- `aria-live` continua informando resultados.
- `prefers-reduced-motion` continua respeitado.
- Nenhuma nova biblioteca de runtime.
- Merge condicionado a CI, Chromium e Lighthouse verdes.
