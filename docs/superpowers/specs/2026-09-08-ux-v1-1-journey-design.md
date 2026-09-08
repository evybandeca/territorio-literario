# Território Literário — UX v1.1 Journey Design

Data: 2026-09-08
Status: design aprovado em conversa, aguardando revisão formal da especificação

## 1. Objetivo

Evoluir o Território Literário de um portal editorial tecnicamente sólido para uma experiência contínua de descoberta, escolha, leitura e exploração territorial.

A UX v1.1 não altera o corpus, a semântica editorial, a política de evidência ou a arquitetura de dados. O foco é reduzir fricção entre páginas, aumentar clareza de decisão e melhorar permanência em leitura e exploração, especialmente em mobile.

A identidade visual atual deve ser preservada como publicação cultural, museu digital e atlas literário contemporâneo. A mudança é estrutural e hierárquica, não uma descaracterização estética.

## 2. Princípios de UX

1. Cada tela deve ter uma ação principal inequívoca.
2. Descoberta, escolha, leitura e território devem formar uma jornada contínua.
3. Mobile é um contexto de uso principal, não uma adaptação posterior.
4. Conteúdo editorial continua prioritário sobre ornamentação.
5. O globo e o mapa são assinaturas do produto, mas não devem bloquear ações essenciais.
6. O leitor deve favorecer longa permanência, baixa distração e retomada de contexto.
7. O Atlas deve favorecer exploração progressiva, não exposição simultânea de todos os controles.
8. A navegação deve preservar estado útil quando o usuário alterna entre obra, leitura e território.
9. Acessibilidade, teclado, reduced motion, lazy loading, performance e semântica SEO são invariantes.
10. Nenhuma mudança de UX pode introduzir inferência editorial, geográfica ou histórica.

## 3. Jornada principal

A jornada canônica passa a ser:

**Descobrir → Escolher uma obra → Ler → Explorar lugares → Descobrir outra obra**

Fluxos secundários:

- Descobrir → Atlas → Lugar → Obra → Ler
- Biblioteca → Obra → Ler → Atlas do capítulo
- Leitor → capítulo → lugar associado → Atlas → outras obras
- Home → continuar leitura → capítulo salvo

A navegação deve reduzir retornos ao ponto inicial e evitar que cada página pareça um produto isolado.

## 4. Arquitetura de informação

### 4.1 Navegação global

Itens principais preservados:

- Início
- Atlas
- Biblioteca
- Autores
- Linha do Tempo
- Sobre

A navegação global deve ganhar estado ativo evidente e melhor comportamento mobile.

A busca global permanece disponível e deve ser tratada como atalho transversal, não como substituto da navegação contextual.

### 4.2 Hierarquia de ações

Em todas as páginas:

- uma ação primária
- no máximo duas ações secundárias próximas
- ações metodológicas ou de proveniência entram em nível terciário

CTAs concorrentes com peso visual idêntico devem ser evitados.

## 5. Home

### 5.1 Objetivo da tela

Permitir que o visitante entenda o produto em poucos segundos e escolha rapidamente como começar.

### 5.2 Hero

Preservar:

- globo interativo
- marca Território Literário
- assinatura “Toda história ocupa um lugar.”

Reorganizar para destacar três intenções:

- começar por uma obra
- explorar o mapa
- continuar lendo, quando houver estado salvo

O globo não deve impedir leitura, foco ou acesso aos CTAs em mobile.

### 5.3 Entradas principais

A Home terá três entradas hierarquizadas:

1. **Começar por uma obra**
2. **Explorar o Atlas**
3. **Percorrer a linha do tempo**

“Continuar lendo” aparece acima ou junto das entradas apenas quando houver progresso salvo no navegador.

### 5.4 Curadoria

A curadoria deve reduzir volume visual e priorizar utilidade:

- obra em destaque
- autor
- ano/movimento
- disponibilidade de leitura integral
- principal dimensão territorial

Não criar ranking editorial implícito.

## 6. Biblioteca

### 6.1 Objetivo da tela

Reduzir o tempo entre chegada e escolha de uma obra.

### 6.2 Toolbar

Desktop:

- busca
- movimento
- ordenação
- filtros complementares somente quando sustentados por dados

Mobile:

- busca persistente e visível
- botão “Filtros” abre painel recolhível
- contador de resultados permanece visível
- botão de limpar filtros disponível sem exigir rolagem extensa

### 6.3 Cards

Cada card deve responder rapidamente:

- que obra é essa?
- quem escreveu?
- quando foi publicada?
- posso ler integralmente aqui?
- existe conteúdo territorial relevante?

Informações mínimas:

- título
- autor
- ano
- movimento
- indicador de leitura integral quando disponível
- indicador territorial ou número de ocorrências, quando útil

