// TERRITÓRIO LITERÁRIO — TL-05 O Guarani v1.0
window.CORPUS_PROFUNDO = window.CORPUS_PROFUNDO || {};
window.CORPUS_PROFUNDO["o-guarani"] = {
  status:"COBERTURA_CONTINUA_AUDITADA",
  versao:"1.0.0",
  metodologia:"TL-05",
  edicao:{titulo:"O Guarani",autor:"José de Alencar",cidade:"Rio de Janeiro",editora:"Emp. Tip. Nacional do Diário",ano:1857,fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani",nota:"Publicado inicialmente em folhetins no Diário do Rio de Janeiro entre janeiro e abril de 1857 e em volume pela Emp. Tip. Nacional do Diário no mesmo ano."},
  estrutura:{partes:4,capitulos:54,capitulos_por_parte:[15,14,14,11],cobertura:"continua_auditada",capitulos_auditados:[...Array(54)].map((_,i)=>i+1),nota:"As quatro partes e os 54 capítulos foram percorridos em sequência para ocorrências geográficas materialmente relevantes; a cobertura não implica exaustividade interpretativa absoluta."},
  politica_inclusao_geografica:{incluir:["cenários em que ocorre ação narrativa","rios, serras e regiões que estruturam materialmente a ação","instituições e lugares históricos explicitamente vinculados aos acontecimentos","lugares ficcionais recorrentes com função espacial clara"],excluir_por_padrao:["alusões clássicas ou retóricas","lugares apenas biográficos sem função na cena","destinos propostos mas não realizados","rotas reconstruídas sem sequência espacial verificável"]},
  personagens:[
    {id:"peri",nome:"Peri",papel:"protagonista"},
    {id:"cecilia",nome:"Cecília",papel:"protagonista"},
    {id:"antonio-mariz",nome:"D. Antônio de Mariz",papel:"personagem-central"},
    {id:"alvaro",nome:"Álvaro de Sá",papel:"personagem-central"},
    {id:"loredano",nome:"Loredano / Frei Ângelo di Luca",papel:"antagonista"},
    {id:"isabel",nome:"Isabel",papel:"personagem-central"},
    {id:"diogo",nome:"D. Diogo de Mariz",papel:"personagem-central"}
  ],
  place_entities:[
    {id:"og-rj-serra-orgaos",canonical_name:"Serra dos Órgãos, Rio de Janeiro",escala:"regiao",aliases:["Serra dos Orgãos","Serra dos Órgãos"]},
    {id:"og-rj-paquequer",canonical_name:"Rio Paquequer, Rio de Janeiro",escala:"regiao",aliases:["Paquequer"]},
    {id:"og-rj-paraiba",canonical_name:"Rio Paraíba do Sul",escala:"regiao",aliases:["Parahyba","Paraíba"]},
    {id:"og-casa-paquequer",canonical_name:"Casa de D. Antônio de Mariz no Paquequer",escala:"ponto",aliases:["casa do Paquequer","casa de D. Antônio de Mariz"],ficcional:true},
    {id:"og-rj-rio-janeiro",canonical_name:"Rio de Janeiro",escala:"cidade",aliases:["Rio de Janeiro"]},
    {id:"og-rj-sertao",canonical_name:"Sertão do Rio de Janeiro",escala:"regiao",aliases:["sertão do Rio de Janeiro"]},
    {id:"og-pouso-missionario",canonical_name:"Pouso missionário no sertão do Rio de Janeiro",escala:"ponto",aliases:["pouso"],ficcional:true},
    {id:"og-rj-convento-carmo",canonical_name:"Convento do Carmo, Rio de Janeiro",escala:"ponto",aliases:["convento do Carmo"]},
    {id:"og-campo-aimores",canonical_name:"Campo dos Aimorés",escala:"ponto",aliases:["campo dos Aimorés"],ficcional:true}
  ],
  place_mentions:[
    {id:"og-serra-orgaos-p1c1",place_id:"og-rj-serra-orgaos",nome_textual:"Serra dos Orgãos",canonical_name:"Serra dos Órgãos, Rio de Janeiro",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:1,parte:1,capitulo_parte:1,funcao:"origem hidrográfica e moldura territorial do cenário inicial",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/I/I",nota:"O capítulo de abertura começa num dos cabeços da Serra dos Órgãos."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"og-paquequer-p1c1",place_id:"og-rj-paquequer",nome_textual:"Paquequer",canonical_name:"Rio Paquequer, Rio de Janeiro",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:1,parte:1,capitulo_parte:1,funcao:"rio central que organiza a casa, os deslocamentos e o desfecho",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/I/I",nota:"O cenário inicial descreve o Paquequer desde a serra até sua confluência."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"og-paraiba-p1c1",place_id:"og-rj-paraiba",nome_textual:"Parahyba",canonical_name:"Rio Paraíba do Sul",tipo:"historico",escala:"regiao",certeza:"identificado",capitulo:1,parte:1,capitulo_parte:1,funcao:"rio maior no qual o Paquequer desemboca",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/I/I",nota:"O Paquequer é descrito desembocando no Parahyba."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"og-casa-paquequer-p1c1",place_id:"og-casa-paquequer",nome_textual:"habitação",canonical_name:"Casa de D. Antônio de Mariz no Paquequer",tipo:"ficcional",escala:"ponto",certeza:"ilustrativo",capitulo:1,parte:1,capitulo_parte:1,funcao:"núcleo doméstico e defensivo em torno do qual se concentra a maior parte da ação",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/I/I",nota:"A habitação é descrita como implantada no rochedo junto ao Paquequer; não recebe coordenada pontual por ser construção ficcional."},lat:null,lon:null,status_geografico:"LUGAR_FICCIONAL_GEOMETRIA_NAO_FIXADA"},
    {id:"og-paraiba-p1c3",place_id:"og-rj-paraiba",nome_textual:"Parahyba",canonical_name:"Rio Paraíba do Sul",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:3,parte:1,capitulo_parte:3,funcao:"margem percorrida pela bandeira de Álvaro e Loredano",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/I/III",nota:"A bandeira costeia a margem direita do Parahyba."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"og-rio-janeiro-p1c3",place_id:"og-rj-rio-janeiro",nome_textual:"Rio de Janeiro",canonical_name:"Rio de Janeiro",tipo:"narrativo",escala:"cidade",certeza:"identificado",capitulo:3,parte:1,capitulo_parte:3,funcao:"origem imediata da bandeira que regressa ao interior após vender os produtos da expedição",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/I/III",nota:"A bandeira é apresentada voltando do Rio de Janeiro."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"og-pouso-p2c1",place_id:"og-pouso-missionario",nome_textual:"pouso",canonical_name:"Pouso missionário no sertão do Rio de Janeiro",tipo:"ficcional",escala:"ponto",certeza:"ilustrativo",capitulo:16,parte:2,capitulo_parte:1,funcao:"cenário material do passado de Frei Ângelo/Loredano",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/II/I",nota:"O capítulo situa a ação num pouso à beira do caminho usado pelas expedições entre Rio de Janeiro e Espírito Santo."},lat:null,lon:null,status_geografico:"LOCAL_RELATIVO_SEM_COORDENADA_DEFENSAVEL"},
    {id:"og-sertao-rj-p2c1",place_id:"og-rj-sertao",nome_textual:"sertão do Rio de Janeiro",canonical_name:"Sertão do Rio de Janeiro",tipo:"historico",escala:"regiao",certeza:"identificado",capitulo:16,parte:2,capitulo_parte:1,funcao:"região ampla em que se localiza o episódio missionário de Frei Ângelo",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/II/I",nota:"O narrador situa explicitamente Frei Ângelo no sertão do Rio de Janeiro."},lat:null,lon:null,status_geografico:"REGIAO_HISTORICA_GEOMETRIA_PENDENTE"},
    {id:"og-convento-carmo-p2c1",place_id:"og-rj-convento-carmo",nome_textual:"convento do Carmo no Rio de Janeiro",canonical_name:"Convento do Carmo, Rio de Janeiro",tipo:"biografico",escala:"ponto",certeza:"identificado",capitulo:16,parte:2,capitulo_parte:1,funcao:"instituição à qual Frei Ângelo é destinado antes de sua atuação missionária",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/II/I",nota:"O capítulo identifica o convento do Carmo no Rio de Janeiro e seu prior."},lat:null,lon:null,status_geografico:"INSTITUICAO_HISTORICA_CONFIRMADA_GEOCODIFICACAO_PENDENTE"},
    {id:"og-paquequer-p2c2",place_id:"og-rj-paquequer",nome_textual:"margem do Paquequer",canonical_name:"Rio Paquequer, Rio de Janeiro",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:17,parte:2,capitulo_parte:2,funcao:"cenário de reunião da família de D. Antônio de Mariz",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/II/II",nota:"A família está reunida na margem do Paquequer."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"og-campo-aimores-p3c13",place_id:"og-campo-aimores",nome_textual:"campo dos Aimorés",canonical_name:"Campo dos Aimorés",tipo:"ficcional",escala:"ponto",certeza:"ilustrativo",capitulo:42,parte:3,capitulo_parte:13,funcao:"espaço de preparação e confronto decisivo dos Aimorés",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/III/XIII",nota:"O capítulo mostra os Aimorés agrupados e preparando o ataque decisivo."},lat:null,lon:null,status_geografico:"LUGAR_RELATIVO_FICCIONAL_GEOMETRIA_NAO_FIXADA"},
    {id:"og-paquequer-p4c10",place_id:"og-rj-paquequer",nome_textual:"Paquequer",canonical_name:"Rio Paquequer, Rio de Janeiro",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:53,parte:4,capitulo_parte:10,funcao:"via de fuga de Peri e Cecília após a catástrofe da casa",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/IV/X",nota:"Peri conduz a canoa pela superfície do Paquequer depois da explosão."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"og-paquequer-p4c11",place_id:"og-rj-paquequer",nome_textual:"margens do Paquequer",canonical_name:"Rio Paquequer, Rio de Janeiro",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:54,parte:4,capitulo_parte:11,funcao:"paisagem do epílogo, marcada pelas ruínas e pela transformação do cenário",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/IV/XI",nota:"O epílogo abre com as ruínas cobrindo as margens do Paquequer."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"og-casa-paquequer-p4c11",place_id:"og-casa-paquequer",nome_textual:"casa",canonical_name:"Casa de D. Antônio de Mariz no Paquequer",tipo:"ficcional",escala:"ponto",certeza:"ilustrativo",capitulo:54,parte:4,capitulo_parte:11,funcao:"núcleo destruído cuja ausência materializa a catástrofe final",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/O_Guarani/IV/XI",nota:"O epílogo registra que a eminência onde estava a casa desapareceu."},lat:null,lon:null,status_geografico:"LUGAR_FICCIONAL_DESTRUIDO_GEOMETRIA_NAO_FIXADA"}
  ],
  eventos:[
    {id:"og-ev-cenario",titulo:"Configuração do território do Paquequer",capitulo:1,place_mentions:["og-serra-orgaos-p1c1","og-paquequer-p1c1","og-paraiba-p1c1","og-casa-paquequer-p1c1"]},
    {id:"og-ev-bandeira",titulo:"Retorno da bandeira",capitulo:3,place_mentions:["og-paraiba-p1c3","og-rio-janeiro-p1c3"]},
    {id:"og-ev-passado-loredano",titulo:"Passado de Frei Ângelo/Loredano",capitulo:16,place_mentions:["og-pouso-p2c1","og-sertao-rj-p2c1","og-convento-carmo-p2c1"]},
    {id:"og-ev-margem-paquequer",titulo:"Família reunida à margem do Paquequer",capitulo:17,place_mentions:["og-paquequer-p2c2"]},
    {id:"og-ev-combate-aimores",titulo:"Preparação do ataque dos Aimorés",capitulo:42,place_mentions:["og-campo-aimores-p3c13"]},
    {id:"og-ev-catastrofe",titulo:"Catástrofe e fuga pelo Paquequer",capitulo:54,place_mentions:["og-paquequer-p4c10","og-paquequer-p4c11","og-casa-paquequer-p4c11"]}
  ],
  percursos:[],
  notas_editoriais:[
    "TL-05 fecha O Guarani diretamente em corpus canônico v1.0.",
    "A casa de D. Antônio, o pouso missionário e o campo dos Aimorés não recebem coordenadas pontuais por falta de localização histórica defensável ou por seu caráter ficcional/relativo.",
    "Destinos apenas propostos e alusões retóricas não foram transformados em pontos cartográficos.",
    "Nenhuma rota foi inferida e nenhuma coordenada nova foi inventada."
  ]
};
