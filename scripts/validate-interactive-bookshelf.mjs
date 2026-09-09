import fs from 'node:fs';

const index=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('js/bookshelf-home.js','utf8');
const css=fs.readFileSync('css/bookshelf-home.css','utf8');

const checks=[
  ['bookshelf section present',/id="biblioteca-estante"/.test(index)],
  ['bookshelf styles loaded',/css\/bookshelf-home\.css/.test(index)],
  ['bookshelf script loaded',/js\/bookshelf-home\.js/.test(index)],
  ['carousel semantics',/role="region"[^>]*aria-label="Estante interativa/.test(index)],
  ['movement filters',/id="bookshelf-filters"/.test(index)],
  ['search control',/id="bookshelf-search"/.test(index)],
  ['track control',/id="bookshelf-track"/.test(index)],
  ['previous control',/data-bookshelf-prev/.test(index)],
  ['next control',/data-bookshelf-next/.test(index)],
  ['details panel',/id="bookshelf-detail"/.test(index)],
  ['keyboard navigation',/ArrowRight/.test(js)&&/ArrowLeft/.test(js)],
  ['touch or pointer drag',/pointerdown/.test(js)&&/pointermove/.test(js)],
  ['scrollIntoView',/scrollIntoView/.test(js)],
  ['reader integration',/READER_REGISTRY/.test(js)],
  ['aria selected state',/aria-selected/.test(js)],
  ['live results',/aria-live/.test(index)],
  ['reduced motion',/prefers-reduced-motion/.test(css)],
  ['mobile snap shelf',/scroll-snap-type/.test(css)],
  ['visible focus',/:focus-visible/.test(css)]
];

const failed=checks.filter(([,ok])=>!ok);
if(failed.length){
  console.error('Interactive bookshelf contract failed:');
  failed.forEach(([name])=>console.error(`- ${name}`));
  process.exit(1);
}
console.log('Interactive bookshelf contract OK.');
