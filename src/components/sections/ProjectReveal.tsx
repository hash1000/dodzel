"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function ProjectReveal({children}:{children:ReactNode}) {
 const ref=useRef<HTMLElement>(null);
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const cards=Array.from(ref.current?.querySelectorAll<HTMLElement>('[data-project-card]')??[]);
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('project-enter');observer.unobserve(entry.target)}}),{threshold:.1});
  cards.forEach(card=>observer.observe(card));return()=>observer.disconnect();
 },[]);
 return <section ref={ref} className="bg-paper py-section">{children}</section>;
}
