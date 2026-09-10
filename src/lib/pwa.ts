export async function registerAppShell() {
  if (!import.meta.env.PROD || typeof window === "undefined" || window.self !== window.top) return;
  if (window.location.hostname.startsWith("id-preview--") || window.location.hostname.startsWith("preview--")) return;
  if (window.location.hostname === "lovableproject.com" || window.location.hostname.endsWith(".lovableproject.com")) return;
  if (window.location.search.includes("sw=off") || !("serviceWorker" in navigator)) return;

  try {
    await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  } catch {
    // The app remains fully usable without a service worker.
  }
}