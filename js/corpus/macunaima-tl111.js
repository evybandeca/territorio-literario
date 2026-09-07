// TERRITÓRIO LITERÁRIO — TL-11.1 Macunaíma: aprofundamento da geografia fantástica
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO["macunaima"];
  if(!c) throw new Error('TL-11.1 requer corpus base de Macunaíma');
  c.versao="0.2.0";
  c.metodologia="TL-11.1";
  c.estrutura.nota="As 19 unidades permanecem estruturadas integralmente. A v0.2 aprofunda os capítulos II–IV, VI–VII e XIV, distinguindo lugares reais, lugares fabulosos e saltos espaciais sem convertê-los em itinerário cartográfico.";

  const entities=[
    {id:"mac-cafundo-judas",canonical_name:"Cafundó do Judas",escala:"regiao",aliases:["Cafundó do Judas"],ficcional:true},
    {id:"mac-pe-pedra-bonita",canonical_name:"Pedra Bonita, Pernambuco",escala:"regiao",aliases:["Pedra Bonita"]},
    {id:"mac-pa-santarem",canonical_name:"Santarém, Pará",escala:"cidade",aliases:["Santarém"]},
    {id:"mac-pai-tocandeira",canonical_name:"Pai da Tocandeira",escala:"regiao",aliases:["Pai da Tocandeira"],ficcional:true},
    {id:"mac-rio-nhamunda",canonical_name:"Rio Nhamundá",escala:"regiao",aliases:["Nhamundá"]},
    {id:"mac-lagoa-espelho-lua",canonical_name:"Lagoa Espelho da Lua",escala:"regiao",aliases:["lagoa Espelho da Lua"],ficcional:true},
    {id:"mac-cidade-flores",canonical_name:"Cidade das Flores",escala:"cidade",aliases:["cidade das Flores"],ficcional:true},
    {id:"mac-rio-amarguras",canonical_name:"Rio das Amarguras",escala:"regiao",aliases:["rio das Amarguras"],ficcional:true},
    {id:"mac-salto-felicidade",canonical_name:"Salto da Felicidade",escala:"ponto",aliases:["salto da Felicidade"],ficcional:true},
    {id:"mac-estrada-prazeres",canonical_name:"Estrada dos Prazeres",escala:"rota",aliases:["estrada dos Prazeres"],ficcional:true},
    {id:"mac-capao-meu-bem",canonical_name:"Capão de Meu Bem",escala:"regiao",aliases:["capão de Meu Bem"],ficcional:true},
    {id:"mac-venezuela",canonical_name:"Venezuela",escala:"regiao",aliases:["Venezuela"]},
    {id:"mac-rj-rio-de-janeiro",canonical_name:"Rio de Janeiro",escala:"cidade",aliases:["Rio de Janeiro"]},
    {id:"mac-rj-mangue",canonical_name:"Mangue, Rio de Janeiro",escala:"bairro",aliases:["Mangue"]},
    {id:"mac-sp-rua-maranhao",canonical_name:"Rua Maranhão, São Paulo",escala:"rota",aliases:["rua Maranhão"]},
    {id:"mac-sp-anhangabau",canonical_name:"Parque do Anhangabaú, São Paulo",escala:"ponto",aliases:["parque do Anhangabaú"]},
    {id:"mac-sp-monumento-carlos-gomes",canonical_name:"Monumento a Carlos Gomes, Anhangabaú",escala:"ponto",aliases:["monumento a Carlos Gomes"]}
  ];
  for(const e of entities) if(!c.place_entities.some(x=>x.id===e.id)) c.place_entities.push(e);

  const mentions=[
    {id:"mac-cafundo-u2",place_id:"mac-cafundo-judas",canonical_name:"Cafundó do Judas",unidade:2,unidade_label:"Cap. II — Maioridade",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",funcao:"Capoeirão onde a mãe abandona Macunaíma como castigo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/II",nota:"O capítulo nomeia o capoeirão Cafundó do Judas como lugar do abandono do herói."}},
    {id:"mac-pedra-bonita-u2",place_id:"mac-pe-pedra-bonita",canonical_name:"Pedra Bonita, Pernambuco",unidade:2,unidade_label:"Cap. II — Maioridade",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Espaço real reelaborado como reino encantado atravessado pelo herói durante um salto geográfico fantástico.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/II",nota:"O texto afirma que Macunaíma atravessa o reino encantado da Pedra Bonita em Pernambuco."}},
    {id:"mac-santarem-u2",place_id:"mac-pa-santarem",canonical_name:"Santarém, Pará",unidade:2,unidade_label:"Cap. II — Maioridade",tipo:"narrativo",escala:"cidade",certeza:"identificado",funcao:"Cidade à qual o herói chega imediatamente após o salto fantástico por Pedra Bonita.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/II",nota:"A ação situa Macunaíma chegando à cidade de Santarém; a sequência não é convertida em rota real."}},
    {id:"mac-pai-tocandeira-u2",place_id:"mac-pai-tocandeira",canonical_name:"Pai da Tocandeira",unidade:2,unidade_label:"Cap. II — Maioridade",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",funcao:"Lugar nomeado onde a mãe de Macunaíma é enterrada.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/II",nota:"Os irmãos enterram a velha sob uma pedra no lugar chamado Pai da Tocandeira."}},

    {id:"mac-nhamunda-u3",place_id:"mac-rio-nhamunda",canonical_name:"Rio Nhamundá",unidade:3,unidade_label:"Cap. III — Ci, Mãe do Mato",tipo:"mencionado",escala:"regiao",certeza:"identificado",funcao:"Referência hidrográfica ligada à origem das icamiabas de Ci.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/III",nota:"Ci é associada às praias da lagoa Espelho da Lua, coada pelo Nhamundá."}},
    {id:"mac-espelho-lua-u3",place_id:"mac-lagoa-espelho-lua",canonical_name:"Lagoa Espelho da Lua",unidade:3,unidade_label:"Cap. III — Ci, Mãe do Mato",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",funcao:"Espaço mítico associado à tribo de mulheres a que pertence Ci.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/III",nota:"A lagoa Espelho da Lua é explicitamente nomeada na apresentação de Ci."}},
    {id:"mac-cidade-flores-u3",place_id:"mac-cidade-flores",canonical_name:"Cidade das Flores",unidade:3,unidade_label:"Cap. III — Ci, Mãe do Mato",tipo:"ficcional",escala:"cidade",certeza:"ilustrativo",funcao:"Lugar fantástico efetivamente atravessado pelos personagens após o encontro com Ci.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/III",nota:"Os personagens atravessam a cidade das Flores."}},
    {id:"mac-rio-amarguras-u3",place_id:"mac-rio-amarguras",canonical_name:"Rio das Amarguras",unidade:3,unidade_label:"Cap. III — Ci, Mãe do Mato",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",funcao:"Rio fantástico deliberadamente evitado no deslocamento narrativo.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/III",nota:"O texto afirma que os personagens evitaram o rio das Amarguras."}},
    {id:"mac-salto-felicidade-u3",place_id:"mac-salto-felicidade",canonical_name:"Salto da Felicidade",unidade:3,unidade_label:"Cap. III — Ci, Mãe do Mato",tipo:"ficcional",escala:"ponto",certeza:"ilustrativo",funcao:"Acidente fantástico sob o qual os personagens passam.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/III",nota:"A narrativa diz que passaram por debaixo do salto da Felicidade."}},
    {id:"mac-estrada-prazeres-u3",place_id:"mac-estrada-prazeres",canonical_name:"Estrada dos Prazeres",unidade:3,unidade_label:"Cap. III — Ci, Mãe do Mato",tipo:"ficcional",escala:"rota",certeza:"ilustrativo",funcao:"Estrada fantástica nomeada usada na sequência narrativa, sem ser promovida a percurso geográfico do sistema.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/III",nota:"Os personagens tomam a estrada dos Prazeres; `percursos` permanece vazio."}},
    {id:"mac-capao-meu-bem-u3",place_id:"mac-capao-meu-bem",canonical_name:"Capão de Meu Bem",unidade:3,unidade_label:"Cap. III — Ci, Mãe do Mato",tipo:"ficcional",escala:"regiao",certeza:"ilustrativo",funcao:"Centro fantástico de onde Macunaíma passa a imperar sobre os matos.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/III",nota:"A narrativa chega ao capão de Meu Bem, situado nos cerros da Venezuela."}},
    {id:"mac-venezuela-u3",place_id:"mac-venezuela",canonical_name:"Venezuela",unidade:3,unidade_label:"Cap. III — Ci, Mãe do Mato",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Referência territorial real na qual o texto situa o fantástico capão de Meu Bem.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/III",nota:"O capão de Meu Bem é explicitamente situado nos cerros da Venezuela; nenhuma rota até lá é inferida."}},

    {id:"mac-sao-paulo-u4",place_id:"mac-sp-sao-paulo",canonical_name:"São Paulo",unidade:4,unidade_label:"Cap. IV — Boiúna Luna",tipo:"narrativo",escala:"cidade",certeza:"identificado",funcao:"Destino decidido pelo herói após descobrir que a muiraquitã está com Venceslau Pietro Pietra.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/IV",nota:"Macunaíma declara que irá a São Paulo recuperar a muiraquitã."}},
    {id:"mac-sao-paulo-u6",place_id:"mac-sp-sao-paulo",canonical_name:"São Paulo",unidade:6,unidade_label:"Cap. VI — A francesa e o gigante",tipo:"narrativo",escala:"cidade",certeza:"identificado",funcao:"Cidade onde os irmãos estão instalados e onde se desenvolve a tentativa contra o gigante.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VI",nota:"O capítulo situa ações em São Paulo e menciona explicitamente a cidade tomada pelas içás."}},
    {id:"mac-rua-maranhao-u6",place_id:"mac-sp-rua-maranhao",canonical_name:"Rua Maranhão, São Paulo",unidade:6,unidade_label:"Cap. VI — A francesa e o gigante",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Rua associada à residência do gigante e evitada por Macunaíma após ser reconhecido.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VI",nota:"Macunaíma conclui que não poderia mais aparecer na rua Maranhão porque Venceslau já o conhecia."}},

    {id:"mac-rio-janeiro-u7",place_id:"mac-rj-rio-de-janeiro",canonical_name:"Rio de Janeiro",unidade:7,unidade_label:"Cap. VII — Macumba",tipo:"narrativo",escala:"cidade",certeza:"identificado",funcao:"Destino efetivo de uma viagem de trem para buscar auxílio de Exu.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VII",nota:"O capítulo afirma que Macunaíma resolve tomar um trem e ir ao Rio de Janeiro."}},
    {id:"mac-mangue-u7",place_id:"mac-rj-mangue",canonical_name:"Mangue, Rio de Janeiro",unidade:7,unidade_label:"Cap. VII — Macumba",tipo:"narrativo",escala:"bairro",certeza:"identificado",funcao:"Lugar da macumba de tia Ciata, onde Macunaíma efetivamente chega à noite.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VII",nota:"A macumba é situada no Mangue, no zungu da tia Ciata, e Macunaíma chega à biboca às vinte horas."}},
    {id:"mac-rua-maranhao-u7",place_id:"mac-sp-rua-maranhao",canonical_name:"Rua Maranhão, São Paulo",unidade:7,unidade_label:"Cap. VII — Macumba",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Local da residência de Venceslau Pietro Pietra, atingida simbolicamente pelos efeitos da macumba.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/VII",nota:"O texto situa o palácio de Venceslau na rua Maranhão em São Paulo."}},

    {id:"mac-anhangabau-u14",place_id:"mac-sp-anhangabau",canonical_name:"Parque do Anhangabaú, São Paulo",unidade:14,unidade_label:"Cap. XIV — A piolhenta do Jiguê",tipo:"narrativo",escala:"ponto",certeza:"identificado",funcao:"Lugar onde Macunaíma para durante uma caminhada pela cidade e tem uma visão associada ao monumento.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XIV",nota:"O herói para explicitamente no parque do Anhangabaú."}},
    {id:"mac-carlos-gomes-u14",place_id:"mac-sp-monumento-carlos-gomes",canonical_name:"Monumento a Carlos Gomes, Anhangabaú",unidade:14,unidade_label:"Cap. XIV — A piolhenta do Jiguê",tipo:"narrativo",escala:"ponto",certeza:"identificado",funcao:"Marco urbano sob o qual ocorre a cena fantástica da embarcação.",evidencia:{url:"https://pt.wikisource.org/wiki/Macuna%C3%ADma/1928/XIV",nota:"A cena é situada debaixo do monumento a Carlos Gomes, no Anhangabaú."}}
  ];
  for(const m of mentions) if(!c.place_mentions.some(x=>x.id===m.id)) c.place_mentions.push(m);
  c.notas=[
    "TL-11.1 distingue deliberadamente topônimo real, espaço ficcional e deslocamento fantástico.",
    "Pedra Bonita→Santarém e outras sucessões impossíveis permanecem ocorrências narrativas independentes, nunca rotas inferidas.",
    "Cidade das Flores, Rio das Amarguras, Salto da Felicidade, Estrada dos Prazeres e Capão de Meu Bem são preservados como geografia ficcional do romance."
  ];
})();
