import fs from 'node:fs';

const read=path=>fs.readFileSync(path,'utf8');
const html=read('index.html');
const globe=read('js/globo.js');
const css=read('css/ux-v1-1.css');

const requireText=(source,token,label)=>{if(!source.includes(token))throw new Error(`${label}: ausente ${token}`)};

requireText(html,'hero-stats','Home');
requireText(globe,'earth_atmos_2048.jpg','Globo');
requireText(globe,'wireframe','Globo');
requireText(globe,'group.position.x','Globo');
requireText(css,'.globo-hero','UX CSS');
requireText(css,'backdrop-filter','UX CSS');
requireText(css,'height:auto','UX CSS');
requireText(css,'overflow:visible','UX CSS');
requireText(css,'rgba(241,235,221','UX CSS');

console.log('Landing globe UX contract OK');
