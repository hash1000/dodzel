import type Lenis from "lenis";

let instance: Lenis | null = null;
let locked = false;
const instanceListeners = new Set<(value: Lenis | null) => void>();
const lockListeners = new Set<(value: boolean) => void>();

export function registerNavigationLenis(value: Lenis) {
  instance = value;
  instanceListeners.forEach((listener) => listener(value));
  return () => {
    if (instance !== value) return;
    instance = null;
    instanceListeners.forEach((listener) => listener(null));
  };
}
export function observeNavigationLenis(listener: (value: Lenis | null) => void) {
  instanceListeners.add(listener);
  listener(instance);
  return () => { instanceListeners.delete(listener); };
}
export function setNavigationScrollLocked(value: boolean) {
  locked = value;
  lockListeners.forEach((listener) => listener(value));
}
export function observeNavigationScrollLock(listener: (value: boolean) => void) {
  lockListeners.add(listener);
  listener(locked);
  return () => { lockListeners.delete(listener); };
}
