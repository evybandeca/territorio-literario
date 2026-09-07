# Território Literário — Especificação Canônica do Portal

Data: 2026-09-07
Status: design aprovado, pronto para planejamento de implementação

## 1. Objetivo

Transformar o Território Literário de prova de conceito cartográfica em um portal cultural completo, elegante, navegável e auditável sobre literatura brasileira em domínio público.

O produto deve unir biblioteca digital, atlas literário, curadoria editorial, contexto histórico, autores, movimentos, lugares, personagens, eventos e fontes, preservando transparência sobre evidência e incerteza.

Assinatura institucional: **Toda história ocupa um lugar.**

## 2. Princípios de produto

1. Biblioteca e Atlas são entradas equivalentes.
2. O portal deve parecer publicação cultural, museu digital e atlas contemporâneo, nunca “site escolar”.
3. Nada deve ser apresentado como rota, localização exata ou fato histórico sem evidência suficiente.
4. O acervo cresce progressivamente, obra por obra, mantendo rastreabilidade editorial.
5. O modelo deve permitir expansão futura sem exigir migração prematura para framework ou banco de dados.
6. A interface pública deve continuar funcional durante a migração do schema.
7. Conteúdo ausente não gera placeholder vazio. A seção simplesmente não aparece.

## 3. Arquitetura de navegação

Navegação global persistente:

- Início
- Atlas
- Biblioteca
- Autores
- Linha do Tempo
- Sobre

Rotas principais:

- `index.html`
- `atlas.html`
- `biblioteca.html`
- `autores.html`
- `autor.html?id=<autor-id>`
- `obra.html?id=<obra-id>`
- `linha-do-tempo.html`
- `sobre.html`

## 4. Homepage

A homepage será reorganizada em cinco zonas:

### 4.1 Hero institucional

- globo interativo como elemento visual central
- marca Território Literário
- assinatura “Toda história ocupa um lugar.”
- texto curto explicando a proposta
- CTA primário “Explorar o Atlas”
- CTA secundário “Abrir a Biblioteca”

### 4.2 Descobrir o Brasil pela literatura

Blocos curatoriais por território, período ou tema, evitando despejar um mapa completo logo após o hero.

Exemplos futuros:

- Rio de Janeiro de Machado de Assis
- Sertões brasileiros
- Literatura e escravidão
- Mulheres fundadoras
- Cidades do Segundo Reinado

### 4.3 Obras em destaque

Cartões editoriais com:

- título
- autor
- ano
- movimento
- território principal
- sinopse curta
- chamada para abrir a obra

### 4.4 Prévia do Atlas

Mapa reduzido com poucos lugares destacados e CTA para o Atlas completo.

### 4.5 Coleções curatoriais

Módulo reutilizável para coleções editoriais temáticas.

## 5. Biblioteca

A Biblioteca será uma página própria, não apenas uma seção da homepage.

Recursos:

- busca textual
- filtro por autor
- filtro por movimento
- filtro por período
- filtro por região
- filtro por gênero, quando houver dados
- ordenação alfabética
- ordenação cronológica
- cartões consistentes e responsivos

A homepage poderá manter uma amostra do catálogo, mas a exploração integral acontecerá em `biblioteca.html`.

## 6. Atlas

O Atlas será tratado como aplicação principal do portal.

Layout desktop:

- mapa dominante
- painel lateral persistente
- busca
- filtros
- lista de lugares
- painel de detalhe

Layout móvel:

- mapa em bloco principal
- filtros em drawer ou painel recolhível
- lista e detalhe em fluxo vertical

Filtros planejados:

- obra
- autor
- movimento
- período
- tipo
- escala
- certeza
- região

Ao selecionar um lugar, mostrar:

- nome canônico
- tipo(s) de ocorrência
- escala
- certeza
- obras associadas
- autor(es)
- ocorrências verificadas
- contexto e fontes quando disponíveis

O mapa não deve inferir equivalência por semelhança textual.

## 7. Página da obra

A página de obra será a experiência editorial central.

Cabeçalho:

- título
- autor
- ano
- movimento
- território principal
- sinopse
- link para texto integral

Navegação interna quando houver dados:

- Visão geral
- Território
- Personagens
- Linha narrativa
- Fontes

Seções opcionais:

- mapa da obra
- lugares
- ocorrências textuais
- personagens
- eventos
- capítulos auditados
- citações
- contexto histórico
- evidências
- obras relacionadas

