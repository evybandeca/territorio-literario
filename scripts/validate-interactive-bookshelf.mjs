import fs from 'node:fs';

const index=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('js/bookshelf-home.js','utf8');
const css=fs.readFileSync('css/bookshelf-home.css','utf8');

const checks=[
  ['bookshelf section present',/id="biblioteca-estante"/.test(index)],
  ['bookshelf styles loaded',/css\/bookshelf-home\.css/.test(index)],
  ['bookshelf script loaded',/js\/bookshelf-home\.js/.test(index)],
  ['cinematic shell',/bookshelf-scene/.test(index)],
  ['ambient upper shelf',/bookshelf-canopy/.test(index)],
  ['editorial side copy',/bookshelf-motto/.test(index)],
  ['movement filters',/id="bookshelf-filters"/.test(index)],
  ['search control',/id="bookshelf-search"/.test(index)],
  ['five-up stage',/bookshelf-stage/.test(index)&&/shelf-track/.test(index)],
  ['previous control',/data-bookshelf-prev/.test(index)],
  ['next control',/data-bookshelf-next/.test(index)],
  ['fixed selected detail',/id="bookshelf-detail"/.test(index)],
  ['secondary decorative shelf',/bookshelf-lower-shelf/.test(index)],
  ['collection CTA',/Explorar acervo/.test(index)],
  ['keyboard navigation',/ArrowRight/.test(js)&&/ArrowLeft/.test(js)],
  ['touch or pointer drag',/pointerdown/.test(js)&&/pointermove/.test(js)],
  ['selected book state',/is-selected/.test(js)&&/aria-selected/.test(js)],
  ['neighbor depth states',/is-before/.test(js)&&/is-after/.test(js)],
  ['reader integration',/READER_REGISTRY/.test(js)],
  ['live results',/aria-live/.test(index)],
  ['reduced motion',/prefers-reduced-motion/.test(css)],
  ['depth perspective',/perspective:/.test(css)],
  ['selected book forward motion',/translateZ\(/.test(css)],
  ['mobile snap shelf',/scroll-snap-type/.test(css)],
  ['visible focus',/:focus-visible/.test(css)]
];

const failed=checks.filter(([,ok])=>!ok);
if(failed.length){
  console.error('Cinematic bookshelf contract failed:');
  failed.forEach(([name])=>console.error(`- ${name}`));
  process.exit(1);
}
console.log('Cinematic bookshelf contract OK.');
