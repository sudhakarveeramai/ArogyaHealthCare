import type { HistoryEntry } from "@/lib/triage";

const HISTORY_KEY = "rural-care-history";
const SETTINGS_KEY = "rural-care-settings";

export type HealthSettings = {
  language: "en" | "hi";
  textSize: "standard" | "large";
  highContrast: boolean;
};

export const defaultSettings: HealthSettings = {
  language: "en",
  textSize: "standard",
  highContrast: false,
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadHistory(): HistoryEntry[] {
  return readJson<HistoryEntry[]>(HISTORY_KEY, []).filter((entry) => entry?.id && entry?.result);
}

export function saveHistoryEntry(entry: HistoryEntry) {
  const history = [entry, ...loadHistory()].slice(0, 30);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function deleteHistoryEntry(id: string) {
  const history = loadHistory().filter((entry) => entry.id !== id);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function loadSettings(): HealthSettings {
  return { ...defaultSettings, ...readJson<Partial<HealthSettings>>(SETTINGS_KEY, {}) };
}

export function saveSettings(settings: HealthSettings) {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function clearHealthData() {
  window.localStorage.removeItem(HISTORY_KEY);
  window.localStorage.removeItem(SETTINGS_KEY);
}