Rotas só aparecem quando explicitamente definidas e sustentadas por evidência.

## 8. Autores

### 8.1 `autores.html`

Página de exploração com:

- busca
- agrupamento por período ou movimento
- total de obras no acervo
- territórios associados

### 8.2 `autor.html`

Exibir:

- nome
- nascimento e morte, quando conhecidos
- movimento(s)
- biografia curta
- obras no acervo
- territórios associados
- mapa agregado do autor

## 9. Linha do Tempo

Página cronológica interativa ou seminterativa com:

- obras
- autores
- movimentos literários
- períodos históricos

Deve permitir compreender a sequência temporal do acervo sem confundir:

- ano de publicação
- período narrativo
- período biográfico

Esses conceitos permanecem separados no modelo.

## 10. Sobre e Metodologia

`sobre.html` terá valor institucional e metodológico.

Conteúdo:

- propósito do projeto
- escopo do acervo
- critérios de domínio público
- fontes preferenciais
- critérios cartográficos
- definição de `tipo`
- definição de `escala`
- definição de `certeza`
- política de inclusão de topônimos
- política de rotas
- política de imagens e proveniência
- limites e incertezas
- processo editorial e revisão

## 11. Identidade visual

Direção: atlas histórico + biblioteca + arquivo + museu digital contemporâneo.

Paleta:

- Verde Mata Profunda `#183A32`
- Terracota Brasileira `#A45535`
- Marfim Arquivo `#F1EBDD`
- Preto Tinta `#20211F`
- Azul Atlântico `#274C59`
- Urucum `#C45132`
- Ouro Antigo `#B08A4A`

Tipografia:

- Literata para títulos e corpo editorial
- Source Sans 3 para interface, filtros, metadados e controles

Diretrizes:

- espaço em branco generoso
- hierarquia editorial clara
- contraste suficiente
- bordas e divisores discretos
- animações curtas e funcionais
- sem excesso de sombras
- sem estética literalista verde-amarela
- mobile-first responsivo

## 12. Componentes reutilizáveis

Criar componentes visuais e comportamentais consistentes para:

- cabeçalho global
- rodapé
- cartão de obra
- cartão de autor
- badge de movimento
- tags de tipo, escala e certeza
- painel de filtros
- painel de detalhe do lugar
- cartão de estatística
- módulo de coleção
- breadcrumbs
- estado vazio
- busca

## 13. Modelo de dados canônico

### 13.1 Entidade geográfica

`PLACE_ENTITY` representa o lugar no mundo.

Campos:

```js
{
  place_id,
  canonical_name,
  aliases: [],
  geometry: {
    type,
    coordinates
  },
  admin: {},
  sources: []
}
```

### 13.2 Ocorrência literária

`PLACE_MENTION` representa uma ocorrência daquele lugar em uma obra.

Campos:

```js
{
  mention_id,
  work_id,
  place_id,
  chapter,
  tipo,
  escala,
  certeza,
  descricao,
  evidence: {
    source,
    locator,
    note
  }
}
```

### 13.3 Responsabilidade dos três eixos

- `tipo`: por que o lugar importa na obra
- `escala`: dimensão espacial do referente
- `certeza`: confiança na representação cartográfica

Nenhum eixo substitui o outro.

### 13.4 Migração

O schema legado `OBRAS[].lugares` será mantido temporariamente para compatibilidade.

Estratégia:

1. introduzir `places.js` e `place_mentions`
2. migrar primeiro *Memórias Póstumas de Brás Cubas*
3. adaptar consumidores para aceitar schema novo e legado
4. validar Atlas, globo e obra
5. migrar demais obras progressivamente
6. remover `lugares` apenas quando não houver consumidor legado

## 14. Política editorial geográfica

Um topônimo literal não entra automaticamente no Atlas.

Incluem-se apenas referências com função espacial relevante:

- narrativa
- histórica
- biográfica
- menção espacial substantiva
- ficcional quando cartograficamente representável

Excluem-se por padrão:

- metáforas
- comparações
- alusões retóricas
- referências culturais sem papel espacial na obra

## 15. Rotas

Regra fundamental:

`lugares != percurso`

Uma linha no mapa só existe quando houver:

- percurso explícito no texto
- percurso documentado
- reconstrução editorial identificada como tal

A ordem de itens em um array nunca constitui evidência de deslocamento.

