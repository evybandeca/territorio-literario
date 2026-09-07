// TERRITÓRIO LITERÁRIO — TL-09.1 Memórias de um Sargento de Milícias: aprofundamento urbano I–XX
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO["memorias-sargento-milicias"];
  if(!c) throw new Error('TL-09.1 requer corpus base');
  c.versao="0.2.0";
  c.metodologia="TL-09.1";
  c.estrutura.nota="A v0.2 aprofunda a geografia urbana dos capítulos I–XX em pontos de alta materialidade textual, preservando denominações históricas e recusando substituição automática por nomes modernos.";

  const entities=[
    {id:"msm-rj-largo-rossio",canonical_name:"Largo do Rossio / Campo dos Ciganos, Rio de Janeiro",escala:"ponto",aliases:["largo do Rossio","campo dos Ciganos"]},
    {id:"msm-rj-rua-vala",canonical_name:"Rua da Vala, Rio de Janeiro — topônimo histórico",escala:"rota",aliases:["rua da Vala","Rua da Vala"]},
    {id:"msm-rj-largo-paco",canonical_name:"Largo do Paço, Rio de Janeiro",escala:"ponto",aliases:["largo do Paço","Largo do Paço"]},
    {id:"msm-rj-valongo",canonical_name:"Valongo, Rio de Janeiro",escala:"regiao",aliases:["Valongo"]},
    {id:"msm-rj-rua-ourives",canonical_name:"Rua dos Ourives, Rio de Janeiro",escala:"rota",aliases:["rua dos Ourives","Rua dos Ourives"]},
    {id:"msm-rj-campo-divino",canonical_name:"Campo — festa do Divino, Rio de Janeiro",escala:"regiao",aliases:["Campo"]},
    {id:"msm-rj-lapa",canonical_name:"Lapa, Rio de Janeiro",escala:"regiao",aliases:["Lapa"]},
    {id:"msm-rj-igreja-santana",canonical_name:"Igreja de Sant’Ana, Rio de Janeiro — referência histórica",escala:"ponto",aliases:["igreja de Sant’Ana","igreja de Sant'Ana"]}
  ];
  for(const e of entities) if(!c.place_entities.some(x=>x.id===e.id)) c.place_entities.push(e);

  const mentions=[
    {id:"msm-rossio-u6",place_id:"msm-rj-largo-rossio",canonical_name:"Largo do Rossio / Campo dos Ciganos, Rio de Janeiro",unidade:6,unidade_label:"Cap. VI — Primeira noite fora de casa",tipo:"narrativo",escala:"ponto",certeza:"identificado",funcao:"Lugar de moradia da família cigana que acolhe Leonardo durante sua primeira noite fora de casa.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/VI",nota:"O capítulo situa a família dos meninos no largo do Rossio, que também chama de campo dos Ciganos."}},
    {id:"msm-vala-u12",place_id:"msm-rj-rua-vala",canonical_name:"Rua da Vala, Rio de Janeiro — topônimo histórico",unidade:12,unidade_label:"Cap. XII — Entrada para a escola",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Rua onde se localiza a escola frequentada por Leonardo.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/XII",nota:"O texto afirma explicitamente que o mestre morava em uma casa da rua da Vala."}},
    {id:"msm-largo-paco-u9",place_id:"msm-rj-largo-paco",canonical_name:"Largo do Paço, Rio de Janeiro",unidade:9,unidade_label:"Cap. IX — O arranjei-me do compadre",tipo:"biografico",escala:"ponto",certeza:"identificado",funcao:"Lugar onde o futuro compadre encontra trabalho como barbeiro de um marujo antes de embarcar.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/IX",nota:"O capítulo localiza no largo do Paço o encontro com o marujo que o leva ao navio."}},
    {id:"msm-valongo-u9",place_id:"msm-rj-valongo",canonical_name:"Valongo, Rio de Janeiro",unidade:9,unidade_label:"Cap. IX — O arranjei-me do compadre",tipo:"historico",escala:"regiao",certeza:"identificado",funcao:"Destino do tráfico negreiro explicitamente associado ao navio em que o compadre passa a trabalhar.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/IX",nota:"O navio é descrito como integrante dos comboios que traziam fornecimento para o Valongo."}},
    {id:"msm-ourives-u17",place_id:"msm-rj-rua-ourives",canonical_name:"Rua dos Ourives, Rio de Janeiro",unidade:17,unidade_label:"Cap. XVII — D. Maria",tipo:"narrativo",escala:"rota",certeza:"identificado",funcao:"Rua da casa de D. Maria e ponto de observação da procissão dos ourives.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/XVII",nota:"O narrador esclarece que a casa de D. Maria ficava na própria rua dos Ourives."}},
    {id:"msm-lapa-u20",place_id:"msm-rj-lapa",canonical_name:"Lapa, Rio de Janeiro",unidade:20,unidade_label:"Cap. XX — O fogo no campo",tipo:"narrativo",escala:"regiao",certeza:"identificado",funcao:"Destino alternativo da multidão que se dirige às festas do Divino na mesma noite.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/XX",nota:"O capítulo informa que grupos se dirigiam uns para o Campo e outros para a Lapa, onde também se festejava o Divino."}},
    {id:"msm-campo-u20",place_id:"msm-rj-campo-divino",canonical_name:"Campo — festa do Divino, Rio de Janeiro",unidade:20,unidade_label:"Cap. XX — O fogo no campo",tipo:"narrativo",escala:"regiao",certeza:"ilustrativo",funcao:"Espaço principal da festa do Divino visitada por Leonardo, Luisinha e o grupo de D. Maria.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/XX",nota:"A narrativa usa repetidamente apenas 'Campo'; a equivalência nominal moderna não é imposta automaticamente."}},
    {id:"msm-santana-u20",place_id:"msm-rj-igreja-santana",canonical_name:"Igreja de Sant’Ana, Rio de Janeiro — referência histórica",unidade:20,unidade_label:"Cap. XX — O fogo no campo",tipo:"narrativo",escala:"ponto",certeza:"identificado",funcao:"Marco explícito usado para situar o Império do Divino no Campo.",evidencia:{url:"https://pt.wikisource.org/wiki/Mem%C3%B3rias_de_um_Sargento_de_Mil%C3%ADcias/XX",nota:"O Império é situado quase defronte da igreja de Sant’Ana."}}
  ];
  for(const m of mentions) if(!c.place_mentions.some(x=>x.id===m.id)) c.place_mentions.push(m);

  c.notas=[
    "TL-09.1 aprofunda a primeira parte do romance com foco em espaços materialmente usados pelas ações.",
    "Rua da Vala e Campo permanecem sob denominação textual/histórica; nenhuma substituição por nomenclatura urbana posterior ocorre automaticamente.",
    "A sequência casa de D. Maria → Campo e demais deslocamentos não é convertida em percurso."
  ];
})();
