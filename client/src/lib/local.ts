/* Small localStorage helpers so firebase.ts never touches the window API during SSR-ish contexts. */
export function getStorage(key: string, fallback: string): string {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function setItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode, full) — silently ignore */
  }
}