## 16. Fontes e proveniência

Hierarquia preferencial:

1. Biblioteca Nacional, BNDigital e Hemeroteca Digital
2. Domínio Público MEC
3. Brasiliana USP e bibliotecas universitárias
4. arquivos públicos
5. edições críticas e pesquisa acadêmica
6. Wikisource quando adequado e verificado

Cada obra deve registrar edição-base e origem do texto.

Coordenadas e inferências devem registrar fonte ou justificativa editorial.

## 17. Arquitetura técnica

Manter nesta fase:

- HTML estático
- CSS modular
- JavaScript modular
- Leaflet
- Three.js apenas para o globo
- GitHub Pages
- GitHub Actions

Não migrar ainda para Next.js, React, banco de dados ou PostGIS.

Essa migração só será considerada quando o volume de dados e manutenção justificar.

Estrutura-alvo:

```text
index.html
atlas.html
biblioteca.html
autores.html
autor.html
obra.html
linha-do-tempo.html
sobre.html
robots.txt
sitemap.xml
README.md
assets/
css/
  tokens.css
  base.css
  components.css
  pages.css
js/
  data.js
  places.js
  catalogo.js
  biblioteca.js
  atlas.js
  autores.js
  autor.js
  obra.js
  timeline.js
  globo.js
  lugares.js
  corpus/
```

## 18. SEO

Cada página deve ter:

- `<title>` específico
- meta description específica
- canonical URL quando aplicável
- Open Graph básico
- favicon

Também criar:

- `robots.txt`
- `sitemap.xml`

Páginas de obra e autor devem atualizar título e descrição dinamicamente sem prejudicar conteúdo principal renderizado.

## 19. Acessibilidade

Requisitos mínimos:

- navegação por teclado
- foco visível
- contraste WCAG AA sempre que viável
- `aria-label` em controles não textuais
- sem dependência exclusiva de cor para significado
- `prefers-reduced-motion`
- mapas com descrição textual alternativa
- menus mobile acessíveis
- headings em ordem semântica

## 20. Performance

- carregar mapa e globo apenas onde necessários
- evitar imagens de grande peso sem otimização
- manter JS sem dependências desnecessárias
- adiar conteúdo secundário quando possível
- Atlas deve carregar índice leve inicialmente
- detalhes, imagens e contexto podem ser carregados sob demanda futuramente

## 21. Testes e gates

Antes de cada publicação:

1. sintaxe JavaScript
2. links internos
3. existência dos arquivos referenciados
4. IDs únicos
5. referências `work_id` e `place_id` válidas
6. vocabulários `tipo`, `escala`, `certeza`
7. ausência de rotas implícitas
8. mobile básico
9. teclado e foco
10. deploy GitHub Pages

## 22. Ordem de implementação

### Fase A — Shell do portal

1. tokens e base CSS
2. navegação global
3. homepage redesenhada
4. Biblioteca
5. Autores
6. Sobre
7. Linha do Tempo
8. rodapé global
9. favicon, robots, sitemap, README

### Fase B — Experiências principais

1. Atlas redesenhado
2. página de obra redesenhada
3. autor individual
4. filtros e busca
5. responsividade e acessibilidade

### Fase C — Schema unificado

1. `places.js`
2. migração de *Memórias Póstumas*
3. `place_mentions`
4. evidências
5. compatibilidade dual
6. migração progressiva das demais obras

### Fase D — Corpus profundo

1. concluir auditoria integral de *Memórias Póstumas*
2. geocodificação histórica
3. eventos
4. personagens
5. rotas validadas
6. story beats
7. segunda obra canônica

## 23. Critérios de sucesso

O portal será considerado maduro para expansão quando:

- todas as páginas principais estiverem navegáveis
- nenhum menu levar a 404
- a experiência mobile for funcional
- Biblioteca e Atlas puderem ser usados independentemente
- a página de obra tiver arquitetura editorial completa
- *Memórias Póstumas* estiver funcionando no schema unificado
- o deploy estiver automatizado e estável
- o método editorial estiver publicamente documentado

## 24. Fora de escopo nesta fase

- autenticação de usuários
- comentários
- contas
- pagamentos
- CMS externo
- IA generativa na interface pública
- migração para React/Next.js
- banco PostGIS
- app mobile nativo
- rotas inferidas automaticamente

Esses itens só serão revisitados quando houver necessidade comprovada.
