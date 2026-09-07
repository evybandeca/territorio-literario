// TERRITÓRIO LITERÁRIO — TL-01.9 overlay
// Expansão auditada dos capítulos CXXI–CXL de Memórias Póstumas de Brás Cubas.
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO["memorias-postumas"];
  if(!c)return;
  const addUnique=(arr,item)=>{if(!arr.some(x=>x.id===item.id))arr.push(item)};
  c.versao="0.9.0";
  c.estrutura=c.estrutura||{};
  c.estrutura.capitulos=160;
  c.estrutura.cobertura="parcial_auditada";
  c.estrutura.capitulos_auditados=[...Array(141)].map((_,i)=>i+1);
  c.estrutura.nota="Os capítulos I–CXLI foram auditados de forma contínua. Não há alegação de exaustividade para os capítulos CXLII–CLX.";
  c.place_entities=c.place_entities||[];
  c.place_mentions=c.place_mentions||[];
  addUnique(c.place_entities,{id:"pl-rj-capela-livramento",canonical_name:"Capela do Livramento, Rio de Janeiro",escala:"ponto",aliases:["capella do Livramento","Capela do Livramento"]});
  addUnique(c.place_entities,{id:"pl-rj-cajueiros",canonical_name:"Cajueiros, Rio de Janeiro",escala:"regiao",aliases:["Cajueiros"]});
  const novos=[
    {id:"mpbc-capela-livramento-ch121",place_id:"pl-rj-capela-livramento",nome_textual:"capella do Livramento",canonical_name:"Capela do Livramento, Rio de Janeiro",tipo:"narrativo",escala:"ponto",certeza:"identificado",capitulo:121,titulo_capitulo:"Morro abaixo",funcao:"local da missa frequentada por Brás Cubas, Nhã-loló e Damasceno",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/CXXI",nota:"O narrador afirma explicitamente que foi à missa na capela do Livramento."},lat:null,lon:null,status_geografico:"ESTABELECIMENTO_HISTORICO_CONFIRMADO_GEOCODIFICACAO_PENDENTE"},
    {id:"mpbc-cajueiros-ch121",place_id:"pl-rj-cajueiros",nome_textual:"Cajueiros",canonical_name:"Cajueiros, Rio de Janeiro",tipo:"biografico",escala:"regiao",certeza:"ilustrativo",capitulo:121,titulo_capitulo:"Morro abaixo",funcao:"local de moradia de Damasceno que contextualiza o deslocamento à missa",evidencia:{fonte:"Wikisource",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas/CXXI",nota:"O capítulo informa explicitamente que Damasceno morava nos Cajueiros."},lat:null,lon:null,status_geografico:"TOPONIMO_HISTORICO_CONFIRMADO_IDENTIDADE_ESPACIAL_PENDENTE"}
  ];
  novos.forEach(m=>addUnique(c.place_mentions,m));
  c.place_mentions.sort((a,b)=>(a.capitulo||0)-(b.capitulo||0)||a.id.localeCompare(b.id));
  c.notas_editoriais=c.notas_editoriais||[];
  ["TL-01.9 amplia a cobertura contínua para os capítulos I–CXLI.","Rio da Prata, Constantinopla, Troia e outras referências contextuais ou alusivas do intervalo CXXI–CXL não geram entidades cartográficas.","Nenhuma rota é inferida automaticamente."].forEach(n=>{if(!c.notas_editoriais.includes(n))c.notas_editoriais.push(n)});
})();
