(function(root){
  const registry={
    'memorias-postumas':{
      id:'memorias-postumas',
      titulo:'Memórias Póstumas de Brás Cubas',
      tituloEdicao:'Memorias Posthumas de Braz Cubas',
      autor:'Machado de Assis',
      ano:1881,
      edicao:'Rio de Janeiro: Typographia Nacional, 1881',
      chapterFormat:'capitulo-roman',
      source:{provider:'Project Gutenberg',ebook:54829,url:'https://www.gutenberg.org/cache/epub/54829/pg54829.txt',expectedUpdate:'October 23, 2024',sha256:'edfe4370698ed5716a9692b980a8d6ee77b4ff8116503bb2e08675f1d10d303a',requiredMarkers:['MACHADO DE ASSIS','CAPITULO I','CAPITULO II']},
      localPath:'reader-content/memorias-postumas.txt',sourceReference:'https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas'
    },
    'dom-casmurro':{
      id:'dom-casmurro',titulo:'Dom Casmurro',tituloEdicao:'Dom Casmurro',autor:'Machado de Assis',ano:1899,edicao:'Rio de Janeiro: H. Garnier, 1899',chapterFormat:'roman-heading',
      source:{provider:'Project Gutenberg',ebook:55752,url:'https://www.gutenberg.org/cache/epub/55752/pg55752.txt',expectedUpdate:'October 23, 2024',sha256:'0fc3dbf384544d81d87e5a731e67b7976ac3a57acb378f0f354d12a3b52bd0c7',requiredMarkers:['MACHADO DE ASSIS','Do titulo.','Do livro.']},
      localPath:'reader-content/dom-casmurro.txt',sourceReference:'https://pt.wikisource.org/wiki/Dom_Casmurro'
    },
    'o-cortico':{
      id:'o-cortico',titulo:'O Cortiço',tituloEdicao:'O Cortiço',autor:'Aluísio Azevedo',ano:1890,edicao:'Rio de Janeiro: H. Garnier, 4ª ed., 1897',chapterFormat:'roman-untitled',
      source:{provider:'Project Gutenberg',ebook:69187,url:'https://www.gutenberg.org/cache/epub/69187/pg69187.txt',expectedUpdate:'October 19, 2024',sha256:'f17560b8cc8b260e61251090e62c6ed7794d1e1e57c5a573910bcbf726e169e5',requiredMarkers:['ALUIZIO AZEVEDO','O CORTICO','João Romão']},
      localPath:'reader-content/o-cortico.txt',sourceReference:'https://pt.wikisource.org/wiki/O_Corti%C3%A7o'
    },
    'triste-fim-policarpo-quaresma':{
      id:'triste-fim-policarpo-quaresma',titulo:'Triste Fim de Policarpo Quaresma',tituloEdicao:'Triste Fim de Polycarpo Quaresma',autor:'Lima Barreto',ano:1915,edicao:'Rio de Janeiro: Typ. Revista dos Tribunaes, 1915',chapterFormat:'part-roman-heading',
      source:{provider:'Project Gutenberg',ebook:67535,url:'https://www.gutenberg.org/cache/epub/67535/pg67535.txt',expectedUpdate:'October 18, 2024',sha256:'7898e07218e1431f00d6e6aa1d5ebe364bb6d770afaab865868a11df6da07350',requiredMarkers:['LIMA BARRETO','POLYCARPO QUARESMA','PRIMEIRA PARTE','SEGUNDA PARTE','TERCEIRA PARTE']},
      localPath:'reader-content/triste-fim-policarpo-quaresma.txt',sourceReference:'https://pt.wikisource.org/wiki/Triste_Fim_de_Policarpo_Quaresma'
    },
    'o-guarani':{
      id:'o-guarani',titulo:'O Guarani',tituloEdicao:'O Guarany',autor:'José de Alencar',ano:1883,edicao:'Rio de Janeiro: B.-L. Garnier, 5ª ed., 1883',chapterFormat:'part-roman-heading',
      source:{
        provider:'Project Gutenberg',ebook:'67724 + 67725',expectedUpdate:'October 18, 2024',
        parts:[
          {ebook:67724,url:'https://www.gutenberg.org/cache/epub/67724/pg67724.txt',sha256:'22713b6e92435496a5f865cf040acbc044c610759cb355c31ec00215dd2c72ab',requiredMarkers:['J. DE ALENCAR','PRIMEIRA PARTE','SEGUNDA PARTE','SCENARIO']},
          {ebook:67725,url:'https://www.gutenberg.org/cache/epub/67725/pg67725.txt',sha256:'b03cc5c553b7f5e061fd06cddb1f7bf7011ba3880e962a68b202f1b170aaa9a9',requiredMarkers:['J. DE ALENCAR','TERCEIRA PARTE','QUARTA PARTE','A CATASTROPHE']}
        ]
      },
      localPath:'reader-content/o-guarani.txt',sourceReference:'https://pt.wikisource.org/wiki/O_Guarani'
    },
    'iracema':{
      id:'iracema',titulo:'Iracema',tituloEdicao:'Iracema',autor:'José de Alencar',ano:1865,edicao:'Lisboa: Companhia Nacional Editora, 1890',chapterFormat:'roman-untitled',
      source:{provider:'Project Gutenberg',ebook:67740,url:'https://www.gutenberg.org/cache/epub/67740/pg67740.txt',expectedUpdate:'October 18, 2024',sha256:'e19bbd57aa2fff7715832b52e1c28562d8bdc4a908515609a6f638799d916bac',requiredMarkers:['JOSÉ DE ALENCAR','IRACEMA','Verdes mares bravios']},
      localPath:'reader-content/iracema.txt',sourceReference:'https://pt.wikisource.org/wiki/Iracema'
    }
  };
  root.READER_REGISTRY=registry;
  root.readerConfig=function(id){return registry[id]||null};
})(typeof window!=='undefined'?window:globalThis);
