import fs from 'node:fs';
import vm from 'node:vm';

const manifestPath='data/rights-provenance.json';
const registryPath='js/corpus-registry.js';
if(!fs.existsSync(manifestPath))throw new Error('Manifest de direitos/proveniência ausente');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
if(manifest.jurisdiction!=='BR')throw new Error('Jurisdicao do manifest deve ser BR');
if(manifest.legal_basis?.article!=='41')throw new Error('Base legal deve registrar Art. 41');
if(!manifest.legal_basis?.url?.startsWith('https://www.planalto.gov.br/'))throw new Error('URL oficial da base legal ausente');

const works=manifest.works||[];
if(works.length!==12)throw new Error(`Manifest fundador deve conter 12 obras; recebeu ${works.length}`);
const workMap=new Map();
const today=new Date(`${manifest.assessment_date}T00:00:00Z`);
for(const w of works){
  if(!w.work_id||workMap.has(w.work_id))throw new Error(`work_id ausente/duplicado: ${w.work_id}`);
  workMap.set(w.work_id,w);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(w.author_death_date||''))throw new Error(`${w.work_id}: data de falecimento invalida`);
  if(!w.author_death_source?.startsWith('https://'))throw new Error(`${w.work_id}: fonte de falecimento deve ser HTTPS`);
  const deathYear=Number(w.author_death_date.slice(0,4));
  const expectedPd=`${deathYear+71}-01-01`;
  if(w.public_domain_from_br!==expectedPd)throw new Error(`${w.work_id}: dominio publico esperado ${expectedPd}; recebeu ${w.public_domain_from_br}`);
  if(new Date(`${w.public_domain_from_br}T00:00:00Z`)>today)throw new Error(`${w.work_id}: prazo patrimonial ainda nao expirou na data de avaliacao`);
  if(w.author_term_status!=='expired_under_brazil_article_41')throw new Error(`${w.work_id}: status patrimonial nao documentado`);
  if(!['published','planned'].includes(w.publication_status))throw new Error(`${w.work_id}: publication_status invalido`);
  if(w.publication_status==='published'){
    if(w.edition_status!=='frozen_in_corpus')throw new Error(`${w.work_id}: obra publicada sem edicao congelada`);
    if(w.reuse_mode!=='metadata_citation_and_external_links')throw new Error(`${w.work_id}: modo de reutilizacao publicado invalido`);
    if(w.review_status!=='documented_for_beta')throw new Error(`${w.work_id}: revisao documental insuficiente para beta`);
  }else{
    if(w.edition_status!=='pending_exact_source')throw new Error(`${w.work_id}: obra planejada deve permanecer bloqueada ate selecionar edicao`);
    if(w.reuse_mode!=='blocked_until_edition_selected')throw new Error(`${w.work_id}: obra planejada nao esta bloqueada por edicao`);
  }
}

const registryContext={window:{}};vm.createContext(registryContext);vm.runInContext(fs.readFileSync(registryPath,'utf8'),registryContext,{filename:registryPath});
const registry=registryContext.window.CORPUS_REGISTRY||{};
for(const [id,entry] of Object.entries(registry)){
  const rights=workMap.get(id);
  if(!rights)throw new Error(`${id}: corpus publicado sem registro de direitos/proveniencia`);
  if(rights.publication_status!=='published')throw new Error(`${id}: corpus no registry mas manifest nao o marca como published`);
  const context={window:{}};vm.createContext(context);
  for(const file of entry.scripts){
    if(!fs.existsSync(file))throw new Error(`${id}: arquivo de corpus ausente ${file}`);
    vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  }
  const corpus=context.window.CORPUS_PROFUNDO?.[id];
  const e=corpus?.edicao;
  if(!e)throw new Error(`${id}: corpus publicado sem objeto edicao`);
  for(const field of ['titulo','autor','ano','fonte','url'])if(e[field]===undefined||e[field]===null||e[field]==='')throw new Error(`${id}: edicao.${field} ausente`);
  if(!Number.isInteger(e.ano)||e.ano<1500||e.ano>2026)throw new Error(`${id}: ano da edicao invalido`);
  if(!String(e.url).startsWith('https://'))throw new Error(`${id}: URL de edicao deve ser HTTPS`);
  if(e.autor!==rights.author)throw new Error(`${id}: autor do corpus difere do manifest (${e.autor} != ${rights.author})`);
}

const published=works.filter(w=>w.publication_status==='published').length;
const planned=works.filter(w=>w.publication_status==='planned').length;
console.log(`Rights/provenance OK: ${published} obras publicadas documentadas; ${planned} planejadas com autoria elegivel e edicao bloqueada ate selecao.`);
