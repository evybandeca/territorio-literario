// TERRITÓRIO LITERÁRIO — TL-10 O Ateneu v0.1
window.CORPUS_PROFUNDO = window.CORPUS_PROFUNDO || {};
window.CORPUS_PROFUNDO["o-ateneu"] = {
  status:"COBERTURA_ESTRUTURAL_CONTINUA_AUDITADA",
  versao:"0.1.0",
  metodologia:"TL-10",
  edicao:{titulo:"O Atheneu: Chronica de saudades",autor:"Raul Pompeia",cidade:"Rio de Janeiro",editora:"Typ. da Gazeta de Noticias",ano:1888,fonte:"Wikisource — transcrição da edição de 1888",url:"https://pt.wikisource.org/wiki/O_Ateneu",nota:"Fonte congelada: Rio de Janeiro, Typ. da «Gazeta de Noticias», Rua Sete de Setembro 72, 1888. Índice original com doze capítulos."},
  estrutura:{unidades:12,unidade_tipo:"capitulos_da_edicao_original",unidades_auditadas:Array.from({length:12},(_,i)=>i+1),blocos:[{titulo:"Capítulos I–XII",inicio:1,fim:12}],nota:"A v0.1 congela os doze capítulos da edição original e inicia a camada geográfica explícita; a auditoria toponímica integral do corpo segue em versões posteriores."},
  politica_inclusao_geografica:{incluir:["lugares explicitamente nomeados no corpo da obra","instituições ficcionais com função espacial central","ruas e acidentes geográficos materialmente ligados às cenas"],excluir_por_padrao:["lugares de analogias eruditas","topônimos apenas metafóricos","identificação real do colégio por equivalência biográfica sem prova textual"]},
  personagens:[
    {id:"sergio",nome:"Sérgio",papel:"protagonista"},
    {id:"aristarco",nome:"Aristarco",papel:"personagem-central"},
    {id:"egbert",nome:"Egbert",papel:"personagem-central"},
    {id:"bento-alves",nome:"Bento Alves",papel:"personagem-central"},
    {id:"sanches",nome:"Sanches",papel:"personagem-central"},
    {id:"ema",nome:"Ema",papel:"personagem-central"}
  ],
  eventos:[],
  place_entities:[
    {id:"oa-ateneu",canonical_name:"Ateneu — internato ficcional",escala:"ponto",aliases:["Ateneu","Atheneu"],ficcional:true},
    {id:"oa-rj-tijuca",canonical_name:"Tijuca, Rio de Janeiro",escala:"regiao",aliases:["montanhas da Tijuca","Tijuca"]},
    {id:"oa-rj-rua-ourives",canonical_name:"Rua dos Ourives, Rio de Janeiro",escala:"rota",aliases:["Rua dos Ourives"]},
    {id:"oa-rj-rua-assembleia",canonical_name:"Rua da Assembleia, Rio de Janeiro",escala:"rota",aliases:["Rua da Assembléia","Rua da Assembleia"]}
  ],
  place_mentions:[
    {id:"oa-ateneu-u1",place_id:"oa-ateneu",canonical_name:"Ateneu — internato ficcional",unidade:1,unidade_label:"Cap. I — Impressão",tipo:"ficcional",escala:"ponto",certeza:"ilustrativo",funcao:"Instituição central à qual Sérgio chega no início da narrativa e que organiza espacialmente o romance.",evidencia:{url:"https://pt.wikisource.org/wiki/O_Ateneu/I",nota:"O capítulo inicial começa com Sérgio à porta do Ateneu."}},
    {id:"oa-tijuca-u7",place_id:"oa-rj-tijuca",canonical_name:"Tijuca, Rio de Janeiro",unidade:7,unidade_label:"Cap. VII — Tédio",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Paisagem montanhosa explicitamente visível em torno do internato.",evidencia:{url:"https://pt.wikisource.org/wiki/O_Ateneu/VII",nota:"O narrador descreve as montanhas da Tijuca compondo o entorno visual do colégio."}},
    {id:"oa-ourives-u10",place_id:"oa-rj-rua-ourives",canonical_name:"Rua dos Ourives, Rio de Janeiro",unidade:10,unidade_label:"Cap. X — Impaciência",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Rua associada ao edifício onde Sérgio realiza exames públicos.",evidencia:{url:"https://pt.wikisource.org/wiki/O_Ateneu/X",nota:"O narrador menciona a 'bastilha da Rua dos Ourives' durante a memória dos exames."}},
    {id:"oa-assembleia-u10",place_id:"oa-rj-rua-assembleia",canonical_name:"Rua da Assembleia, Rio de Janeiro",unidade:10,unidade_label:"Cap. X — Impaciência",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Acesso explicitamente indicado ao local dos exames de Sérgio.",evidencia:{url:"https://pt.wikisource.org/wiki/O_Ateneu/X",nota:"O capítulo afirma que se entrava pela Rua da Assembléia para o saguão."}}
  ],
  percursos:[],
  notas:["O Ateneu é mantido como instituição ficcional sem coordenada real, ainda que a obra tenha antecedentes biográficos conhecidos.","Nenhuma rota é inferida entre o internato e as ruas citadas.","A v0.1 é estrutural, não exaustiva em toponímia."]
};
