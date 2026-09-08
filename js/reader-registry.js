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
      source:{
        provider:'Project Gutenberg',
        ebook:54829,
        url:'https://www.gutenberg.org/cache/epub/54829/pg54829.txt',
        expectedUpdate:'October 23, 2024',
        sha256:'edfe4370698ed5716a9692b980a8d6ee77b4ff8116503bb2e08675f1d10d303a',
        requiredMarkers:['MACHADO DE ASSIS','CAPITULO I','CAPITULO II']
      },
      localPath:'reader-content/memorias-postumas.txt',
      sourceReference:'https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas'
    },
    'dom-casmurro':{
      id:'dom-casmurro',
      titulo:'Dom Casmurro',
      tituloEdicao:'Dom Casmurro',
      autor:'Machado de Assis',
      ano:1899,
      edicao:'Rio de Janeiro: H. Garnier, 1899',
      chapterFormat:'roman-heading',
      source:{
        provider:'Project Gutenberg',
        ebook:55752,
        url:'https://www.gutenberg.org/cache/epub/55752/pg55752.txt',
        expectedUpdate:'October 23, 2024',
        sha256:'0fc3dbf384544d81d87e5a731e67b7976ac3a57acb378f0f354d12a3b52bd0c7',
        requiredMarkers:['MACHADO DE ASSIS','Do titulo.','Do livro.']
      },
      localPath:'reader-content/dom-casmurro.txt',
      sourceReference:'https://pt.wikisource.org/wiki/Dom_Casmurro'
    },
    'o-cortico':{
      id:'o-cortico',
      titulo:'O Cortiço',
      tituloEdicao:'O Cortiço',
      autor:'Aluísio Azevedo',
      ano:1890,
      edicao:'Rio de Janeiro: H. Garnier, 4ª ed., 1897',
      chapterFormat:'roman-untitled',
      source:{
        provider:'Project Gutenberg',
        ebook:69187,
        url:'https://www.gutenberg.org/cache/epub/69187/pg69187.txt',
        expectedUpdate:'October 19, 2024',
        sha256:'0000000000000000000000000000000000000000000000000000000000000000',
        requiredMarkers:['ALUIZIO AZEVEDO','O CORTICO','João Romão']
      },
      localPath:'reader-content/o-cortico.txt',
      sourceReference:'https://pt.wikisource.org/wiki/O_Corti%C3%A7o'
    }
  };
  root.READER_REGISTRY=registry;
  root.readerConfig=function(id){return registry[id]||null};
})(typeof window!=='undefined'?window:globalThis);
