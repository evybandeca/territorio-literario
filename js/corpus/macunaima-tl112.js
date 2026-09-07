// TERRITÓRIO LITERÁRIO — TL-11.2 Macunaíma: aprofundamento urbano sem inflar enumerações
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO["macunaima"];
  if(!c) throw new Error('TL-11.2 requer corpus aprofundado de Macunaíma');
  c.versao="0.3.0";
  c.metodologia="TL-11.2";
  c.estrutura.nota="A v0.3 aprofunda os capítulos VIII, X, XI, XII e XIII, priorizando cenas urbanas e lugares efetivamente usados. A Carta pras Icamiabas e sequências aéreas enumerativas permanecem fora do atlas por padrão.";
  const entities=[
    {id:"mac-rj-avenida-rio-branco",canonical_name:"Avenida Rio Branco, Rio de Janeiro",escala:"rota",aliases:["avenida Rio Branco"]},
    {id:"mac-rj-flamengo",canonical_name:"Flamengo, Rio de Janeiro",escala:"bairro",aliases:["Flamengo"]},
    {id:"mac-sp-rio-tiete",canonical_name:"Rio Tietê, São Paulo",escala:"regiao",aliases:["igarapé Tietê","Tietê"]},
    {id:"mac-sp-rua-direita",canonical_name:"Rua Direita, São Paulo",escala:"rota",aliases:["rua Direita"]},
    {id:"mac-sp-sao-bernardo",canonical_name:"São Bernardo, São Paulo",escala:"cidade",aliases:["São Bernardo"]},
    {id:"mac-sp-rua-libero-textual",canonical_name:"Rua Líbero — topônimo textual, São Paulo",escala:"rota",aliases:["rua Líbero"]},
    {id:"mac-sp-leprosario-guapira",canonical_name:"Leprosário de Guapira, São Paulo",escala:"ponto",aliases:["Leprosario de Guapira","Leprosário de Guapira"]},
    {id:"mac-beberibe-textual",canonical_name:"Beberibe — topônimo textual",escala:"regiao",aliases:["Beberibe"]}
  ];
  for(const e of entities) if(!c.place_entities.some(x=>x.id===e.id)) c.place_entities.push(e);
  const mentions=[
    {id:"mac-rio-janeiro-u8",place_id:"mac-rj-rio-de-janeiro",canonical_name:"Rio de Janeiro",unidade:8,unidade_label:"Cap. VIII — Vei, a Sol",tipo:"narrativo",escala:"cidade",certeza:"identificado",funcao:"Capital onde a jangada de Vei aporta e onde se desenvolve a permanência do herói neste capítulo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VIII",nota:"A jangada chega à maloca sublime do Rio de Janeiro e a ação prossegue na capital."}},
    {id:"mac-rio-branco-u8",place_id:"mac-rj-avenida-rio-branco",canonical_name:"Avenida Rio Branco, Rio de Janeiro",unidade:8,unidade_label:"Cap. VIII — Vei, a Sol",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Eixo urbano explicitamente identificado como o cerradão onde mora Vei e por onde passam os personagens.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VIII",nota:"O texto identifica o cerradão da beira d'água como avenida Rio Branco."}},
    {id:"mac-flamengo-u8",place_id:"mac-rj-flamengo",canonical_name:"Flamengo, Rio de Janeiro",unidade:8,unidade_label:"Cap. VIII — Vei, a Sol",tipo:"narrativo",escala:"bairro",certeza:"identificado",funcao:"Lugar onde Macunaíma passa a noite com a varina antes de regressar a São Paulo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VIII",nota:"O capítulo situa os dois dormindo num banco do Flamengo."}},
    {id:"mac-tiete-u8",place_id:"mac-sp-rio-tiete",canonical_name:"Rio Tietê, São Paulo",unidade:8,unidade_label:"Cap. VIII — Vei, a Sol",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Referência da taba paulistana para a qual o herói retorna após a passagem pelo Rio de Janeiro.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VIII",nota:"Macunaíma volta para a taba do igarapé Tietê."}},

    {id:"mac-rua-direita-u10",place_id:"mac-sp-rua-direita",canonical_name:"Rua Direita, São Paulo",unidade:10,unidade_label:"Cap. X — Pauí-Pódole",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Rua onde Macunaíma encontra a jovem antes de se deslocar para além de São Bernardo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/X",nota:"O texto localiza o encontro na rua Direita e registra que o herói já havia ido parar adiante de São Bernardo."}},
    {id:"mac-sao-bernardo-u10",place_id:"mac-sp-sao-bernardo",canonical_name:"São Bernardo, São Paulo",unidade:10,unidade_label:"Cap. X — Pauí-Pódole",tipo:"narrativo",escala:"cidade",certeza:"identificado",funcao:"Marco territorial alcançado na deriva espacial da cena iniciada na Rua Direita.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/X",nota:"A narrativa afirma que Macunaíma já tinha ido parar adiante de São Bernardo."}},

    {id:"mac-rua-libero-u11",place_id:"mac-sp-rua-libero-textual",canonical_name:"Rua Líbero — topônimo textual, São Paulo",unidade:11,unidade_label:"Cap. XI — As três normalistas",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Rua em que a multidão e os policiais alcançam Macunaíma durante a tentativa de prisão.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XI",nota:"O texto registra que o tumulto já estava na rua Líbero; a forma completa moderna não é inferida automaticamente."}},

    {id:"mac-tiete-u12",place_id:"mac-sp-rio-tiete",canonical_name:"Rio Tietê, São Paulo",unidade:12,unidade_label:"Cap. XII — A velha Ceiucí",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Lugar escolhido por Macunaíma para pescar, onde ocorre o encontro com Ceiuci.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XII",nota:"Macunaíma anuncia que irá pescar peixões no igarapé Tietê e parte para lá."}},

    {id:"mac-beberibe-u13",place_id:"mac-beberibe-textual",canonical_name:"Beberibe — topônimo textual",unidade:13,unidade_label:"Cap. XIII — Teque-teque, Chupinzão e a Injustiça dos Homens",tipo:"mencionado",escala:"regiao",certeza:"ilustrativo",funcao:"Lugar onde Maanape busca o curandeiro Bento para tratar Macunaíma.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XIII",nota:"Maanape vai buscar o curandeiro Bento em Beberibe; a localidade não é desambiguada externamente nesta fase."}},
    {id:"mac-guapira-u13",place_id:"mac-sp-leprosario-guapira",canonical_name:"Leprosário de Guapira, São Paulo",unidade:13,unidade_label:"Cap. XIII — Teque-teque, Chupinzão e a Injustiça dos Homens",tipo:"narrativo",escala:"ponto",certeza:"identificado",funcao:"Instituição visitada por Macunaíma e seus irmãos após a recuperação do sarampo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XIII",nota:"Os irmãos levam Macunaíma para visitar o Leprosário de Guapira."}}
  ];
  for(const m of mentions) if(!c.place_mentions.some(x=>x.id===m.id)) c.place_mentions.push(m);
  c.notas=[
    "TL-11.2 aprofunda cenas urbanas verificáveis e evita inflar o corpus com listas paródicas ou a extensa enumeração aérea do capítulo XII.",
    "Rua Líbero e Beberibe permanecem como topônimos textuais sem desambiguação externa automática.",
    "Mesmo quando há deslocamento explícito, `percursos` permanece vazio até política específica de rotas validadas."
  ];
})();
