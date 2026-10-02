import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3100';
const directory = 'reports/phase5';
await fs.mkdir(directory, {recursive: true});
const browser = await chromium.launch({executablePath: process.env.PLAYWRIGHT_CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true});
const report = { routes: [], process: [], reduced: {}, development: [], details: [], hover: [], motion: {} };
const routes = ['/', '/services', '/about', '/qhse', '/conduct', '/careers', '/contact', '/services/mechanical-piping', '/sectors', '/projects', '/insights', '/vendors', '/request-a-quote'];
for (const width of [1440, 390]) {
 const context = await browser.newContext({viewport:{width,height:width===1440?1000:844}, reducedMotion:'no-preference'});
 for (const route of routes) {
  const page = await context.newPage(); const errors=[];
  page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text())});
  await page.goto(base+route+'?review=0');await page.waitForTimeout(2000);
  // Exercise image-enter once, then return to the banner for a stable capture.
  await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}scrollTo(0,0)});
  await page.waitForTimeout(1200);
  const images=await page.locator('img[data-media-image], img[data-hero-poster]').evaluateAll(nodes=>nodes.map(n=>({slot:n.dataset.mediaSlot??'hero',file:new URL(n.currentSrc||n.src).pathname.replace(/-(640|1080|1920|2560)\.(avif|webp)$/,'')})));
  const duplicate=images.filter((item,i)=>images.findIndex(other=>other.file===item.file)!==i);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  const broken=await page.locator("img[data-media-image],img[data-hero-poster]").evaluateAll(nodes=>nodes.filter(n=>n.complete&&!n.naturalWidth).map(n=>n.currentSrc||n.src));
  const columns=route==='/services'?await page.locator('.service-card').count():null;
  await page.screenshot({path:`${directory}/${width}-${route==='/'?'home':route.slice(1).replaceAll('/','-')}.png`,fullPage:true});
  report.routes.push({width,route,errors,overflow,duplicate,broken,images,serviceCards:columns});
  await page.close();
 }
 await context.close();
}
const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
await page.goto(base+'/?review=0');await page.waitForTimeout(1400);
const top=await page.locator('#how-we-work').evaluate(n=>n.getBoundingClientRect().top+scrollY);
for(const progress of [0,.25,.5,.75,1,1.4]) {
 await page.evaluate(({top,progress})=>scrollTo({top:top-100+480*progress,behavior:'instant'}),{top,progress});await page.waitForTimeout(1200);
 report.process.push(await page.evaluate(()=>{const n=document.querySelector('#how-we-work');return{scrollY,top:n.getBoundingClientRect().top,bottom:n.getBoundingClientRect().bottom,active:[...n.querySelectorAll('[data-step]')].findIndex(x=>x.dataset.active==='true'),nextTop:n.parentElement.nextElementSibling?.getBoundingClientRect().top??n.nextElementSibling?.getBoundingClientRect().top,pin:n.parentElement.classList.contains('pin-spacer')}}));
 await page.screenshot({path:`${directory}/process-${progress}.png`});
}
await context.close();
const reduced=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),rp=await reduced.newPage();
await rp.goto(base+'/?review=0');await rp.waitForTimeout(1500);
report.reduced.home=await rp.evaluate(()=>({videos:document.querySelectorAll('video').length,pin:!!document.querySelector('.pin-spacer'),words:document.querySelectorAll('.hero-word').length,stats:[...document.querySelectorAll('.tabular-nums.font-display')].map(x=>x.textContent.trim())}));
await rp.goto(base+'/services?review=0');await rp.waitForTimeout(1400);
report.reduced.banner=await rp.evaluate(()=>({motion:document.querySelector('[data-banner]').dataset.motion??null,words:document.querySelectorAll('.banner-word').length,clip:getComputedStyle(document.querySelector('[data-banner-image]')).clipPath,transform:getComputedStyle(document.querySelector('[data-banner-image]')).transform}));
await rp.screenshot({path:`${directory}/390-services-reduced.png`,fullPage:true});await reduced.close();
const extra=await browser.newContext({viewport:{width:1440,height:1000}}),ep=await extra.newPage();
const checkImages=async()=>ep.locator('img[data-media-image],img[data-hero-poster]').evaluateAll(nodes=>{const files=nodes.map(n=>new URL(n.currentSrc||n.src).pathname.replace(/-(640|1080|1920|2560)\.(avif|webp)$/,''));return{duplicates:files.filter((f,i)=>files.indexOf(f)!==i),broken:nodes.filter(n=>n.complete&&!n.naturalWidth).map(n=>n.src)}});
for(const slug of ['engineering','procurement-supply-chain','project-management','civil-buildings','mechanical-piping','electrical-instrumentation','structural-steel','plant-services-turnaround-shutdown','offshore','project-facilities','maintenance']){await ep.goto(base+'/services/'+slug);await ep.waitForTimeout(1100);report.details.push({slug,...await checkImages()});}
await ep.goto(base+'/?review=0');await ep.waitForTimeout(1400);const rows=ep.locator('article').filter({has:ep.getByRole('heading',{name:'Build & Maintain',exact:true})}).locator('li');for(let i=0;i<await rows.count();i++){await rows.nth(i).locator('a').focus();await ep.waitForTimeout(650);report.hover.push({row:await rows.nth(i).locator('a').innerText(),...await checkImages()});}
await ep.goto(base+'/about');await ep.waitForTimeout(2500);const bannerImage=ep.locator('[data-banner-image]');const scale=()=>bannerImage.evaluate(n=>getComputedStyle(n).transform);report.motion.visibleStart=await scale();await ep.waitForTimeout(1100);report.motion.visibleEnd=await scale();await ep.evaluate(()=>scrollTo(0,800));await ep.waitForTimeout(200);report.motion.offscreenStart=await scale();await ep.waitForTimeout(1200);report.motion.offscreenEnd=await scale();await ep.evaluate(()=>scrollTo(0,0));await ep.waitForTimeout(200);await ep.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=> 'hidden'});document.dispatchEvent(new Event('visibilitychange'))});report.motion.hiddenEventStart=await scale();await ep.waitForTimeout(1100);report.motion.hiddenEventEnd=await scale();await extra.close();
const dev=await browser.newContext(),dp=await dev.newPage();
for(const route of routes.slice(0,8)){
 const errors=[];const listener=m=>{if(['error','warning'].includes(m.type()))errors.push(m.text())};dp.on('console',listener);
 await dp.goto((process.env.PLAYWRIGHT_DEV_URL??'http://localhost:3000')+route+'?review=0');await dp.waitForTimeout(1500);
 const issues=await dp.evaluate(()=>document.querySelector('nextjs-portal')?.shadowRoot?.querySelector('[data-issues-open]')?.innerText??null);
 report.development.push({route,issues,errors});dp.off('console',listener);
}
await dev.close();await browser.close();await fs.writeFile(`${directory}/verification.json`,JSON.stringify(report,null,2));
const failed=report.routes.filter(x=>x.errors.length||x.overflow||x.duplicate.length||x.broken.length);console.log(JSON.stringify({screenshots:report.routes.length,failures:failed,reduced:report.reduced,process:report.process,development:report.development,details:report.details,hover:report.hover,motion:report.motion},null,2));
if(failed.length||report.development.some(x=>x.errors.length||x.issues)||[...report.details,...report.hover].some(x=>x.duplicates.length||x.broken.length)||report.reduced.home.videos||report.reduced.home.pin||report.reduced.home.words||report.reduced.banner.words||report.reduced.banner.motion||report.motion.offscreenStart!==report.motion.offscreenEnd||report.motion.hiddenEventStart!==report.motion.hiddenEventEnd)process.exitCode=1;
