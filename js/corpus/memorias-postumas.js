// TERRITÓRIO LITERÁRIO — Corpus profundo TL-01
// Obra-padrão: Memórias Póstumas de Brás Cubas, Machado de Assis.
// Estado: PARCIAL_AUDITAVEL. Este arquivo não afirma exaustividade.
// Fonte textual canônica adotada nesta fase: edição de referência da
// Typographia Nacional, Rio de Janeiro, 1881, transcrita na Wikisource.

window.CORPUS_PROFUNDO = window.CORPUS_PROFUNDO || {};

window.CORPUS_PROFUNDO["memorias-postumas"] = {
  "status": "PARCIAL_AUDITAVEL",
  "versao": "0.5.0",
  "metodologia": "TL-01",
  "edicao": {
    "titulo": "Memorias Posthumas de Braz Cubas",
    "autor": "Machado de Assis",
    "cidade": "Rio de Janeiro",
    "editora": "Typographia Nacional",
    "ano": 1881,
    "fonte": "Wikisource",
    "url": "https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas",
    "nota": "Edição de referência usada para capítulos, grafia e evidência textual nesta baseline."
  },
  "estrutura": {
    "capitulos": 160,
    "cobertura": "parcial_auditada",
    "capitulos_auditados": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,73,97,100,112,141],
    "nota": "A obra possui 160 capítulos. Os capítulos I–LX foram auditados de forma contínua nesta versão; os demais capítulos listados permanecem amostras auditadas de fases anteriores. Não há alegação de exaustividade global."
  },
  "politica_inclusao_geografica": {
    "incluir": [
      "lugares onde ocorre ação narrativa",
      "origens, destinos ou deslocamentos relevantes",
      "lugares biográficos ou históricos materialmente ligados à narrativa",
      "menções espaciais que ajudam a compreender a geografia da obra"
    ],
    "excluir_por_padrao": [
      "alusões mitológicas ou clássicas sem função espacial na narrativa",
      "comparações retóricas com países, cidades ou monumentos",
      "referências enciclopédicas que não situam personagem, evento ou contexto relevante"
    ],
    "nota": "A presença literal de um topônimo no texto não basta, por si só, para gerar uma entidade cartográfica."
  },
  "personagens": [
    {"id":"bras-cubas","nome":"Brás Cubas","papel":"narrador-protagonista"},
    {"id":"virgilia","nome":"Virgília","papel":"personagem-central"},
    {"id":"lobo-neves","nome":"Lobo Neves","papel":"personagem-central"},
    {"id":"quincas-borba","nome":"Quincas Borba","papel":"personagem-central"},
    {"id":"dona-placida","nome":"D. Plácida","papel":"personagem-secundaria"},
    {"id":"marcela","nome":"Marcela","papel":"personagem-secundaria"},
    {"id":"sabina","nome":"Sabina","papel":"personagem-secundaria"},
    {"id":"prudencio","nome":"Prudêncio","papel":"personagem-secundaria"}
  ],
  "place_entities": [
    {"id":"pl-rj-botafogo","canonical_name":"Botafogo, Rio de Janeiro","escala":"bairro"},
    {"id":"pl-rj-catete","canonical_name":"Catete, Rio de Janeiro","escala":"bairro","aliases":["Catete"]},
    {"id":"pl-rj-catumbi","canonical_name":"Catumbi, Rio de Janeiro","escala":"bairro"},
    {"id":"pl-pt-coimbra","canonical_name":"Coimbra, Portugal","escala":"cidade"},
    {"id":"pl-rj-engenho-velho","canonical_name":"Engenho Velho, Rio de Janeiro","escala":"bairro"},
    {"id":"pl-rj-flamengo","canonical_name":"Flamengo, Rio de Janeiro","escala":"bairro"},
    {"id":"pl-rj-gamboa","canonical_name":"Gamboa, Rio de Janeiro","escala":"bairro"},
    {"id":"pl-pt-lisboa","canonical_name":"Lisboa, Portugal","escala":"cidade"},
    {"id":"pl-rj-largo-sao-francisco-paula","canonical_name":"Largo de São Francisco de Paula, Rio de Janeiro","escala":"ponto"},
    {"id":"pl-it-modena","canonical_name":"Módena, Itália","escala":"cidade"},
    {"id":"pl-it-ponte-suspiros","canonical_name":"Ponte dos Suspiros, Veneza","escala":"ponto"},
    {"id":"pl-it-rialto","canonical_name":"Rialto, Veneza","escala":"bairro"},
    {"id":"pl-rj-rio","canonical_name":"Rio de Janeiro, RJ","escala":"cidade","aliases":["Rio de Janeiro","cidade natal"]},
    {"id":"pl-rj-rocio-grande","canonical_name":"Rocio Grande, Rio de Janeiro","escala":"ponto"},
    {"id":"pl-rj-rua-barbonos","canonical_name":"Rua dos Barbonos, Rio de Janeiro","escala":"rota"},
    {"id":"pl-rj-rua-ourives","canonical_name":"Rua dos Ourives, Rio de Janeiro","escala":"rota"},
    {"id":"pl-rj-rua-ouvidor","canonical_name":"Rua do Ouvidor, Rio de Janeiro","escala":"rota"},
    {"id":"pl-br-sp-sao-paulo","canonical_name":"São Paulo, SP","escala":"cidade"},
    {"id":"pl-br-sp-sao-vicente","canonical_name":"São Vicente, São Paulo","escala":"cidade"},
    {"id":"pl-rj-tijuca","canonical_name":"Tijuca, Rio de Janeiro","escala":"bairro"},
    {"id":"pl-it-veneza","canonical_name":"Veneza, Itália","escala":"cidade"},
    {"id":"pl-rj-passeio-publico","canonical_name":"Passeio Público, Rio de Janeiro","escala":"ponto"}
  ],
  "place_mentions": [],
  "eventos": [],
  "percursos": [],
  "notas_editoriais": [
    "Nenhuma rota é inferida automaticamente.",
    "Topônimo confirmado não implica coordenada histórica precisa.",
    "A cobertura integral dos 160 capítulos ainda está em andamento.",
    "Place entities e place mentions são camadas distintas; entidades não devem ser contadas como ocorrências."
  ]
};
