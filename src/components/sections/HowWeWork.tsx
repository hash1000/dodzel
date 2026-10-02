"use client";
import { useEffect, useRef } from "react";
import { loadScrollAnimations } from "@/lib/animations";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function HowWeWork() {
 const ref=useRef<HTMLElement>(null);
 useEffect(()=>{
  let alive=true,dispose=()=>{};
  const policy=matchMedia('(min-width:1024px) and (prefers-reduced-motion:no-preference)');
  const observer=new IntersectionObserver(async entries=>{
   if(!entries.some(entry=>entry.isIntersecting)||!policy.matches)return;observer.disconnect();
   const {ScrollTrigger}=await loadScrollAnimations();if(!alive||!policy.matches)return;
   const cards=Array.from(ref.current!.querySelectorAll<HTMLElement>('[data-step]'));
   const update=(index:number)=>cards.forEach((card,i)=>{card.dataset.active=String(i===index);card.dataset.completed=String(i<index);if(i===index)card.setAttribute('aria-current','step');else card.removeAttribute('aria-current')});
   update(0);
   const trigger=ScrollTrigger.create({trigger:ref.current,pin:ref.current,start:'top 100px',end:()=>`+=${Math.min(480,window.innerHeight*.5)}`,pinSpacing:true,invalidateOnRefresh:true,anticipatePin:1,onUpdate:self=>update(Math.min(cards.length-1,Math.floor(self.progress*cards.length)))});
   const refresh=()=>{if(alive&&policy.matches)ScrollTrigger.refresh()};void document.fonts.ready.then(refresh);const images=Array.from(document.images).filter(image=>!image.complete);images.forEach(image=>image.addEventListener('load',refresh,{once:true}));
   dispose=()=>{trigger.kill(true);images.forEach(image=>image.removeEventListener('load',refresh));cards.forEach(card=>{delete card.dataset.active;delete card.dataset.completed;card.removeAttribute('aria-current')})};
  },{rootMargin:'400px'});
  const sync=()=>{dispose();dispose=()=>{};observer.disconnect();if(policy.matches&&ref.current)observer.observe(ref.current)};sync();policy.addEventListener('change',sync);
  return()=>{alive=false;observer.disconnect();dispose();policy.removeEventListener('change',sync)};
 },[]);
 return <section ref={ref} data-tone="dark" id="how-we-work" className="process-band bg-surface-raised py-section text-on-dark"><Container><SectionHeading {...placeholders.headings.process}/><ol className="grid gap-4 lg:grid-cols-5">{placeholders.steps.map((step,index)=><li key={step.title} data-step className="rounded-card p-6"><span data-step-number className="tabular-nums text-sm text-on-dark-muted">0{index+1}</span><h3 className="mb-4 mt-6 text-xl">{step.title}</h3><p className="mb-4 text-sm leading-relaxed text-on-dark-muted">{step.description}</p><TodoBadge/></li>)}</ol></Container></section>;
}
