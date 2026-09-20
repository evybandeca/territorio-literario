// Gera js/globo-terra.js a partir do TopoJSON de terras emersas do world-atlas
// (Natural Earth, domínio público; pacote npm world-atlas, licença ISC).
//
// Reproduzir:
//   npm pack world-atlas@2.0.2 && tar xzf world-atlas-2.0.2.tgz
//   node scripts/build-globe-land.mjs package/land-110m.json
//
// A saída é um único array de anéis em [lon,lat] arredondados a 0,1°, resolução
// suficiente para um globo de ~800 px (0,1° ≈ 0,45 px) e pequena o bastante para
// caber no orçamento de performance do portal.
import fs from 'node:fs';

const entrada=process.argv[2];
if(!entrada||!fs.existsSync(entrada))throw new Error(`Informe o caminho do land-110m.json (recebido: ${entrada||'nada'})`);
const topo=JSON.parse(fs.readFileSync(entrada,'utf8'));
const objeto=topo.objects?.land;
if(!objeto)throw new Error('TopoJSON sem objects.land');

const [sx,sy]=topo.transform.scale,[tx,ty]=topo.transform.translate;
const arcos=topo.arcs.map(arco=>{let x=0,y=0;return arco.map(([dx,dy])=>{x+=dx;y+=dy;return [x*sx+tx,y*sy+ty]})});
const montar=idx=>{const saida=[];for(const i of idx){const a=i<0?arcos[~i].slice().reverse():arcos[i];saida.push(...(saida.length?a.slice(1):a))}return saida};

const poligonos=[];
const coletar=g=>{
  if(g.type==='GeometryCollection')return g.geometries.forEach(coletar);
  if(g.type==='Polygon')poligonos.push(...g.arcs.map(montar));
  else if(g.type==='MultiPolygon')g.arcs.forEach(p=>poligonos.push(...p.map(montar)));
};
coletar(objeto);

// Área aproximada em graus quadrados (fórmula do laço), para descartar ilhas
// que a esta resolução virariam ruído de um ou dois pixels.
const area=r=>{let s=0;for(let i=0,j=r.length-1;i<r.length;j=i++)s+=(r[j][0]*r[i][1])-(r[i][0]*r[j][1]);return Math.abs(s/2)};
const AREA_MIN=0.6;

const aneis=[];
for(const anel of poligonos){
  if(area(anel)<AREA_MIN)continue;
  const compacto=[];
  let ax=null,ay=null;
  for(const [lon,lat] of anel){
    const x=Math.round(lon*10)/10,y=Math.round(lat*10)/10;
    if(x===ax&&y===ay)continue;           // remove vértices colapsados pelo arredondamento
    compacto.push(x,y);ax=x;ay=y;
  }
  if(compacto.length>=8)aneis.push(compacto);
}
aneis.sort((a,b)=>b.length-a.length);

const corpo=`// GERADO por scripts/build-globe-land.mjs — não edite à mão.
// Litorais do mundo (Natural Earth 110m, domínio público, via npm world-atlas@2.0.2).
// Anéis em [lon,lat,lon,lat,...], graus, arredondados a 0,1°.
const GLOBO_TERRA=${JSON.stringify(aneis)};
`;
fs.writeFileSync('js/globo-terra.js',corpo);
const kb=(Buffer.byteLength(corpo)/1024).toFixed(1);
console.log(`js/globo-terra.js: ${aneis.length} anéis, ${aneis.reduce((n,r)=>n+r.length/2,0)} vértices, ${kb} KiB`);
