# P12 — Leitor Literário Integrado

## Objetivo
Transformar o Território Literário em ambiente de leitura, mantendo o visitante no portal e conectando texto, obra, autor e Atlas sem perder proveniência editorial.

## Escopo inicial
Piloto com **Memórias Póstumas de Brás Cubas**, arquitetura reutilizável para todas as obras do catálogo em domínio público. A leitura integral só é ativada quando houver uma edição-fonte aprovada e um registro explícito no `READER_REGISTRY`.

## Arquitetura
- `leitura.html` é o shell único do leitor.
- `js/reader-registry.js` declara quais obras possuem leitura local, a edição-fonte, a origem pública, a versão esperada da fonte e o arquivo local gerado.
- `scripts/vendor-reader-content.mjs` obtém a edição pública durante build/QA, valida identidade e versão declaradas e grava o texto em `reader-content/` dentro do artefato publicado.
- `js/leitura.js` carrega apenas o arquivo local já publicado e separa capítulos por marcadores editoriais conhecidos.
- O corpus cartográfico continua independente; leitor e corpus se relacionam por `obra.id` e número de capítulo, sem misturar responsabilidades.

## Fonte do piloto
- Obra: `memorias-postumas`
- Autor: Machado de Assis (1839–1908)
- Edição histórica de referência: Typographia Nacional, Rio de Janeiro, 1881.
- Fonte digital de ingestão: Project Gutenberg eBook #54829, texto UTF-8.
- Versão digital esperada: atualização declarada em 23/10/2024.
- A Biblioteca Brasiliana Mindlin e a Wikisource permanecem referências editoriais adicionais; o texto servido ao leitor é o artefato local gerado no build.

## Experiência de leitura
O leitor deve oferecer:
1. título, autor e edição;
2. índice de capítulos;
3. navegação anterior/próximo;
4. URL reproduzível por `?obra=<id>&capitulo=<n>`;
5. tamanho de fonte ajustável;
6. largura confortável de leitura;
7. persistência local do último capítulo e preferências;
8. busca no texto da obra;
9. link contextual para o Atlas quando o capítulo possuir ocorrências geográficas auditadas;
10. seção de fonte e proveniência sem tirar o usuário do fluxo principal.

## Conteúdo e direitos
- Somente obras aprovadas como domínio público entram no leitor.
- Nenhum texto protegido é ingerido automaticamente.
- A origem digital, edição histórica e data/versão da fonte devem ficar visíveis.
- O processo de build falha se a fonte não corresponder aos marcadores editoriais/versionais esperados.

## SEO
- `leitura.html` recebe canonical preservando `obra` e `capitulo`.
- JSON-LD usa `Book` e `Chapter` quando um capítulo está aberto.
- Título e descrição são atualizados em runtime.

## Performance
- O arquivo integral não é carregado em nenhuma página exceto `leitura.html`.
- O leitor faz um único fetch local do texto da obra selecionada.
- A existência do leitor não pode quebrar o lazy loading dos corpora.

## Acessibilidade
- Estrutura semântica de artigo e navegação.
- Controles com rótulos explícitos.
- Foco visível e operação por teclado.
- `aria-live` para mudança de capítulo e resultados de busca.
- Preferências visuais não podem depender apenas de cor.

## Integração com página da obra
Quando houver entrada no `READER_REGISTRY`, o CTA principal passa a ser **Ler esta obra** e aponta para `leitura.html?obra=<id>`. A fonte externa permanece disponível na seção Edição-base como evidência/proveniência.

## Critérios de aceite do piloto
- Memórias Póstumas abre no leitor interno.
- Capítulos I e II são detectados e navegáveis a partir do texto integral gerado.
- Reabrir a obra recupera o último capítulo lido.
- O texto é servido do mesmo domínio do portal.
- Busca global e leitor não geram erros de console.
- Browser QA e Lighthouse permanecem verdes.
- O smoke de produção valida a leitura publicada.