A ação principal do card é abrir a obra. “Ler agora” pode aparecer como ação secundária direta quando houver reader hospedado, sem competir com o título.

### 6.4 Estados

Definir explicitamente:

- carregando
- nenhum resultado
- filtro ativo
- erro de carregamento

Nenhum estado deve deixar área vazia sem explicação.

## 7. Página da obra

### 7.1 Objetivo da tela

Funcionar como hub da obra, conectando contexto, leitura e território.

### 7.2 Hierarquia

Ordem principal:

1. título, autor, ano e movimento
2. sinopse curta
3. ação principal de leitura
4. resumo territorial
5. dossiê editorial
6. fontes e metodologia

### 7.3 CTAs

Quando houver leitura hospedada:

- primário: **Ler agora**
- secundário: **Explorar lugares no Atlas**

Quando não houver leitura hospedada:

- primário: **Explorar lugares no Atlas**
- fonte externa, quando existente, permanece como ação editorial secundária

### 7.4 Continuidade

Se houver progresso de leitura salvo para a obra, substituir ou complementar “Ler agora” por “Continuar leitura”, indicando capítulo ou posição lógica quando disponível.

### 7.5 Conteúdo territorial

Antes do dossiê extenso, exibir um resumo objetivo:

- número de lugares/ocorrências relevantes
- exemplos destacados
- estado de geocodificação quando necessário

A ausência de geocodificação não deve ser comunicada como ausência de lugar literário.

## 8. Leitor

### 8.1 Objetivo da tela

Maximizar conforto, continuidade e concentração em sessões longas.

### 8.2 Desktop

Preservar índice lateral, mas simplificar visualmente.

Estrutura:

- índice e busca na lateral
- texto no centro
- toolbar discreta
- progresso visível
- navegação de capítulo clara

### 8.3 Mobile

O índice deixa de ocupar espaço permanente.

Usar painel deslizante ou drawer acionado por botão “Capítulos”.

Toolbar mobile deve oferecer:

- índice
- busca
- tamanho de fonte
- progresso
- acesso contextual ao Atlas quando o capítulo possuir ocorrências

Não usar toolbar fixa grande que reduza significativamente a área de leitura.

### 8.4 Tipografia

A leitura deve priorizar:

- largura de linha adequada
- line-height confortável
- contraste suficiente
- escala responsiva
- espaçamento previsível entre parágrafos

Preferências do usuário permanecem persistidas localmente.

### 8.5 Progresso

Progresso deve ser compreensível sem exigir cálculo mental.

Exemplos aceitáveis:

- “Capítulo 18 de 160”
- barra de progresso discreta

Evitar percentual falso quando a estrutura textual não permitir medição confiável por posição.

### 8.6 Atlas contextual

Quando um capítulo possui lugares documentados, mostrar uma ação curta e contextual.

Essa ação deve abrir o Atlas com contexto da obra/capítulo quando a infraestrutura já permitir sem quebrar compatibilidade. Caso contrário, abrir o Atlas filtrado pela obra.

## 9. Atlas

### 9.1 Objetivo da tela

Transformar o Atlas em uma experiência de exploração progressiva, especialmente no mobile.

### 9.2 Desktop

Usar dois estados principais:

**Explorar**

- busca
- filtros essenciais
- lista de resultados
- mapa dominante

**Lugar selecionado**

- dossiê do lugar
- obras associadas
- ocorrências
- evidências
- ação para voltar aos resultados

Evitar exibir simultaneamente controles, lista extensa e dossiê completo no mesmo nível de atenção.

### 9.3 Mobile

Mapa ocupa a maior área útil da tela.

Busca, filtros e resultados entram em bottom sheet ou painel inferior com três estados:

- recolhido
- parcial
- expandido

O dossiê de um lugar reutiliza o mesmo painel e não cria outra camada modal concorrente.

### 9.4 Filtros

Priorizar inicialmente:

- busca textual
- tipo
- certeza

Filtros adicionais entram somente se aumentarem descoberta sem criar carga cognitiva excessiva.

### 9.5 Geocodificação

Entidades sem coordenadas continuam válidas editorialmente.

O mapa deve explicar de forma discreta que ausência de marcador pode significar geocodificação pendente.

Nenhuma UX pode sugerir precisão superior à proveniência disponível.

## 10. Navegação transversal e persistência

Persistir somente estado que melhora retomada:

- última obra lida
- último capítulo lido
- preferência de fonte
- filtros úteis de Biblioteca e Atlas, quando já suportados

Não persistir estados transitórios que possam confundir o usuário ao retornar dias depois.

Links contextuais devem usar parâmetros de URL quando necessário para manter páginas compartilháveis e reproduzíveis.

## 11. Responsividade

Viewports obrigatórios de QA:

- 360 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1440 px

