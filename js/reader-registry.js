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
        sha256:'__PIN_AFTER_DISCOVERY__',
        requiredMarkers:['MACHADO DE ASSIS','I\n\nDo titulo.','II.\n\nDo livro.']
      },
      localPath:'reader-content/dom-casmurro.txt',
      sourceReference:'https://pt.wikisource.org/wiki/Dom_Casmurro'
    }
  };
  root.READER_REGISTRY=registry;
  root.readerConfig=function(id){return registry[id]||null};
})(typeof window!=='undefined'?window:globalThis);
