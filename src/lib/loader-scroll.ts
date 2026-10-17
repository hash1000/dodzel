let locked = false;
const listeners = new Set<(locked: boolean) => void>();

export function setLoaderScrollLocked(value: boolean) {
  locked = value;
  listeners.forEach((listener) => listener(value));
}

export function observeLoaderScroll(listener: (locked: boolean) => void) {
  listeners.add(listener);
  listener(locked);
  return () => { listeners.delete(listener); };
}
