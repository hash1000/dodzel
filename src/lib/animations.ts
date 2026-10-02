"use client";
let core: Promise<typeof import("gsap")> | undefined;
export function loadGsap() {
 return core ??= import("gsap");
}
export async function loadScrollAnimations() {
 const [{gsap},{ScrollTrigger}] = await Promise.all([loadGsap(),import("gsap/ScrollTrigger")]);
 gsap.registerPlugin(ScrollTrigger);
 return {gsap,ScrollTrigger};
}
