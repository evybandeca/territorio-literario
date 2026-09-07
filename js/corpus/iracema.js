// TERRITÓRIO LITERÁRIO — TL-06 Iracema v1.0
window.CORPUS_PROFUNDO = window.CORPUS_PROFUNDO || {};
window.CORPUS_PROFUNDO["iracema"] = {
  status:"COBERTURA_CONTINUA_AUDITADA",
  versao:"1.0.0",
  metodologia:"TL-06",
  edicao:{titulo:"Iracema",autor:"José de Alencar",cidade:"Rio de Janeiro",editora:"Typ. de Vianna & Filhos",ano:1865,fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema",nota:"Edição de referência: Rio de Janeiro, Typ. de Vianna & Filhos, 1865."},
  estrutura:{capitulos:33,cobertura:"continua_auditada",capitulos_auditados:Array.from({length:33},(_,i)=>i+1),nota:"Os 33 capítulos foram auditados em sequência para ocorrências geográficas materialmente relevantes; isto não implica exaustividade interpretativa absoluta."},
  politica_inclusao_geografica:{incluir:["lugares onde ocorre ação narrativa","territórios indígenas e acidentes geográficos explicitamente nomeados","origens e destinos materialmente relevantes","espaços ficcionais recorrentes com função espacial clara"],excluir_por_padrao:["alusões retóricas","topônimos do prólogo sem função narrativa","lugares hipotéticos ou não realizados","trajetos sem sequência espacial validável"]},
  personagens:[
    {id:"iracema",nome:"Iracema",papel:"protagonista"},
    {id:"martim",nome:"Martim",papel:"protagonista"},
    {id:"poti",nome:"Poti",papel:"personagem-central"},
    {id:"araquem",nome:"Araquém",papel:"personagem-central"},
    {id:"caubi",nome:"Caubi",papel:"personagem-central"},
    {id:"moacir",nome:"Moacir",papel:"personagem-central"}
  ],
  place_entities:[
    {id:"ira-ce-vale-tabajara",canonical_name:"Vale e taba dos Tabajaras",escala:"regiao",aliases:["grande taba","cabana do pajé"],ficcional:true},
    {id:"ira-ce-ipu",canonical_name:"Campos do Ipu, Ceará",escala:"regiao",aliases:["campos do Ipú","Ipú"]},
    {id:"ira-ce-camocim",canonical_name:"Camocim, Ceará",escala:"regiao",aliases:["Camocim"]},
    {id:"ira-ce-acarau",canonical_name:"Acaraú, Ceará",escala:"regiao",aliases:["Acaraú"]},
    {id:"ira-ce-terras-pitiguaras",canonical_name:"Terras dos Pitiguaras, litoral do Ceará",escala:"regiao",aliases:["terras dos Pytiguaras"],ficcional:true},
    {id:"ira-ce-cabana-jacauna",canonical_name:"Cabana de Jacaúna",escala:"ponto",aliases:["cabana de Jacaúna"],ficcional:true},
    {id:"ira-ce-foz-trairas",canonical_name:"Foz do rio das traíras",escala:"regiao",aliases:["foz do rio onde se criam traíras"],ficcional:true},
    {id:"ira-ce-praias-mar",canonical_name:"Praias do mar, Ceará",escala:"regiao",aliases:["praias do mar","praias do Ceará"]},
    {id:"ira-ce-rio-cabana",canonical_name:"Rio junto à cabana litorânea",escala:"regiao",aliases:["margem do rio"],ficcional:true},
    {id:"ira-ce-morro-areias",canonical_name:"Morro das areias",escala:"ponto",aliases:["morro das areias"],ficcional:true}
  ],
  place_mentions:[
    {id:"ira-taba-ch3",place_id:"ira-ce-vale-tabajara",nome_textual:"grande taba",canonical_name:"Vale e taba dos Tabajaras",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",capitulo:3,funcao:"Iracema conduz Martim através da floresta até a grande taba e a cabana de Araquém",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/III",nota:"O capítulo situa a taba no vale e a cabana do pajé no rochedo."},lat:null,lon:null,status_geografico:"LUGAR_FICCIONAL_GEOMETRIA_NAO_FIXADA"},
    {id:"ira-camocim-ch20",place_id:"ira-ce-camocim",nome_textual:"Camocim",canonical_name:"Camocim, Ceará",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:20,funcao:"uma das margens dominadas pelos Pitiguaras onde se instala o novo núcleo narrativo",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XX",nota:"O texto situa os Pitiguaras como senhores das margens do Camocim e Acaraú."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"ira-acarau-ch20",place_id:"ira-ce-acarau",nome_textual:"Acaraú",canonical_name:"Acaraú, Ceará",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:20,funcao:"uma das margens do território pitiguara",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XX",nota:"O texto situa os Pitiguaras como senhores das margens do Camocim e Acaraú."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"ira-pitiguaras-ch20",place_id:"ira-ce-terras-pitiguaras",nome_textual:"terras dos Pytiguaras",canonical_name:"Terras dos Pitiguaras, litoral do Ceará",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",capitulo:20,funcao:"território de acolhimento de Martim e Iracema após a fuga",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XX",nota:"Martim e Iracema estão há três sóis nas terras dos Pitiguaras."},lat:null,lon:null,status_geografico:"TERRITORIO_LITERARIO_SEM_GEOMETRIA_FIXA"},
    {id:"ira-jacauna-ch20",place_id:"ira-ce-cabana-jacauna",nome_textual:"cabana de Jacaúna",canonical_name:"Cabana de Jacaúna",tipo:"ficcional",escala:"ponto",certeza:"ilustrativo",capitulo:20,funcao:"hospedagem de Martim e Iracema em território pitiguara",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XX",nota:"Os estrangeiros têm sua rede na vasta cabana de Jacaúna."},lat:null,lon:null,status_geografico:"LUGAR_FICCIONAL_GEOMETRIA_NAO_FIXADA"},
    {id:"ira-foz-ch21",place_id:"ira-ce-foz-trairas",nome_textual:"foz do rio",canonical_name:"Foz do rio das traíras",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",capitulo:21,funcao:"parada costeira habitada por pescadores pitiguaras durante o deslocamento",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XXI",nota:"Os viajantes chegam à foz de um rio onde há abundância de traíras; o texto não fixa com segurança seu equivalente moderno."},lat:null,lon:null,status_geografico:"TOPONIMO_NAO_NOMEADO_SEM_GEOMETRIA"},
    {id:"ira-ipu-ch23",place_id:"ira-ce-ipu",nome_textual:"campos do Ipú",canonical_name:"Campos do Ipu, Ceará",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:23,funcao:"território de origem de Iracema, abandonado quatro luas antes",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XXIII",nota:"O capítulo afirma que Iracema deixara os campos do Ipú quatro luas antes."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"ira-praias-ch23",place_id:"ira-ce-praias-mar",nome_textual:"praias do mar",canonical_name:"Praias do mar, Ceará",tipo:"narrativo",escala:"regiao",certeza:"ilustrativo",capitulo:23,funcao:"novo território de residência de Iracema com Martim",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XXIII",nota:"Iracema habita há três luas nas praias do mar a cabana de seu esposo."},lat:null,lon:null,status_geografico:"REGIAO_LITORANEA_SEM_PONTO_UNICO"},
    {id:"ira-rio-ch30",place_id:"ira-ce-rio-cabana",nome_textual:"margem do rio",canonical_name:"Rio junto à cabana litorânea",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",capitulo:30,funcao:"local do parto de Moacir e do banho do recém-nascido",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XXX",nota:"Iracema busca a margem do rio, dá à luz e entra nas águas com o filho."},lat:null,lon:null,status_geografico:"CURSO_DAGUA_NAO_NOMEADO"},
    {id:"ira-tabajaras-ch31",place_id:"ira-ce-vale-tabajara",nome_textual:"montanhas dos Tabajaras",canonical_name:"Vale e taba dos Tabajaras",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",capitulo:31,funcao:"destino de retorno de Caubi e referência ao território familiar de Iracema",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XXXI",nota:"Iracema diz que Caubi tornará às montanhas dos Tabajaras."},lat:null,lon:null,status_geografico:"TERRITORIO_LITERARIO_SEM_GEOMETRIA_FIXA"},
    {id:"ira-praias-ch33",place_id:"ira-ce-praias-mar",nome_textual:"praias do Ceará",canonical_name:"Praias do mar, Ceará",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:33,funcao:"território do qual Martim parte levando Moacir e para o qual promete retornar",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XXXIII",nota:"O capítulo situa a partida nas praias do Ceará e a espera de Poti pela volta de Martim."},lat:null,lon:null,status_geografico:"REGIAO_LITORANEA_CONFIRMADA_SEM_PONTO_UNICO"},
    {id:"ira-morro-ch33",place_id:"ira-ce-morro-areias",nome_textual:"morro das areias",canonical_name:"Morro das areias",tipo:"ficcional",escala:"ponto",certeza:"ilustrativo",capitulo:33,funcao:"ponto de observação de Poti enquanto espera a vela de Martim",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Iracema/XXXIII",nota:"Poti sobe todas as manhãs ao morro das areias para olhar o mar."},lat:null,lon:null,status_geografico:"LUGAR_RELATIVO_SEM_GEOMETRIA"}
  ],
  eventos:[
    {id:"ira-ev-encontro",capitulo:2,titulo:"Encontro de Iracema e Martim"},
    {id:"ira-ev-taba",capitulo:3,titulo:"Chegada à taba de Araquém"},
    {id:"ira-ev-fuga",capitulo:18,titulo:"Ruptura e fuga do território tabajara"},
    {id:"ira-ev-pitiguaras",capitulo:20,titulo:"Chegada às terras dos Pitiguaras"},
    {id:"ira-ev-moacir",capitulo:30,titulo:"Nascimento de Moacir"},
    {id:"ira-ev-desfecho",capitulo:33,titulo:"Partida de Martim e Moacir"}
  ],
  percursos:[]
};