Critérios:

- sem overflow horizontal
- CTAs alcançáveis sem zoom
- alvos interativos adequados ao toque
- navegação utilizável com teclado
- mapa e reader não aprisionam foco
- drawers/bottom sheets restauram foco corretamente

## 12. Acessibilidade

Requisitos obrigatórios:

- manter Lighthouse accessibility >= 100 no baseline automatizado atual sempre que o ambiente permitir comparação equivalente
- preservar skip link e landmarks
- foco visível
- navegação completa por teclado
- estados de drawer e bottom sheet com `aria-expanded`, rotulagem e gerenciamento de foco
- `prefers-reduced-motion`
- live regions apenas para mudanças relevantes
- contraste conforme WCAG AA
- ordem DOM coerente com ordem visual

A auditoria automatizada não substitui revisão manual com leitor de tela.

## 13. Performance

Baseline de produção antes da UX v1.1:

- Performance Lighthouse: 99
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- FCP: 0.8 s
- LCP: 0.8 s
- TBT: 0 ms
- CLS: 0.011

A UX v1.1 deve preservar:

- lazy loading dos corpora
- ausência de framework pesado
- ausência de dependências grandes sem justificativa
- budget de JS/CSS atual como referência

Critério de regressão:

- não aceitar queda significativa de performance por efeitos visuais, drawers ou transições
- qualquer nova dependência deve ter justificativa explícita

## 14. Compatibilidade e invariantes editoriais

Não alterar:

- schema dos corpora
- política de evidências
- reader registry
- direitos/proveniência
- semântica de geocodificação
- regra de zero rotas inferidas
- separação entre place_entity e place_mention

A UX deve consumir os dados existentes sem reinterpretá-los.

## 15. Estratégia de implementação

A execução será dividida em quatro blocos independentes, cada um com PR próprio e validação completa.

### UX-01 — Navegação, Home e Biblioteca

- hierarquia global
- CTA de continuar leitura na Home
- simplificação das entradas
- toolbar mobile da Biblioteca
- cards orientados à escolha
- estados vazios e de filtro

### UX-02 — Página da obra e Leitor

- hierarquia do hub da obra
- CTA Ler agora/Continuar leitura
- resumo territorial
- drawer de capítulos no mobile
- progresso de leitura
- toolbar compacta

### UX-03 — Atlas

- estados Explorar/Lugar selecionado
- reorganização desktop
- bottom sheet mobile
- filtros essenciais
- continuidade entre Atlas e Obra

### UX-04 — Polish transversal e QA

- microinterações
- consistência de espaçamento e hierarquia
- refinamento de estados de foco
- mobile QA completo
- regressão de performance
- smoke em produção

## 16. Estratégia de testes

Cada bloco deve seguir TDD para comportamento novo sempre que aplicável.

Gates mínimos:

- `smoke-check.mjs`
- `audit-public-pages.mjs`
- `audit-performance-budget.mjs`
- corpus registry e validadores editoriais existentes
- `node --check` para JS
- browser QA em Chromium
- testes explícitos de viewport mobile
- teclado
- reduced motion
- Lighthouse antes do merge final de cada etapa relevante
- production smoke após merge no main

Adicionar testes específicos para:

- “Continuar leitura” somente quando houver estado válido
- drawer do reader
- bottom sheet do Atlas
- preservação/restauração de foco
- filtros mobile da Biblioteca
- links contextuais Obra → Leitor → Atlas

## 17. Critérios de aceitação da UX v1.1

A UX v1.1 estará concluída quando:

1. Home oferece início claro por obra, território e retomada de leitura.
2. Biblioteca permite localizar e escolher uma obra confortavelmente em 360–430 px.
3. Página da obra possui CTA primário coerente com disponibilidade de leitura.
4. Leitor mobile não depende de sidebar permanente.
5. Progresso e retomada de leitura são claros.
6. Atlas mobile usa mapa dominante e painel inferior progressivo.
7. Atlas desktop separa exploração e dossiê de lugar sem sobrecarga visual.
8. A navegação entre obra, leitor e Atlas preserva contexto útil.
9. Não há regressão editorial ou de proveniência.
10. Todos os workflows e smoke de produção passam.
11. Lighthouse permanece dentro dos gates definidos.
12. A experiência é navegável por teclado e respeita reduced motion.

## 18. Fora de escopo

Não faz parte da UX v1.1:

- autenticação de usuários
- contas e sincronização em nuvem
- comentários sociais
- recomendações algorítmicas personalizadas
- migração para React/Vue/Svelte
- backend dedicado
- CMS
- alteração do corpus fundador
- geocodificação adicional
- criação de rotas literárias
- redesign completo da identidade visual

Esses itens podem ser avaliados em ciclos posteriores sem bloquear a v1.1.
