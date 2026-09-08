import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const registryCode=await fs.readFile('js/reader-registry.js','utf8');
const context={window:{},globalThis:{}};
vm.createContext(context);
vm.runInContext(registryCode,context);
const registry=context.window.READER_REGISTRY||context.globalThis.READER_REGISTRY||{};

async function fetchPart(config,source){
  const response=await fetch(source.url,{headers:{'user-agent':'Territorio-Literario/1.0 (+https://evybandeca.github.io/territorio-literario/)'}});
  if(!response.ok)throw new Error(`${config.id}: fonte respondeu HTTP ${response.status} (${source.url})`);
  const bytes=Buffer.from(await response.arrayBuffer());
  const rawSha256=crypto.createHash('sha256').update(bytes).digest('hex');
  const raw=new TextDecoder('utf-8').decode(bytes);
  const required=[
    `Most recently updated: ${source.expectedUpdate||config.source.expectedUpdate}`,
    ...(source.requiredMarkers||config.source.requiredMarkers||[])
  ];
  for(const marker of required)if(!raw.includes(marker))throw new Error(`${config.id}: marcador esperado ausente: ${marker}`);
  const startMarker='*** START OF THE PROJECT GUTENBERG EBOOK';
  const endMarker='*** END OF THE PROJECT GUTENBERG EBOOK';
  const start=raw.indexOf('\n',raw.indexOf(startMarker));
  const end=raw.indexOf(endMarker);
  if(start<0||end<0||end<=start)throw new Error(`${config.id}: envelope Gutenberg não reconhecido`);
  return {text:raw.slice(start+1,end).trim()+"\n",rawSha256,source};
}

for(const config of Object.values(registry)){
  const sources=config.source.parts||[config.source];
  const parts=[];
  const checksumErrors=[];
  for(const source of sources){
    const part=await fetchPart(config,source);
    if(source.sha256&&part.rawSha256!==source.sha256){
      checksumErrors.push(`${config.id} eBook #${source.ebook||config.source.ebook}: checksum SHA-256 divergente; esperado ${source.sha256}, obtido ${part.rawSha256}`);
    }
    parts.push(part);
  }
  if(checksumErrors.length)throw new Error(checksumErrors.join('\n'));
  const text=parts.map(part=>part.text.trim()).join('\n\n')+'\n';
  const output=path.resolve(config.localPath);
  await fs.mkdir(path.dirname(output),{recursive:true});
  await fs.writeFile(output,text,'utf8');
  const hashes=parts.map(part=>`#${part.source.ebook||config.source.ebook} ${part.rawSha256}`).join(', ');
  console.log(`Reader source OK: ${config.id} -> ${config.localPath} (${Buffer.byteLength(text)} bytes; ${hashes})`);
}
