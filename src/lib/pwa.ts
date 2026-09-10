// PWA helper and install prompt manager

let deferredPrompt: any = null;

export async function registerAppShell() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    window.dispatchEvent(new CustomEvent("pwa-installable"));
  });

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    // Update found
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker) {
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
            window.dispatchEvent(new CustomEvent("pwa-updated"));
          }
        };
      }
    };
  } catch (err) {
    console.warn("Service worker registration skipped or failed:", err);
  }
}

export function isInstallPromptAvailable(): boolean {
  return deferredPrompt !== null;
}

export async function promptPwaInstall(): Promise<boolean> {
  if (!deferredPrompt) return false;
  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    return outcome === "accepted";
  } catch {
    return false;
  }
}