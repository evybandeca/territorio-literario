# Atlas-Museu Editorial Imersivo — Design Spec

## Objetivo
Elevar o Território Literário de um portal editorial funcional para uma experiência de museu digital contemporâneo, preservando a identidade já consolidada e a performance atual.

## Princípio
Documento histórico autêntico dentro de uma interface contemporânea de museu digital. A tecnologia deve aparecer pela interação e pela clareza, não por estética SaaS/futurista.

## Direção visual
- Manter Literata + Source Sans 3.
- Manter Verde Mata Profunda, Terracota, Marfim, Azul Atlântico e Ouro.
- Aumentar contraste editorial, escala tipográfica e respiro.
- Reduzir sensação de grade repetitiva de cards.
- Introduzir superfícies inspiradas em fichas de acervo, placas curatoriais, margens de atlas e capas de coleção.
- Usar microinterações discretas e respeitar `prefers-reduced-motion`.

## Fase 1 — transversal
1. Novo header mais refinado, com marca editorial, navegação mais clara e melhor comportamento mobile.
2. Homepage reestruturada em narrativa: hero/globo, três portas de entrada editoriais, curadoria de obras e prévias de Atlas/Biblioteca.
3. Novo sistema de cards editoriais com hierarquia forte.
4. Tokens adicionais de superfície, sombra, espaçamento e tipografia.
5. Melhor responsividade para 360–430 px e desktop amplo.
6. Preservar IDs e hooks JS atuais para evitar regressões.
7. Não alterar corpus, registry, metodologia editorial ou regras cartográficas.

## Critérios de sucesso
- Nenhuma regressão nos fluxos testados em Chromium.
- Lighthouse continua acima dos gates existentes.
- A homepage deixa de parecer uma coleção homogênea de caixas e passa a ter hierarquia narrativa clara.
- Header e CTAs permanecem acessíveis por teclado.
- Mobile mantém legibilidade sem depender de hover.
