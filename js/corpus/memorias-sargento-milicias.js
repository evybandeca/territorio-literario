// TERRITÓRIO LITERÁRIO — TL-09 Memórias de um Sargento de Milícias v0.1
window.CORPUS_PROFUNDO = window.CORPUS_PROFUNDO || {};
window.CORPUS_PROFUNDO["memorias-sargento-milicias"] = {
  status:"COBERTURA_ESTRUTURAL_CONTINUA_AUDITADA",
  versao:"0.1.0",
  metodologia:"TL-09",
  edicao:{titulo:"Memórias de um Sargento de Milícias",autor:"Manuel Antônio de Almeida",cidade:"Rio de Janeiro",editora:"Tipografia Brasiliense",ano:1854,fonte:"Wikisource — edição de referência confirmada pela Literatura Digital/UFSC",url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_sargento_de_mil%C3%ADcias",nota:"Fonte congelada: Rio de Janeiro, Tipografia Brasiliense, 1854. A categoria da obra no Wikisource contém 48 capítulos numerados."},
  estrutura:{
    unidades:48,
    unidade_tipo:"capitulos_da_edicao_de_referencia",
    unidades_auditadas:Array.from({length:48},(_,i)=>i+1),
    blocos:[{titulo:"Capítulos I–XLVIII",inicio:1,fim:48}],
    nota:"A v0.1 congela a estrutura integral de 48 capítulos e registra ocorrências geográficas explicitamente confirmadas na primeira triagem. A auditoria toponímica interna exaustiva continua nas versões seguintes."
  },
  politica_inclusao_geografica:{incluir:["ruas, instituições, cidades e deslocamentos explicitamente nomeados","topônimos historicamente reconhecíveis ainda que a geocodificação permaneça pendente"],excluir_por_padrao:["cidade inferida apenas por contexto quando o capítulo não a nomeia","trajetos reconstruídos automaticamente","referências genéricas sem identidade espacial"]},
  personagens:[
    {id:"leonardo-filho",nome:"Leonardo",papel:"protagonista"},
    {id:"leonardo-pataca",nome:"Leonardo Pataca",papel:"personagem-central"},
    {id:"major-vidigal",nome:"Major Vidigal",papel:"personagem-central"},
    {id:"compadre",nome:"Compadre",papel:"personagem-central"},
    {id:"dona-maria",nome:"D. Maria",papel:"personagem-central"},
    {id:"luisinha",nome:"Luisinha",papel:"personagem-central"}
  ],
  eventos:[],
  place_entities:[
    {id:"msm-rj-rua-ouvidor",canonical_name:"Rua do Ouvidor, Rio de Janeiro",escala:"rota",aliases:["rua do Ouvidor","Rua do Ouvidor"]},
    {id:"msm-rj-rua-quitanda",canonical_name:"Rua da Quitanda, Rio de Janeiro",escala:"rota",aliases:["rua da Quitanda","Rua da Quitanda"]},
    {id:"msm-pt-lisboa",canonical_name:"Lisboa, Portugal",escala:"cidade",aliases:["Lisboa"]},
    {id:"msm-rj-se",canonical_name:"Sé, Rio de Janeiro",escala:"ponto",aliases:["Sé","mestre-de-cerimônias da Sé"]}
  ],
  place_mentions:[
    {id:"msm-ouvidor-u1",place_id:"msm-rj-rua-ouvidor",canonical_name:"Rua do Ouvidor, Rio de Janeiro",unidade:1,unidade_label:"Cap. I — Origem, nascimento e batismo",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Uma das duas ruas cuja esquina forma o Canto dos Meirinhos, ponto inicial da descrição urbana do romance.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/I",nota:"O capítulo abre na esquina formada pelas ruas do Ouvidor e da Quitanda."}},
    {id:"msm-quitanda-u1",place_id:"msm-rj-rua-quitanda",canonical_name:"Rua da Quitanda, Rio de Janeiro",unidade:1,unidade_label:"Cap. I — Origem, nascimento e batismo",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Segunda via que forma o Canto dos Meirinhos e ancora o início da narrativa no Rio joanino.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/I",nota:"O capítulo abre na esquina formada pelas ruas do Ouvidor e da Quitanda."}},
    {id:"msm-lisboa-u10",place_id:"msm-pt-lisboa",canonical_name:"Lisboa, Portugal",unidade:10,unidade_label:"Cap. X — Explicações",tipo:"biografico",escala:"cidade",certeza:"identificado",funcao:"Cidade em que o tenente-coronel deixara um filho e de onde se preparava para embarcar para o Brasil com a corte.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/X",nota:"O capítulo menciona explicitamente o filho deixado em Lisboa antes da partida para o Brasil."}},
    {id:"msm-se-u15",place_id:"msm-rj-se",canonical_name:"Sé, Rio de Janeiro",unidade:15,unidade_label:"Cap. XV — Estralada",tipo:"narrativo",escala:"ponto",certeza:"ilustrativo",funcao:"Instituição associada ao mestre-de-cerimônias que se torna rival amoroso de Leonardo Pataca; identidade histórica precisa permanece sem marcador.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/XV",nota:"O texto identifica o rival como reverendo mestre-de-cerimônias da Sé."}}
  ],
  percursos:[],
  notas:["A v0.1 é estrutural e não equivale a uma auditoria toponímica exaustiva dos 48 capítulos.","Nenhuma rota de personagens é inferida da sequência dos capítulos.","A Sé permanece sem geocodificação até desambiguação histórico-institucional da sede episcopal correspondente ao período narrado."]
};
