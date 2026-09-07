// TERRITÓRIO LITERÁRIO — Dom Casmurro canonical v1.0.0
// Consolida TL-02.1, TL-02.2 e fechamento CI–CXLVIII sobre a baseline dom-casmurro.js.
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO["dom-casmurro"];
  if(!c)return;
  const addUnique=(arr,item)=>{if(!arr.some(x=>x.id===item.id))arr.push(item)};
  c.place_entities=c.place_entities||[];
  c.place_mentions=c.place_mentions||[];
  c.eventos=c.eventos||[];
  c.notas_editoriais=c.notas_editoriais||[];
  [
    {id:"dc-seminario-sao-jose-ch53",place_id:"dc-rj-seminario-sao-jose",nome_textual:"seminário",canonical_name:"Seminário de São José, Rio de Janeiro",tipo:"narrativo",escala:"ponto",certeza:"identificado",capitulo:53,titulo_capitulo:"A Caminho!",funcao:"destino efetivo de Bentinho ao deixar a casa familiar e iniciar a vida seminarista",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/LIII",nota:"Bentinho afirma que foi para o seminário, em continuidade ao ingresso no Seminário de São José estabelecido no capítulo L."},lat:null,lon:null,status_geografico:"INSTITUICAO_HISTORICA_CONFIRMADA_GEOCODIFICACAO_PENDENTE"},
    {id:"dc-engenho-novo-ch64",place_id:"dc-rj-engenho-novo",nome_textual:"Engenho Novo",canonical_name:"Engenho Novo, Rio de Janeiro",tipo:"narrativo",escala:"bairro",certeza:"identificado",capitulo:64,titulo_capitulo:"Uma idéia e um escrúpulo",funcao:"presente narrativo em que Bento compara a casa atual à residência da juventude",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/LXIV",nota:"O narrador identifica a casa do Engenho Novo como reprodução da antiga casa de Mata-cavalos."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"dc-matacavalos-ch64",place_id:"dc-rj-matacavalos",nome_textual:"Mata-cavalos",canonical_name:"Rua de Matacavalos, Rio de Janeiro",tipo:"mencionado",escala:"rota",certeza:"identificado",capitulo:64,titulo_capitulo:"Uma idéia e um escrúpulo",funcao:"casa da juventude reativada como referência espacial da memória do narrador",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/LXIV",nota:"O capítulo retoma explicitamente a relação entre a casa do Engenho Novo e Mata-cavalos."},lat:null,lon:null,status_geografico:"TOPONIMO_HISTORICO_CONFIRMADO_GEOMETRIA_PENDENTE"}
  ].forEach(m=>addUnique(c.place_mentions,m));
  addUnique(c.eventos,{id:"dc-ev-a-caminho-seminario",titulo:"Partida efetiva para o seminário",capitulo:53,place_mentions:["dc-seminario-sao-jose-ch53"]});
  addUnique(c.place_entities,{id:"dc-rj-praia-gloria",canonical_name:"Praia da Glória, Rio de Janeiro",escala:"regiao",aliases:["Praia da Glória","praia da Gloria"]});
  addUnique(c.place_entities,{id:"dc-suica",canonical_name:"Suíça",escala:"estado",aliases:["Suissa","Suíça"]});
  [
    {id:"dc-praia-gloria-ch106",place_id:"dc-rj-praia-gloria",nome_textual:"Praia da Glória",canonical_name:"Praia da Glória, Rio de Janeiro",tipo:"narrativo",escala:"regiao",certeza:"identificado",capitulo:106,titulo_capitulo:"Dez libras esterlinas",funcao:"local de uma lição de astronomia em que Bento observa Capitu voltada para o mar",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/CVI",nota:"O capítulo situa explicitamente a lição de astronomia na Praia da Glória."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_HISTORICA_PENDENTE"},
    {id:"dc-suica-ch141",place_id:"dc-suica",nome_textual:"Suissa",canonical_name:"Suíça",tipo:"narrativo",escala:"estado",certeza:"identificado",capitulo:141,titulo_capitulo:"A solução",funcao:"destino efetivo da separação de Bento, Capitu e Ezequiel; Capitu permanece no país com o filho",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/CXLI",nota:"O narrador afirma que foram para a Europa e pararam na Suíça; Capitu e Ezequiel ficam ali enquanto Bento retorna ao Brasil."},lat:null,lon:null,status_geografico:"PAIS_CONFIRMADO_SEM_GEOCODIFICACAO_PONTUAL"},
    {id:"dc-engenho-novo-ch144",place_id:"dc-rj-engenho-novo",nome_textual:"Engenho Novo",canonical_name:"Engenho Novo, Rio de Janeiro",tipo:"narrativo",escala:"bairro",certeza:"identificado",capitulo:144,titulo_capitulo:"Uma pergunta tardia",funcao:"local da casa do narrador no presente, construída como reprodução da residência da juventude",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/CXLIV",nota:"Bento explicita que mora na casa do Engenho Novo e a compara à antiga casa de Mata-cavalos."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"dc-matacavalos-ch144",place_id:"dc-rj-matacavalos",nome_textual:"Mata-cavalos",canonical_name:"Rua de Matacavalos, Rio de Janeiro",tipo:"mencionado",escala:"rota",certeza:"identificado",capitulo:144,titulo_capitulo:"Uma pergunta tardia",funcao:"local da casa antiga cuja demolição e memória explicam a reprodução construída no Engenho Novo",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/CXLIV",nota:"O capítulo retoma explicitamente a antiga casa de Mata-cavalos e sua demolição."},lat:null,lon:null,status_geografico:"TOPONIMO_HISTORICO_CONFIRMADO_GEOMETRIA_PENDENTE"},
    {id:"dc-praia-gloria-ch148",place_id:"dc-rj-praia-gloria",nome_textual:"Praia da Glória",canonical_name:"Praia da Glória, Rio de Janeiro",tipo:"mencionado",escala:"regiao",certeza:"identificado",capitulo:148,titulo_capitulo:"E bem, e o resto?",funcao:"referência final à fase adulta de Capitu, contraposta à Capitu de Mata-cavalos",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/CXLVIII",nota:"O capítulo contrapõe explicitamente a Capitu da Praia da Glória à de Mata-cavalos."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_GEOCODIFICACAO_HISTORICA_PENDENTE"},
    {id:"dc-matacavalos-ch148",place_id:"dc-rj-matacavalos",nome_textual:"Mata-cavalos",canonical_name:"Rua de Matacavalos, Rio de Janeiro",tipo:"mencionado",escala:"rota",certeza:"identificado",capitulo:148,titulo_capitulo:"E bem, e o resto?",funcao:"referência final à Capitu jovem, contraposta à Capitu da Praia da Glória",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Dom_Casmurro/CXLVIII",nota:"O fecho do romance contrapõe explicitamente a Capitu da Praia da Glória à de Mata-cavalos."},lat:null,lon:null,status_geografico:"TOPONIMO_HISTORICO_CONFIRMADO_GEOMETRIA_PENDENTE"}
  ].forEach(m=>addUnique(c.place_mentions,m));
  c.place_mentions.sort((a,b)=>(a.capitulo||0)-(b.capitulo||0)||a.id.localeCompare(b.id));
  c.versao="1.0.0";
  c.status="COBERTURA_CONTINUA_AUDITADA";
  c.estrutura=c.estrutura||{};
  c.estrutura.capitulos=148;
  c.estrutura.cobertura="continua_auditada";
  c.estrutura.capitulos_auditados=[...Array(148)].map((_,i)=>i+1);
  c.estrutura.nota="Os capítulos I–CXLVIII foram auditados de forma contínua para ocorrências geográficas materialmente relevantes. Isso não constitui alegação de exaustividade interpretativa absoluta.";
  [
    "TL-02.3 fecha a auditoria contínua de Dom Casmurro nos 148 capítulos.",
    "Praia da Glória e Suíça entram como novas entidades canônicas por ação ou localização explicitamente realizada no texto.",
    "Europa, Minas, Petrópolis e Mata-cavalos no capítulo CXXX permanecem fora quando aparecem apenas como propostas recusadas ou alternativas não realizadas.",
    "A igreja dos capítulos finais permanece sem entidade própria quando o texto não fornece identificação nominal defensável.",
    "Nenhuma rota foi inferida e nenhuma coordenada nova foi criada."
  ].forEach(n=>{if(!c.notas_editoriais.includes(n))c.notas_editoriais.push(n)});
})();
