// TERRITÓRIO LITERÁRIO — TL-07.3 Os Sertões v1.0 promotion gate
(function(){
  const c=window.CORPUS_PROFUNDO&&window.CORPUS_PROFUNDO['os-sertoes'];
  if(!c) throw new Error('TL-07.3 requer corpus de Os Sertões');
  if(c.versao!=='0.3.0') throw new Error(`TL-07.3 requer TL-07.2 v0.3.0, recebido ${c.versao}`);
  const mentions=c.place_mentions||[];
  const covered=new Set(mentions.map(m=>m.unidade));
  const internalEvidence=mentions.filter(m=>m.evidencia?.url&&m.evidencia.url!=='https://pt.wikisource.org/wiki/Os_Sert%C3%B5es_(1902)');
  if(mentions.length<50) throw new Error(`Os Sertões: volume editorial insuficiente (${mentions.length}/50)`);
  if(covered.size<18) throw new Error(`Os Sertões: cobertura distribuída insuficiente (${covered.size}/18)`);
  if(internalEvidence.length<25) throw new Error(`Os Sertões: evidência textual interna insuficiente (${internalEvidence.length}/25)`);
  if((c.percursos||[]).length) throw new Error('Os Sertões: sequência militar não pode ser convertida em rota');
  c.status='COBERTURA_CONTINUA_AUDITADA';
  c.versao='1.0.0';
  c.metodologia='TL-07.3';
  c.estrutura.cobertura='continua_auditada';
  c.estrutura.nota='As 44 unidades da primeira edição permanecem auditadas em sequência. A promoção v1.0 consolida as camadas TL-07.1 e TL-07.2 somente após verificar volume editorial, distribuição entre unidades, evidência textual interna e ausência de rotas militares inferidas.';
  c.notas=c.notas||[];
  c.notas.push('TL-07.3 promove o corpus para v1.0 somente após gates mensuráveis sobre as camadas de aprofundamento textual já auditadas.');
  c.notas.push('A sequência histórica da campanha não é publicada como itinerário cartográfico; percursos permanece vazio.');
})();
