// TERRITÓRIO LITERÁRIO — TL-11 Macunaíma v0.1
window.CORPUS_PROFUNDO = window.CORPUS_PROFUNDO || {};
window.CORPUS_PROFUNDO["macunaima"] = {
  status:"COBERTURA_ESTRUTURAL_CONTINUA_AUDITADA",
  versao:"0.1.0",
  metodologia:"TL-11",
  edicao:{titulo:"Macunaíma: o heroi sem nenhum caracter",autor:"Mário de Andrade",cidade:"São Paulo",editora:"[s.n.] — Oficinas Gráficas de Eugênio Cupolo",ano:1928,fonte:"Wikisource — transcrição da 1ª edição; Brasiliana USP — exemplar digitalizado",url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928",nota:"Fonte congelada: primeira edição, São Paulo, 1928, edição de oitocentos exemplares. A BBM identifica a impressão pelas Oficinas Gráficas de Eugênio Cupolo."},
  estrutura:{unidades:19,unidade_tipo:"18_capitulos_mais_epilogo_da_edicao_original",unidades_auditadas:Array.from({length:19},(_,i)=>i+1),blocos:[{titulo:"Capítulos I–XVIII",inicio:1,fim:18},{titulo:"Epílogo",inicio:19,fim:19}],nota:"A v0.1 congela integralmente a estrutura da primeira edição e registra apenas geografia narrativa explicitamente sustentada por passagens verificadas; não reivindica exaustividade toponímica."},
  politica_inclusao_geografica:{incluir:["lugares explicitamente nomeados onde ocorre ação narrativa","rios, ilhas, serras e cidades materialmente ligados aos deslocamentos","lugares recorrentes que estruturam origem, ida e retorno do herói"],excluir_por_padrao:["enumerações paródicas sem função espacial material","geografia fantástica sem identidade minimamente estável","rotas inferidas entre topônimos","coordenadas produzidas apenas por equivalência nominal"]},
  personagens:[
    {id:"macunaima",nome:"Macunaíma",papel:"protagonista"},
    {id:"maanape",nome:"Maanape",papel:"personagem-central"},
    {id:"jigue",nome:"Jiguê",papel:"personagem-central"},
    {id:"ci",nome:"Ci, Mãe do Mato",papel:"personagem-central"},
    {id:"piaima",nome:"Piaimã / Venceslau Pietro Pietra",papel:"antagonista"},
    {id:"vei",nome:"Vei, a Sol",papel:"personagem-central"}
  ],
  eventos:[],
  place_entities:[
    {id:"mac-rio-uraricoera",canonical_name:"Rio Uraricoera",escala:"regiao",aliases:["Uraricoera"]},
    {id:"mac-rio-negro",canonical_name:"Rio Negro",escala:"regiao",aliases:["rio Negro"]},
    {id:"mac-ilha-marapata",canonical_name:"Ilha de Marapatá",escala:"ponto",aliases:["ilha de Marapatá"]},
    {id:"mac-sp-sao-paulo",canonical_name:"São Paulo",escala:"cidade",aliases:["São Paulo"]},
    {id:"mac-rio-araguaia",canonical_name:"Rio Araguaia",escala:"regiao",aliases:["Araguaia"]},
    {id:"mac-roraima",canonical_name:"Roraima",escala:"regiao",aliases:["Roraima"]},
    {id:"mac-sp-pico-jaragua",canonical_name:"Pico do Jaraguá, São Paulo",escala:"ponto",aliases:["pico do Jaraguá"]},
    {id:"mac-forte-sao-joaquim",canonical_name:"Forte São Joaquim",escala:"ponto",aliases:["forte São Joaquim"]}
  ],
  place_mentions:[
    {id:"mac-uraricoera-u1",place_id:"mac-rio-uraricoera",canonical_name:"Rio Uraricoera",unidade:1,unidade_label:"Cap. I — Macunaíma",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"O murmurejo do Uraricoera situa o nascimento de Macunaíma no fundo do mato-virgem.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/I",nota:"O primeiro parágrafo associa diretamente o nascimento do herói ao Uraricoera."}},
    {id:"mac-rio-negro-u5",place_id:"mac-rio-negro",canonical_name:"Rio Negro",unidade:5,unidade_label:"Cap. V — Piaimã",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Macunaíma chega à foz do Rio Negro antes de seguir viagem para São Paulo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/V",nota:"O capítulo diz que Macunaíma vai até a foz do rio Negro."}},
    {id:"mac-marapata-u5",place_id:"mac-ilha-marapata",canonical_name:"Ilha de Marapatá",unidade:5,unidade_label:"Cap. V — Piaimã",tipo:"narrativo",escala:"ponto",certeza:"identificado",funcao:"Lugar onde o herói deixa a consciência antes de continuar a viagem.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/V",nota:"A ilha de Marapatá é explicitamente nomeada como destino da consciência do herói."}},
    {id:"mac-sao-paulo-u5",place_id:"mac-sp-sao-paulo",canonical_name:"São Paulo",unidade:5,unidade_label:"Cap. V — Piaimã",tipo:"narrativo",escala:"cidade",certeza:"identificado",funcao:"Destino explícito da viagem de Macunaíma e seus irmãos.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/V",nota:"O texto afirma que os três vinham para São Paulo."}},
    {id:"mac-araguaia-u5",place_id:"mac-rio-araguaia",canonical_name:"Rio Araguaia",unidade:5,unidade_label:"Cap. V — Piaimã",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Rio explicitamente apresentado como facilitador da viagem em direção a São Paulo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/V",nota:"O texto diz que o Araguaia facilitou a viagem."}},
    {id:"mac-roraima-u5",place_id:"mac-roraima",canonical_name:"Roraima",unidade:5,unidade_label:"Cap. V — Piaimã",tipo:"mencionado",escala:"regiao",certeza:"identificado",funcao:"Lugar onde permanecem escondidos os tesouros herdados de Ci.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/V",nota:"O capítulo localiza os tesouros nas grunhas do Roraima."}},
    {id:"mac-jaragua-u16",place_id:"mac-sp-pico-jaragua",canonical_name:"Pico do Jaraguá, São Paulo",unidade:16,unidade_label:"Cap. XVI — A pacuera de Oibê",tipo:"narrativo",escala:"ponto",certeza:"identificado",funcao:"Marco da saída de São Paulo no retorno dos três irmãos à querência.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XVI",nota:"O texto afirma que atravessam o pico do Jaraguá e Macunaíma olha para trás, contemplando São Paulo."}},
    {id:"mac-sao-paulo-u16",place_id:"mac-sp-sao-paulo",canonical_name:"São Paulo",unidade:16,unidade_label:"Cap. XVI — A pacuera de Oibê",tipo:"narrativo",escala:"cidade",certeza:"identificado",funcao:"Cidade deixada para trás no início do retorno à querência.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XVI",nota:"Macunaíma contempla explicitamente a cidade de São Paulo ao atravessar o Jaraguá."}},
    {id:"mac-uraricoera-u17",place_id:"mac-rio-uraricoera",canonical_name:"Rio Uraricoera",unidade:17,unidade_label:"Cap. XVII — Uraricoera",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Eixo do retorno à região de origem do herói.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XVII",nota:"A viagem atinge as cabeceiras e depois o ruidejar do Uraricoera."}},
    {id:"mac-forte-u17",place_id:"mac-forte-sao-joaquim",canonical_name:"Forte São Joaquim",unidade:17,unidade_label:"Cap. XVII — Uraricoera",tipo:"historico",escala:"ponto",certeza:"identificado",funcao:"Marco territorial explicitamente reconhecido durante o retorno pelo Uraricoera.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XVII",nota:"O texto menciona o forte São Joaquim durante a passagem da paisagem."}},
    {id:"mac-uraricoera-u18",place_id:"mac-rio-uraricoera",canonical_name:"Rio Uraricoera",unidade:18,unidade_label:"Cap. XVIII — Ursa Maior",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Paisagem do isolamento final do herói antes do epílogo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XVIII",nota:"O silêncio é descrito à beira-rio do Uraricoera."}}
  ],
  percursos:[],
  notas:["A espacialidade deliberadamente vertiginosa e fantástica de Macunaíma exige gate conservador: esta v0.1 não transforma enumerações ou saltos paródicos em rotas cartográficas.","Nenhuma coordenada nova é introduzida nesta fase.","A primeira edição está congelada; a auditoria toponímica integral seguirá sobre as 19 unidades já estruturadas."]
};
