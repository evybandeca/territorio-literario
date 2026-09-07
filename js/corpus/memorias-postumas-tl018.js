// TERRITÓRIO LITERÁRIO — TL-01.8 overlay
// Expansão auditada dos capítulos CI–CXX de Memórias Póstumas de Brás Cubas.
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO["memorias-postumas"];
  if(!c)return;
  const addUnique=(arr,item)=>{if(!arr.some(x=>x.id===item.id))arr.push(item)};
  c.versao="0.8.0";
  c.estrutura=c.estrutura||{};
  c.estrutura.capitulos=160;
  c.estrutura.cobertura="parcial_auditada";
  c.estrutura.capitulos_auditados=[...Array(120)].map((_,i)=>i+1).concat([141]);
  c.estrutura.nota="Os capítulos I–CXX foram auditados de forma contínua; CXLI permanece como amostra auditada de fase anterior. Não há alegação de exaustividade global.";
  c.place_entities=c.place_entities||[];
  c.place_mentions=c.place_mentions||[];
  const novos=[
    {id:"mpbc-hotel-pharoux-ch115",place_id:"pl-rj-hotel-pharoux",nome_textual:"hotel Pharoux",canonical_name:"Hotel Pharoux, Rio de Janeiro",tipo:"narrativo",escala:"ponto",certeza:"identificado",capitulo:115,titulo_capitulo:"O almoço",funcao:"local do almoço de Brás Cubas no momento em que recorda a partida de Virgília",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/CXV",nota:"O capítulo situa explicitamente o almoço no Hotel Pharoux e recorda o cozinheiro do estabelecimento."},lat:null,lon:null,status_geografico:"ESTABELECIMENTO_HISTORICO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"mpbc-rio-ch115",place_id:"pl-rj-rio",nome_textual:"Rio de Janeiro",canonical_name:"Rio de Janeiro, RJ",tipo:"historico",escala:"cidade",certeza:"ilustrativo",capitulo:115,titulo_capitulo:"O almoço",funcao:"cidade associada à chegada de Mr. Pruddon e ao ambiente social rememorado pelo narrador",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/CXV",nota:"O texto afirma explicitamente que Mr. Pruddon entrou no Rio de Janeiro com a polca."},lat:null,lon:null,status_geografico:"TOPONIMO_CONFIRMADO_COORDENADA_NAO_ESPECIFICA"}
  ];
  novos.forEach(m=>addUnique(c.place_mentions,m));
  c.place_mentions.sort((a,b)=>(a.capitulo||0)-(b.capitulo||0)||a.id.localeCompare(b.id));
  c.notas_editoriais=c.notas_editoriais||[];
  ["TL-01.8 amplia a cobertura contínua para os capítulos I–CXX.","A Dalmácia do capítulo CI permanece excluída como construção hipotética explícita do narrador; referências amplas como Europa e Paris não viram automaticamente pontos narrativos.","O capítulo CXII já possuía ocorrência auditada da Rua do Ouvidor em fase anterior e não foi duplicado.","Nenhuma rota é inferida automaticamente."].forEach(n=>{if(!c.notas_editoriais.includes(n))c.notas_editoriais.push(n)});
})();