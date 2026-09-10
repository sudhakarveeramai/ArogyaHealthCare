import type { HistoryEntry } from "@/lib/triage";
import type { SupportedLanguage } from "@/lib/translations";

const HISTORY_KEY = "arogya-triage-history";
const SETTINGS_KEY = "arogya-triage-settings";

export type TextSize = "standard" | "large" | "xlarge";

export interface HealthSettings {
  language: SupportedLanguage;
  textSize: TextSize;
  highContrast: boolean;
  emergencyPhone: string;
}

export const defaultSettings: HealthSettings = {
  language: "en",
  textSize: "standard",
  highContrast: false,
  emergencyPhone: "108", // Universal rural ambulance/emergency
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

export function saveHistoryEntry(entry: HistoryEntry): HistoryEntry[] {
  const history = [entry, ...loadHistory()].slice(0, 50);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function deleteHistoryEntry(id: string): HistoryEntry[] {
  const history = loadHistory().filter((entry) => entry.id !== id);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function loadSettings(): HealthSettings {
  return { ...defaultSettings, ...readJson<Partial<HealthSettings>>(SETTINGS_KEY, {}) };
}

export function saveSettings(settings: HealthSettings): void {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function clearHealthData(): void {
  window.localStorage.removeItem(HISTORY_KEY);
  window.localStorage.removeItem(SETTINGS_KEY);
}