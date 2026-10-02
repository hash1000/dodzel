import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3100';
const directory = 'reports/sectors-showcase';
await fs.mkdir(directory, {recursive:true});
const browser = await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const report = {screenshots:[], keyboard:{}, hover:{}, deepLinks:[], reduced:[], details:[], dev:[], review:{}, contrast:{}};
const items = [['oil-gas','Oil & Gas'],['refining','Refining'],['power','Power'],['cement','Cement']];
const errors=[];
const observe=page=>{page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text())})};
for (const width of [1440,1024,390]) {
 const context=await browser.newContext({viewport:{width,height:width===390?844:900},hasTouch:width===390});
 const page=await context.newPage();observe(page);
 await page.goto(base+'/sectors?review=0');await page.waitForTimeout(1000);
 const showcase=page.locator('[data-showcase]');
 for(const [id,title] of items){
  const control=showcase.getByRole(width>=1024?'tab':'button',{name:title,exact:true});
  await control.click();await page.waitForTimeout(500);
  const state=await page.evaluate(()=>{const root=document.querySelector('[data-showcase]');const active=root.querySelector('[role=tabpanel][data-active=true], [role=region][data-active=true]');const image=active.querySelector('img');const visible=[...root.querySelectorAll('[role=tabpanel], [role=region]')].filter(p=>p.dataset.active==='true');const files=[...root.querySelectorAll('img')].map(n=>n.src.replace(/-(640|1080|1920|2560)\.(avif|webp)$/,''));return{mode:root.querySelector('[data-showcase-mode]').dataset.showcaseMode,hash:location.hash,active:active.getAttribute('aria-labelledby'),open:visible.length,overflow:document.documentElement.scrollWidth>innerWidth,broken:image.complete&&!image.naturalWidth,duplicates:files.filter((f,i)=>files.indexOf(f)!==i),image:image.currentSrc,sticky:getComputedStyle(root.querySelector('.showcase-preview')??root).position}});
  await page.evaluate(()=>{document.activeElement?.blur?.();scrollTo({top:0,behavior:"instant"})});await page.waitForTimeout(150);
  await page.screenshot({path:`${directory}/${width}-${id}.png`,fullPage:true});
  report.screenshots.push({width,id,...state});
  if(state.hash!==`#${id}`||state.open!==1||state.overflow||state.broken||state.duplicates.length)errors.push(`Invalid ${width} ${id} state`);
 }
 await page.goto(base+'/sectors#power');await page.waitForTimeout(600);
 report.deepLinks.push({width,selected:await showcase.getByRole(width>=1024?'tab':'button',{name:'Power',exact:true}).getAttribute(width>=1024?'aria-selected':'aria-expanded')});
 await context.close();
}
const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();observe(page);
await page.goto(base+'/sectors?review=0');await page.waitForTimeout(800);
const tabs=page.getByRole('tab');await tabs.nth(0).focus();
for(const [key,expected]of[['ArrowDown','Refining'],['ArrowUp','Oil & Gas'],['End','Cement'],['ArrowDown','Oil & Gas'],['Home','Oil & Gas']]){
 await page.keyboard.press(key);const name=await page.evaluate(()=>document.activeElement.textContent.trim());report.keyboard[key+expected]={name,hash:await page.evaluate(()=>location.hash)};if(!name.startsWith(expected))errors.push('Keyboard '+key);
}
await page.keyboard.press('End');await page.keyboard.press('Tab');report.keyboard.panel=await page.evaluate(()=>({role:document.activeElement.getAttribute('role'),label:document.activeElement.getAttribute('aria-labelledby')}));if(report.keyboard.panel.role!=='tabpanel')errors.push('Tab did not enter panel');
await page.keyboard.press('Tab');report.keyboard.firstLink=await page.evaluate(()=>document.activeElement.textContent.trim());
await tabs.nth(1).hover();await page.waitForTimeout(40);report.hover.beforeIntent=await tabs.nth(1).getAttribute('aria-selected');await page.waitForTimeout(180);report.hover.afterIntent=await tabs.nth(1).getAttribute('aria-selected');await page.mouse.move(0,0);await page.waitForTimeout(1100);report.hover.noAutoplay=await page.evaluate(()=>location.hash);
if(report.hover.beforeIntent!=='false'||report.hover.afterIntent!=='true')errors.push('Hover intent');
for(const [slug]of items){await page.goto(base+'/sectors/'+slug+'?review=0');report.details.push({slug,status:(await page.request.get(base+'/sectors/'+slug)).status(),h1:await page.locator('h1').innerText(),related:await page.locator('main a[href^="/services/"]').count(),rfq:await page.locator('main a[href="/request-a-quote"]').count()});}
await page.goto(base+'/sectors?review=0');await page.waitForTimeout(500);report.review.clean=await page.getByText('Upstream',{exact:false}).evaluate(n=>getComputedStyle(n).display);
await page.goto(base+'/sectors?review=1');await page.waitForTimeout(500);report.review.enabled=await page.getByText('Upstream',{exact:false}).evaluate(n=>getComputedStyle(n).display);
const colours=await page.evaluate(()=>{const root=document.querySelector('[data-showcase]');const row=getComputedStyle(root.querySelector('.showcase-row[data-active=true]')),copy=getComputedStyle(root.querySelector('.showcase-panel[data-active=true] p'));return{rowText:row.color,rowBackground:row.backgroundColor,description:copy.color,surface:getComputedStyle(root).backgroundColor}});
const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);const lum=c=>c.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);const ratio=(a,b)=>(Math.max(lum(rgb(a)),lum(rgb(b)))+.05)/(Math.min(lum(rgb(a)),lum(rgb(b)))+.05);
report.contrast={...colours,activeRow:Number(ratio(colours.rowText,colours.rowBackground).toFixed(2)),description:Number(ratio(colours.description,colours.surface).toFixed(2))};await context.close();
for(const width of [1440,390]){const c=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'}),p=await c.newPage();observe(p);await p.goto(base+'/sectors#power');await p.waitForTimeout(650);const control=p.locator('[data-showcase]').getByRole(width>=1024?'tab':'button',{name:'Cement',exact:true});await control.click();const state=await p.evaluate(()=>{const root=document.querySelector('[data-showcase]');return{hash:location.hash,transforms:[...root.querySelectorAll('img,.showcase-copy')].map(n=>getComputedStyle(n).transform),transitions:[...root.querySelectorAll('.showcase-panel,.showcase-accordion')].map(n=>getComputedStyle(n).transitionDuration)}});report.reduced.push({width,...state});if(state.transforms.some(v=>v!=='none')||state.transitions.some(v=>v!=='0s'))errors.push('Reduced motion');await p.evaluate(()=>{document.activeElement?.blur?.();scrollTo({top:0,behavior:"instant"})});await p.waitForTimeout(150);await p.screenshot({path:`${directory}/${width}-reduced.png`,fullPage:true});await c.close()}
const dev=await browser.newContext(),dp=await dev.newPage();for(const route of ['/sectors',...items.map(([id])=>'/sectors/'+id)]){const warnings=[];const listener=m=>{if(['warning','error'].includes(m.type()))warnings.push(m.text())};dp.on('console',listener);await dp.goto((process.env.PLAYWRIGHT_DEV_URL??'http://localhost:3000')+route+'?review=0');await dp.waitForTimeout(1000);const issues=await dp.evaluate(()=>document.querySelector('nextjs-portal')?.shadowRoot?.querySelector('[data-issues-open]')?.innerText??null);report.dev.push({route,issues,warnings});dp.off('console',listener);if(issues||warnings.length)errors.push('Dev '+route)}await dev.close();await browser.close();
report.errors=errors;await fs.writeFile(`${directory}/verification.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(errors.length||report.deepLinks.some(r=>r.selected!=='true')||report.details.some(r=>r.status!==200||r.related!==3||r.rfq!==1)||report.contrast.activeRow<4.5||report.contrast.description<4.5)process.exitCode=1;
