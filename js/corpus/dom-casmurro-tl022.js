// TERRITÓRIO LITERÁRIO — TL-02.2 overlay
// Expansão auditada dos capítulos LI–C de Dom Casmurro.
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO["dom-casmurro"];
  if(!c)return;
  const addUnique=(arr,item)=>{if(!arr.some(x=>x.id===item.id))arr.push(item)};
  c.versao="0.3.0";
  c.status="PARCIAL_AUDITAVEL";
  c.estrutura=c.estrutura||{};
  c.estrutura.capitulos=148;
  c.estrutura.cobertura="parcial_auditada";
  c.estrutura.capitulos_auditados=[...Array(100)].map((_,i)=>i+1);
  c.estrutura.nota="Os capítulos I–C foram auditados de forma contínua. A cobertura registra ocorrências geográficas materialmente relevantes e não afirma exaustividade interpretativa global.";
  c.place_mentions=c.place_mentions||[];
  const novos=[
    {id:"dc-seminario-sao-jose-ch53",place_id:"dc-rj-seminario-sao-jose",nome_textual:"seminário",canonical_name:"Seminário de São José, Rio de Janeiro",tipo:"narrativo",escala:"ponto",certeza:"identificado",capitulo:53,titulo_capitulo:"A Caminho!",funcao:"destino efetivo de Bentinho ao deixar a casa familiar e iniciar a vida seminarista",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/LIII",nota:"O capítulo abre com Bentinho afirmando que foi para o seminário, em continuidade direta ao ingresso no Seminário de São José estabelecido no capítulo L."},lat:null,lon:null,status_geografico:"INSTITUICAO_HISTORICA_CONFIRMADA_GEOCODIFICACAO_PENDENTE"},
    {id:"dc-engenho-novo-ch64",place_id:"dc-rj-engenho-novo",nome_textual:"Engenho Novo",canonical_name:"Engenho Novo, Rio de Janeiro",tipo:"narrativo",escala:"bairro",certeza:"identificado",capitulo:64,titulo_capitulo:"Uma idéia e um escrúpulo",funcao:"presente narrativo em que Bento olha a casa atual e a compara à casa da juventude",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/LXIV",nota:"O narrador identifica explicitamente a casa do Engenho Novo como reprodução da antiga casa de Mata-cavalos."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"dc-matacavalos-ch64",place_id:"dc-rj-matacavalos",nome_textual:"Mata-cavalos",canonical_name:"Rua de Matacavalos, Rio de Janeiro",tipo:"mencionado",escala:"rota",certeza:"identificado",capitulo:64,titulo_capitulo:"Uma idéia e um escrúpulo",funcao:"casa da juventude reativada como referência espacial da memória do narrador",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/LXIV",nota:"O capítulo retoma explicitamente a relação entre a casa do Engenho Novo e a antiga casa de Mata-cavalos."},lat:null,lon:null,status_geografico:"TOPONIMO_HISTORICO_CONFIRMADO_GEOMETRIA_PENDENTE"}
  ];
  novos.forEach(m=>addUnique(c.place_mentions,m));
  c.place_mentions.sort((a,b)=>(a.capitulo||0)-(b.capitulo||0)||a.id.localeCompare(b.id));
  c.eventos=c.eventos||[];
  addUnique(c.eventos,{id:"dc-ev-a-caminho-seminario",titulo:"Partida efetiva para o seminário",capitulo:53,place_mentions:["dc-seminario-sao-jose-ch53"]});
  c.notas_editoriais=c.notas_editoriais||[];
  [
    "TL-02.2 amplia a auditoria contínua para os capítulos I–C.",
    "A igreja do capítulo LXX permanece sem entidade própria porque o capítulo não fornece identificação nominal defensável.",
    "O Corcovado citado em sonho permanece excluído pelo gate de realidade narrativa.",
    "Não foram inferidas rotas nem criadas novas coordenadas."
  ].forEach(n=>{if(!c.notas_editoriais.includes(n))c.notas_editoriais.push(n)});
})();
