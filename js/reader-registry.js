(function(root){
  const registry={
    'memorias-postumas':{
      id:'memorias-postumas',
      titulo:'Memórias Póstumas de Brás Cubas',
      tituloEdicao:'Memorias Posthumas de Braz Cubas',
      autor:'Machado de Assis',
      ano:1881,
      edicao:'Rio de Janeiro: Typographia Nacional, 1881',
      source:{
        provider:'Project Gutenberg',
        ebook:54829,
        url:'https://www.gutenberg.org/cache/epub/54829/pg54829.txt',
        expectedUpdate:'October 23, 2024'
      },
      localPath:'reader-content/memorias-postumas.txt',
      sourceReference:'https://pt.wikisource.org/wiki/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas'
    }
  };
  root.READER_REGISTRY=registry;
  root.readerConfig=function(id){return registry[id]||null};
})(typeof window!=='undefined'?window:globalThis);
