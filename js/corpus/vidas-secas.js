// TERRITÓRIO LITERÁRIO — TL-12 Vidas Secas v0.1
window.CORPUS_PROFUNDO = window.CORPUS_PROFUNDO || {};
window.CORPUS_PROFUNDO["vidas-secas"] = {
  status:"COBERTURA_ESTRUTURAL_CONTINUA_AUDITADA",
  versao:"0.1.0",
  metodologia:"TL-12",
  edicao:{titulo:"Vidas seccas: romance",autor:"Graciliano Ramos",cidade:"Rio de Janeiro",editora:"Livraria José Olympio Editora",ano:1938,fonte:"Wikisource — transcrição da 1ª edição; Brasiliana USP — exemplar digitalizado",url:"https://pt.wikisource.org/wiki/Vidas_seccas",nota:"Fonte congelada: primeira edição, Rio de Janeiro, Livraria José Olympio Editora, 1938. Exemplar digitalizado preservado pela Brasiliana USP (BBM 8399)."},
  estrutura:{unidades:13,unidade_tipo:"13_capitulos_da_transcricao_da_primeira_edicao_sem_indice_impresso_original",unidades_auditadas:Array.from({length:13},(_,i)=>i+1),blocos:[{titulo:"Capítulos 1–13",inicio:1,fim:13}],nota:"A transcrição organiza a obra em 13 capítulos; a própria fonte observa que a lista de capítulos não aparece como índice no original. A v0.1 congela a estrutura e registra apenas espacialidade explicitamente sustentada, sem tentar identificar topônimos que o romance mantém anônimos."},
  politica_inclusao_geografica:{incluir:["espaços não nomeados quando exercem função narrativa material e recorrente","acidentes naturais explicitamente descritos","cidade, fazenda e instituições espacialmente necessárias à ação, mesmo sem nome próprio"],excluir_por_padrao:["inferência de município, estado ou fazenda real a partir de biografia ou crítica literária","geocodificação de espaços deliberadamente anônimos","rotas reconstruídas a partir de direção geral","equivalência automática entre caatinga ficcionalizada e ponto cartográfico"]},
  personagens:[
    {id:"fabiano",nome:"Fabiano",papel:"protagonista"},
    {id:"sinha-vitoria",nome:"Sinha Vitória",papel:"personagem-central"},
    {id:"menino-mais-velho",nome:"Menino mais velho",papel:"personagem-central"},
    {id:"menino-mais-novo",nome:"Menino mais novo",papel:"personagem-central"},
    {id:"baleia",nome:"Baleia",papel:"personagem-central"},
    {id:"soldado-amarelo",nome:"Soldado amarelo",papel:"personagem-central"}
  ],
  eventos:[],
  place_entities:[
    {id:"vs-sertao-caatinga",canonical_name:"Sertão / caatinga não nomeados",escala:"regiao",aliases:["sertão","catinga","caatinga"]},
    {id:"vs-rio-seco",canonical_name:"Rio seco não nomeado",escala:"regiao",aliases:["rio secco","rio seco"]},
    {id:"vs-fazenda",canonical_name:"Fazenda não nomeada",escala:"ponto",aliases:["fazenda","fazenda abandonada"]},
    {id:"vs-cidade",canonical_name:"Cidade não nomeada",escala:"cidade",aliases:["cidade"]},
    {id:"vs-cadeia",canonical_name:"Cadeia da cidade não nomeada",escala:"ponto",aliases:["cadeia"]}
  ],
  place_mentions:[
    {id:"vs-caatinga-u1",place_id:"vs-sertao-caatinga",canonical_name:"Sertão / caatinga não nomeados",unidade:1,unidade_label:"Cap. 1 — Mudança",tipo:"narrativo",escala:"regiao",certeza:"ilustrativo",funcao:"Paisagem árida que estrutura a abertura e o deslocamento da família, deliberadamente sem topônimo específico.",evidencia:{url:"https://pt.wikisource.org/wiki/Vidas_seccas/Mudan%C3%A7a",nota:"O capítulo descreve a planície avermelhada e a catinga sem nomear município ou estado."}},
    {id:"vs-rio-seco-u1",place_id:"vs-rio-seco",canonical_name:"Rio seco não nomeado",unidade:1,unidade_label:"Cap. 1 — Mudança",tipo:"narrativo",escala:"regiao",certeza:"ilustrativo",funcao:"Leito seco usado como espaço de repouso durante a caminhada inicial.",evidencia:{url:"https://pt.wikisource.org/wiki/Vidas_seccas/Mudan%C3%A7a",nota:"A família repousa na areia do rio seco, que não recebe nome próprio."}},
    {id:"vs-cidade-u3",place_id:"vs-cidade",canonical_name:"Cidade não nomeada",unidade:3,unidade_label:"Cap. 3 — Cadeia",tipo:"narrativo",escala:"cidade",certeza:"ilustrativo",funcao:"Centro urbano ao qual Fabiano vai para a feira e onde ocorre sua prisão, sem identificação nominal.",evidencia:{url:"https://pt.wikisource.org/wiki/Vidas_seccas/Cadeia",nota:"Fabiano vai à feira da cidade; o texto não fornece nome da localidade."}},
    {id:"vs-cadeia-u3",place_id:"vs-cadeia",canonical_name:"Cadeia da cidade não nomeada",unidade:3,unidade_label:"Cap. 3 — Cadeia",tipo:"narrativo",escala:"ponto",certeza:"ilustrativo",funcao:"Instituição onde Fabiano é preso após o conflito urbano.",evidencia:{url:"https://pt.wikisource.org/wiki/Vidas_seccas/Cadeia",nota:"A cadeia é o espaço central do episódio, mas permanece vinculada a uma cidade não nomeada."}},
    {id:"vs-cidade-u8",place_id:"vs-cidade",canonical_name:"Cidade não nomeada",unidade:8,unidade_label:"Cap. 8 — Festa",tipo:"narrativo",escala:"cidade",certeza:"ilustrativo",funcao:"Cidade para onde a família se desloca para a festa de Natal, novamente sem nome próprio.",evidencia:{url:"https://pt.wikisource.org/wiki/Vidas_seccas/Festa",nota:"A família vai à cidade para a festa; a localidade não é nomeada."}},
    {id:"vs-fazenda-u13",place_id:"vs-fazenda",canonical_name:"Fazenda não nomeada",unidade:13,unidade_label:"Cap. 13 — Fuga",tipo:"narrativo",escala:"ponto",certeza:"ilustrativo",funcao:"Fazenda abandonada que a família deixa quando a seca torna impossível a permanência.",evidencia:{url:"https://pt.wikisource.org/wiki/Vidas_seccas/Fuga",nota:"O capítulo final descreve a saída da fazenda sem identificá-la nominalmente."}},
    {id:"vs-rio-seco-u13",place_id:"vs-rio-seco",canonical_name:"Rio seco não nomeado",unidade:13,unidade_label:"Cap. 13 — Fuga",tipo:"narrativo",escala:"regiao",certeza:"ilustrativo",funcao:"Acidente espacial novamente atravessado durante a fuga final.",evidencia:{url:"https://pt.wikisource.org/wiki/Vidas_seccas/Fuga",nota:"Na fuga, a família desce e atravessa o rio seco; nenhum nome é fornecido."}},
    {id:"vs-sertao-u13",place_id:"vs-sertao-caatinga",canonical_name:"Sertão / caatinga não nomeados",unidade:13,unidade_label:"Cap. 13 — Fuga",tipo:"narrativo",escala:"regiao",certeza:"ilustrativo",funcao:"Região de origem da migração que o desfecho contrapõe ao sonho de uma cidade grande.",evidencia:{url:"https://pt.wikisource.org/wiki/Vidas_seccas/Fuga",nota:"O capítulo finaliza com o sertão expulsando pessoas em direção à cidade, sem topônimo específico."}}
  ],
  percursos:[],
  notas:["A ausência de topônimos específicos é tratada como dado literário, não como lacuna a ser preenchida por inferência externa.","A direção geral para o sul no capítulo final não é convertida em rota ou entidade geográfica autônoma.","Nenhuma coordenada nova é introduzida nesta fase.","A v0.1 é estrutural; o aprofundamento espacial futuro deve preservar a indeterminação intencional do romance."]
};
