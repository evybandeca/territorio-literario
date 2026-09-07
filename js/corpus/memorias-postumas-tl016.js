// TERRITÓRIO LITERÁRIO — TL-01.6 overlay
// Expansão auditada dos capítulos LXI–LXXX de Memórias Póstumas de Brás Cubas.
// Mantém a arquitetura canônica window.CORPUS_PROFUNDO e não cria rotas.
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO["memorias-postumas"];
  if(!c)return;
  const addUnique=(arr,item)=>{if(!arr.some(x=>x.id===item.id))arr.push(item)};
  c.versao="0.6.0";
  c.estrutura=c.estrutura||{};
  c.estrutura.capitulos=160;
  c.estrutura.cobertura="parcial_auditada";
  c.estrutura.capitulos_auditados=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,97,100,112,141];
  c.estrutura.nota="Os capítulos I–LXXX foram auditados de forma contínua; XCVII, C, CXII e CXLI permanecem amostras auditadas de fases anteriores. Não há alegação de exaustividade global.";
  c.place_entities=c.place_entities||[];
  c.place_mentions=c.place_mentions||[];
  addUnique(c.place_entities,{id:"pl-rj-hotel-pharoux",canonical_name:"Hotel Pharoux, Rio de Janeiro",escala:"ponto",aliases:["Hotel Pharoux","Pharoux"]});
  addUnique(c.place_entities,{id:"pl-rj-valongo",canonical_name:"Valongo, Rio de Janeiro",escala:"regiao",aliases:["Valongo"]});
  const novos=[
    {id:"mpbc-passeio-publico-ch61",place_id:"pl-rj-passeio-publico",nome_textual:"Passeio Publico",canonical_name:"Passeio Público, Rio de Janeiro",tipo:"narrativo",escala:"ponto",certeza:"identificado",capitulo:61,titulo_capitulo:"Um projecto",funcao:"retorno de Brás Cubas ao Passeio Público à procura de Quincas Borba",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/LXI",nota:"O narrador decide voltar ao Passeio Público e vai ao local procurar Quincas Borba."},lat:null,lon:null,status_geografico:"TOPONIMO_ESPECIFICO_PENDENTE_GEOCODIFICACAO_HISTORICA"},
    {id:"mpbc-hotel-pharoux-ch66",place_id:"pl-rj-hotel-pharoux",nome_textual:"hotel Pharoux",canonical_name:"Hotel Pharoux, Rio de Janeiro",tipo:"narrativo",escala:"ponto",certeza:"identificado",capitulo:66,titulo_capitulo:"As pernas",funcao:"estabelecimento diante do qual Brás Cubas chega e onde costumava jantar",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/LXVI",nota:"O capítulo menciona explicitamente a porta do Hotel Pharoux."},lat:null,lon:null,status_geografico:"ESTABELECIMENTO_HISTORICO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"mpbc-gamboa-ch67",place_id:"pl-rj-gamboa",nome_textual:"Gamboa",canonical_name:"Gamboa, Rio de Janeiro",tipo:"narrativo",escala:"bairro",certeza:"identificado",capitulo:67,titulo_capitulo:"A casinha",funcao:"localização explícita da casa usada por Brás Cubas e Virgília",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/LXVII",nota:"A casa é situada explicitamente em um recanto da Gamboa."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_COORDENADA_PENDENTE"},
    {id:"mpbc-valongo-ch68",place_id:"pl-rj-valongo",nome_textual:"Valongo",canonical_name:"Valongo, Rio de Janeiro",tipo:"narrativo",escala:"regiao",certeza:"ilustrativo",capitulo:68,titulo_capitulo:"O vergalho",funcao:"espaço urbano do encontro de Brás Cubas com Prudêncio",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/LXVIII",nota:"O narrador situa explicitamente a cena no Valongo."},lat:null,lon:null,status_geografico:"TOPONIMO_HISTORICO_CONFIRMADO_GEOMETRIA_PENDENTE"},
    {id:"mpbc-gamboa-ch69",place_id:"pl-rj-gamboa",nome_textual:"Gamboa",canonical_name:"Gamboa, Rio de Janeiro",tipo:"mencionado",escala:"bairro",certeza:"identificado",capitulo:69,titulo_capitulo:"Um grão de sandice",funcao:"retorno mencionado à casa da Gamboa",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/LXIX",nota:"O capítulo menciona explicitamente a volta à casinha da Gamboa."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_COORDENADA_PENDENTE"},
    {id:"mpbc-gamboa-ch78",place_id:"pl-rj-gamboa",nome_textual:"Gamboa",canonical_name:"Gamboa, Rio de Janeiro",tipo:"narrativo",escala:"bairro",certeza:"identificado",capitulo:78,titulo_capitulo:"A presidencia",funcao:"local explícito de encontro na casa da Gamboa",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/LXXVIII",nota:"O capítulo situa explicitamente a cena na casa da Gamboa."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_COORDENADA_PENDENTE"}
  ];
  novos.forEach(m=>addUnique(c.place_mentions,m));
  c.place_mentions.sort((a,b)=>(a.capitulo||0)-(b.capitulo||0)||a.id.localeCompare(b.id));
  c.notas_editoriais=c.notas_editoriais||[];
  const notas=[
    "TL-01.6 audita continuamente os capítulos LXI–LXXX e amplia a cobertura contínua para I–LXXX.",
    "Hotel Pharoux e Valongo entram como novas entidades canônicas; Passeio Público e Gamboa recebem novas ocorrências sem duplicar a identidade do lugar.",
    "Referências amplas, hipotéticas ou retóricas como Europa, Índias, Itália, Holanda e norte permanecem excluídas quando não exercem função espacial material na narrativa.",
    "Nenhuma rota é inferida automaticamente."
  ];
  notas.forEach(n=>{if(!c.notas_editoriais.includes(n))c.notas_editoriais.push(n)});
})();