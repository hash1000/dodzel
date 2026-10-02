"use client";
import { useEffect, useRef, useState } from "react";
import { loadGsap } from "@/lib/animations";
import { ReviewBadge } from "./ReviewBadge";
export function StatCard({stat}:{stat:{value:string;label:string;numericValue:number|null;todo?:boolean;confirm?:boolean}}) {
 const ref=useRef<HTMLDivElement>(null),[value,setValue]=useState(stat.value);
 useEffect(()=>{
  let alive=true;let kill=()=>{};
  const motion=matchMedia('(prefers-reduced-motion:reduce)');
  const observer=new IntersectionObserver(async([entry])=>{
   if(!entry.isIntersecting||stat.numericValue===null)return;observer.disconnect();if(motion.matches)return;
   const {gsap}=await loadGsap();if(!alive||motion.matches)return;
   const count={value:0};setValue('0'+(stat.value.endsWith('+')?'+':''));const tween=gsap.to(count,{value:stat.numericValue,duration:1.2,onUpdate:()=>setValue(Math.round(count.value).toLocaleString()+(stat.value.endsWith('+')?'+':''))});kill=()=>tween.kill();
  },{threshold:.2});
  const reduce=()=>{if(motion.matches){kill();setValue(stat.value)}};
  if(ref.current&&!motion.matches)observer.observe(ref.current);motion.addEventListener('change',reduce);
  return()=>{alive=false;observer.disconnect();kill();motion.removeEventListener('change',reduce)};
 },[stat.numericValue,stat.value]);
 return <div ref={ref} className="border-s border-dark-line ps-6"><p className="mb-3 tabular-nums font-display text-3xl text-accent sm:text-4xl">{value}</p><p className="mb-4 text-sm text-on-dark-muted">{stat.label}</p><ReviewBadge {...stat}/></div>;
}
