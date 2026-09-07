// TERRITÓRIO LITERÁRIO — TL-08 Úrsula v0.1
window.CORPUS_PROFUNDO = window.CORPUS_PROFUNDO || {};
window.CORPUS_PROFUNDO["ursula"] = {
  status:"COBERTURA_ESTRUTURAL_CONTINUA_AUDITADA",
  versao:"0.1.0",
  metodologia:"TL-08",
  edicao:{titulo:"Úrsula: romance original brasileiro",autor:"Maria Firmina dos Reis",cidade:"São Luís",editora:"Typographia do Progresso",ano:1859,fonte:"Wikisource — transcrição vinculada à digitalização da edição de 1859",url:"https://pt.wikisource.org/wiki/%C3%9Arsula",nota:"Fonte congelada: São Luís, Typographia do Progresso, rua de Sant'Anna 49, 1859. A edição apresenta Prólogo, vinte capítulos numerados e Epílogo."},
  estrutura:{
    unidades:22,
    unidade_tipo:"prologo_20_capitulos_epilogo",
    unidades_auditadas:Array.from({length:22},(_,i)=>i+1),
    blocos:[{titulo:"Prólogo",inicio:1,fim:1},{titulo:"Capítulos I–XX",inicio:2,fim:21},{titulo:"Epílogo",inicio:22,fim:22}],
    nota:"A v0.1 congela e audita a estrutura integral da edição de 1859. Não reivindica ainda exaustividade toponímica do corpo de todos os capítulos."
  },
  politica_inclusao_geografica:{incluir:["lugares explicitamente nomeados e materialmente ligados à ação ou à biografia interna dos personagens","instituições e espaços nomeados mesmo quando a identidade histórica exata ainda não está desambiguada"],excluir_por_padrao:["província do Norte sem nome explícito","comarca de ***","convento de ***","inferência automática de Maranhão a partir do contexto editorial ou biográfico","país africano de Susana quando não nomeado no texto"]},
  personagens:[
    {id:"ursula",nome:"Úrsula",papel:"protagonista"},
    {id:"tancredo",nome:"Tancredo",papel:"protagonista"},
    {id:"tulio",nome:"Túlio",papel:"personagem-central"},
    {id:"susana",nome:"Susana",papel:"personagem-central"},
    {id:"luisa-b",nome:"Luísa B.",papel:"personagem-central"},
    {id:"fernando-p",nome:"Fernando P.",papel:"antagonista"}
  ],
  eventos:[],
  place_entities:[
    {id:"urs-sp-sao-paulo",canonical_name:"São Paulo",escala:"cidade",aliases:["São Paulo"]},
    {id:"urs-br-praias-brasileiras",canonical_name:"Praias brasileiras — local de desembarque não especificado",escala:"regiao",aliases:["praias brasileiras"]},
    {id:"urs-santa-cruz-cemiterio",canonical_name:"Cemitério de Santa Cruz",escala:"ponto",aliases:["cemitério de Santa Cruz","cemiterio de Sancta-Cruz"]},
    {id:"urs-convento-carmelitas",canonical_name:"Convento dos Carmelitas — localidade não especificada",escala:"ponto",aliases:["convento dos carmelitas"]}
  ],
  place_mentions:[
    {id:"urs-sao-paulo-u5",place_id:"urs-sp-sao-paulo",canonical_name:"São Paulo",unidade:5,unidade_label:"Cap. IV — A primeira impressão",tipo:"biografico",escala:"cidade",certeza:"identificado",funcao:"Cidade onde Tancredo afirma ter cursado Direito durante seis anos antes de regressar à terra natal.",evidencia:{url:"https://pt.wikisource.org/wiki/%C3%9Arsula/IV",nota:"Tancredo relata que foi para São Paulo cursar Direito e ali viveu seis anos."}},
    {id:"urs-praias-brasileiras-u10",place_id:"urs-br-praias-brasileiras",canonical_name:"Praias brasileiras — local de desembarque não especificado",unidade:10,unidade_label:"Cap. IX — A preta Susana",tipo:"historico",escala:"regiao",certeza:"ilustrativo",funcao:"Destino explicitamente descrito por Susana ao narrar a travessia forçada no tráfico atlântico, sem porto ou província identificados.",evidencia:{url:"https://pt.wikisource.org/wiki/%C3%9Arsula/IX",nota:"Susana narra que, após trinta dias no porão do navio, os cativos abordaram às praias brasileiras."}},
    {id:"urs-cemiterio-santa-cruz-u14",place_id:"urs-santa-cruz-cemiterio",canonical_name:"Cemitério de Santa Cruz",unidade:14,unidade_label:"Cap. XIII — O cemitério de Santa Cruz",tipo:"narrativo",escala:"ponto",certeza:"identificado",funcao:"Local onde Úrsula visita a sepultura da mãe e encontra Tancredo e Túlio.",evidencia:{url:"https://pt.wikisource.org/wiki/%C3%9Arsula/XIII",nota:"O capítulo nomeia e descreve repetidamente o cemitério de Santa Cruz e a estrada que ia a Santa Cruz."}},
    {id:"urs-convento-carmelitas-u22",place_id:"urs-convento-carmelitas",canonical_name:"Convento dos Carmelitas — localidade não especificada",unidade:22,unidade_label:"Epílogo",tipo:"narrativo",escala:"ponto",certeza:"ilustrativo",funcao:"Instituição em que o epílogo situa o noviciado de frei Luís de Santa Úrsula, sem identificação topográfica suficiente para marcador.",evidencia:{url:"https://pt.wikisource.org/wiki/%C3%9Arsula/Ep%C3%ADlogo",nota:"O epílogo afirma que um homem entrara no convento dos carmelitas e iniciara o noviciado."}}
  ],
  percursos:[],
  notas:[
    "A paisagem inicial é situada apenas em uma das províncias do Norte; o corpus não a converte automaticamente em Maranhão.",
    "O país africano natal de Susana não é nomeado e, portanto, não recebe identidade geográfica canônica específica.",
    "O convento de *** e a comarca de *** preservam a anonimização textual e não são geocodificados.",
    "Nenhuma rota é inferida e nenhuma coordenada nova é atribuída nesta fase."
  ]
};
