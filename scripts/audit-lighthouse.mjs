import fs from 'node:fs';

const path=process.argv[2]||'lighthouse-home.json';
if(!fs.existsSync(path))throw new Error(`Relatório Lighthouse ausente: ${path}`);
const report=JSON.parse(fs.readFileSync(path,'utf8'));
const thresholds={performance:0.70,accessibility:0.85,'best-practices':0.85,seo:0.90};
const failures=[];
for(const [category,min] of Object.entries(thresholds)){
  const score=report.categories?.[category]?.score;
  if(typeof score!=='number')failures.push(`${category}: score ausente`);
  else if(score<min)failures.push(`${category}: ${(score*100).toFixed(0)} < ${(min*100).toFixed(0)}`);
  else console.log(`PASS Lighthouse ${category}: ${(score*100).toFixed(0)} >= ${(min*100).toFixed(0)}`);
}
const metrics={
  FCP:report.audits?.['first-contentful-paint']?.displayValue,
  LCP:report.audits?.['largest-contentful-paint']?.displayValue,
  TBT:report.audits?.['total-blocking-time']?.displayValue,
  CLS:report.audits?.['cumulative-layout-shift']?.displayValue
};
console.log('Core metrics:',metrics);
if(failures.length)throw new Error(`Lighthouse budget falhou: ${failures.join('; ')}`);
console.log('Lighthouse budget OK.');
