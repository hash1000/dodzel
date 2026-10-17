/** Hold starts only after the intro or a slide transition has completed. */
export const SLIDE_HOLD_MS = 4000;
export const HERO_TRANSITION = {
  textOut: 0.35,
  panelStart: 0.25,
  slideDuration: 1.6,
  incomingScale: 1.12,
  parallaxPercent: 25,
  outgoingDimOpacity: 0.3,
  textInStart: 1,
  textInDuration: 0.7,
  subtextDelay: 0.1,
  textOutOffset: 24,
  textInOffset: 24,
  reducedFade: 0.4,
  swipeThreshold: 50,
} as const;
