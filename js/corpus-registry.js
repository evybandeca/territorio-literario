(function(global){
  const REGISTRY=Object.freeze({
    'memorias-postumas':{scripts:['js/corpus/memorias-postumas.js','js/corpus/memorias-postumas-canonical.js']},
    'dom-casmurro':{scripts:['js/corpus/dom-casmurro.js','js/corpus/dom-casmurro-canonical.js']},
    'o-cortico':{scripts:['js/corpus/o-cortico.js']},
    'triste-fim-policarpo-quaresma':{scripts:['js/corpus/triste-fim-policarpo-quaresma.js']},
    'o-guarani':{scripts:['js/corpus/o-guarani.js']},
    'iracema':{scripts:['js/corpus/iracema.js']},
    'os-sertoes':{scripts:['js/corpus/os-sertoes.js','js/corpus/os-sertoes-canonical.js','js/corpus/os-sertoes-tl072.js']},
    'ursula':{scripts:['js/corpus/ursula.js']},
    'memorias-sargento-milicias':{scripts:['js/corpus/memorias-sargento-milicias.js']},
    'o-ateneu':{scripts:['js/corpus/o-ateneu.js']},
    'macunaima':{scripts:['js/corpus/macunaima.js']},
    'vidas-secas':{scripts:['js/corpus/vidas-secas.js']}
  });
  const inFlight=new Map();
  function loadScript(src){if(document.querySelector(`script[data-corpus-src="${src}"]`))return Promise.resolve();return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.async=false;script.dataset.corpusSrc=src;script.onload=()=>resolve();script.onerror=()=>reject(new Error(`Falha ao carregar corpus: ${src}`));document.head.appendChild(script)})}
  async function loadCorpusById(id){const entry=REGISTRY[id];if(!entry)return null;if(global.CORPUS_PROFUNDO?.[id])return global.CORPUS_PROFUNDO[id];if(inFlight.has(id))return inFlight.get(id);const promise=(async()=>{for(const src of entry.scripts)await loadScript(src);return global.CORPUS_PROFUNDO?.[id]||null})();inFlight.set(id,promise);try{return await promise}finally{inFlight.delete(id)}}
  async function loadAllCorpora(){await Promise.all(Object.keys(REGISTRY).map(loadCorpusById));return global.CORPUS_PROFUNDO||{}}
  global.CORPUS_REGISTRY=REGISTRY;global.loadCorpusById=loadCorpusById;global.loadAllCorpora=loadAllCorpora;
})(window);
