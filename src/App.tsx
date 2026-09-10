import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  assessSymptoms,
  durationOptions,
  getSymptomLabel,
  riskContextOptions,
  severityOptions,
  ageOptions,
  symptomsList,
  type ConcernLevel,
  type HistoryEntry,
  type Symptom,
  type SymptomCategory,
  type TriageAnswers,
  type TriageResult,
} from "@/lib/triage";
import {
  clearHealthData,
  defaultSettings,
  deleteHistoryEntry,
  loadHistory,
  loadSettings,
  saveHistoryEntry,
  saveSettings,
  type HealthSettings,
} from "@/lib/healthStorage";
import { registerAppShell, promptPwaInstall, isInstallPromptAvailable } from "@/lib/pwa";
import { translations, type SupportedLanguage } from "@/lib/translations";
import { offlineFirstAidTopics, type FirstAidTopic } from "@/lib/firstAidData";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CloudOff,
  Copy,
  Download,
  Droplets,
  HeartPulse,
  HelpCircle,
  History,
  Home,
  Info,
  Languages,
  PhoneCall,
  RotateCcw,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SunMedium,
  Trash2,
  Volume2,
  VolumeX,
  Wifi,
  X,
} from "lucide-react";

type Screen = "welcome" | "check" | "emergency" | "history" | "firstaid" | "settings";
type Step = 0 | 1 | 2 | 3 | 4;

const emptyAnswers: TriageAnswers = {
  symptoms: [],
  duration: "today",
  severity: "mild",
  ageGroup: "adult",
  riskContext: [],
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<TriageAnswers>(emptyAnswers);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [settings, setSettings] = useState<HealthSettings>(defaultSettings);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator === "undefined" ? true : navigator.onLine);
  const [installable, setInstallable] = useState<boolean>(false);
  const [showHow, setShowHow] = useState<boolean>(false);
  const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<HistoryEntry | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Category filter for symptom picker
  const [symptomSearch, setSymptomSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<SymptomCategory | "all">("all");

  const t = translations[settings.language] || translations.en;

  useEffect(() => {
    setHistory(loadHistory());
    setSettings(loadSettings());
    void registerAppShell();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleInstallable = () => setInstallable(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("pwa-installable", handleInstallable);

    if (isInstallPromptAvailable()) setInstallable(true);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("pwa-installable", handleInstallable);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateSettings = (next: HealthSettings) => {
    setSettings(next);
    saveSettings(next);
  };

  const beginCheck = () => {
    setAnswers(emptyAnswers);
    setResult(null);
    setStep(0);
    setSymptomSearch("");
    setSelectedCategory("all");
    setScreen("check");
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const finishCheck = () => {
    const assessed = assessSymptoms(answers);
    setResult(assessed);
    const newEntry: HistoryEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      answers,
      result: assessed,
    };
    const updated = saveHistoryEntry(newEntry);
    setHistory(updated);
  };

  // Text-To-Speech reader for triage results
  const toggleSpeech = (textToRead: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      showToast("Speech synthesis not supported on this browser.");
      return;
    }
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = t.speechLangCode;
    utterance.rate = 0.9; // Slightly slower for clear rural understanding
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Filtered symptoms based on search and category
  const filteredSymptoms = useMemo(() => {
    return symptomsList.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const localizedLabel = getSymptomLabel(item.id, settings.language).toLowerCase();
      const engLabel = item.label.toLowerCase();
      const query = symptomSearch.toLowerCase().trim();
      const matchesSearch = !query || localizedLabel.includes(query) || engLabel.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, symptomSearch, settings.language]);

  // Check if any dangerous symptom is currently selected
  const hasDangerousSelected = useMemo(() => {
    return answers.symptoms.some((id) => symptomsList.find((s) => s.id === id)?.dangerous);
  }, [answers.symptoms]);

  const toggleSymptom = (id: string) => {
    setAnswers((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(id)
        ? prev.symptoms.filter((x) => x !== id)
        : [...prev.symptoms, id],
    }));
  };

  const toggleRisk = (risk: string) => {
    setAnswers((prev) => ({
      ...prev,
      riskContext: prev.riskContext.includes(risk)
        ? prev.riskContext.filter((x) => x !== risk)
        : [...prev.riskContext, risk],
    }));
  };

  const handleInstallClick = async () => {
    const accepted = await promptPwaInstall();
    if (accepted) {
      setInstallable(false);
      showToast("ArogyaCare installed successfully!");
    }
  };

  // Text size class
  const textSizeClass =
    settings.textSize === "xlarge"
      ? "text-size-xlarge"
      : settings.textSize === "large"
      ? "text-size-large"
      : "text-size-standard";

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-all duration-150 ${textSizeClass} ${
        settings.highContrast ? "high-contrast-mode" : ""
      }`}
    >
      <div className="mx-auto min-h-screen max-w-2xl bg-background pb-24 shadow-sm border-x border-border/40">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <button
              onClick={() => setScreen("welcome")}
              className="flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1 transition-colors hover:bg-secondary/40"
              aria-label="Return to home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <HeartPulse className="h-6 w-6" />
              </span>
              <div>
                <span className="block text-base font-extrabold tracking-tight text-foreground leading-tight">
                  {t.appName}
                </span>
                <span className="block text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {isOnline ? "● " + t.worksOffline : "● " + t.offlineActive}
                </span>
              </div>
            </button>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5">
              {/* Quick Language Dropdown */}
              <select
                aria-label="Change language"
                value={settings.language}
                onChange={(e) =>
                  updateSettings({
                    ...settings,
                    language: e.target.value as SupportedLanguage,
                  })
                }
                className="h-9 rounded-lg border border-input bg-card px-2 text-xs font-bold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">EN (English)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="es">ES (Español)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>

              {/* Text Size Fast Toggle */}
              <button
                aria-label="Toggle font size"
                onClick={() => {
                  const sizes: Array<HealthSettings["textSize"]> = ["standard", "large", "xlarge"];
                  const nextIdx = (sizes.indexOf(settings.textSize) + 1) % sizes.length;
                  updateSettings({ ...settings, textSize: sizes[nextIdx] });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-card text-xs font-black shadow-sm transition hover:bg-secondary"
                title="Adjust font size"
              >
                {settings.textSize === "standard" ? "A" : settings.textSize === "large" ? "A+" : "A++"}
              </button>

              {/* Emergency Call Shortcut */}
              <a
                href={`tel:${settings.emergencyPhone}`}
                className="flex h-9 items-center gap-1 rounded-lg bg-destructive px-2.5 text-xs font-bold text-destructive-foreground shadow-sm transition hover:bg-destructive/90"
                title="Call Emergency Ambulance"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{settings.emergencyPhone}</span>
              </a>
            </div>
          </div>
        </header>

        {/* Global Toast Alert */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lg animate-in fade-in slide-in-from-top-2">
            {toastMessage}
          </div>
        )}

        {/* SCREEN 1: WELCOME */}
        {screen === "welcome" && (
          <main className="px-4 py-6 sm:px-6">
            {/* Install PWA Prompt Banner */}
            {installable && (
              <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-secondary/80 p-3.5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.installApp}</p>
                    <p className="text-xs text-muted-foreground">{t.installAppDesc}</p>
                  </div>
                </div>
                <Button size="sm" onClick={handleInstallClick} className="font-bold shrink-0">
                  Install
                </Button>
              </div>
            )}

            {/* Hero Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t.worksOffline}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl leading-tight">
                {t.heroTitle}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t.heroDesc}</p>

              {/* Primary Action Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 flex-1 text-base font-extrabold shadow-md transition-transform active:scale-[0.98]"
                  onClick={beginCheck}
                >
                  <span>{t.checkSymptoms}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 border-2 font-bold transition hover:bg-secondary/60"
                  onClick={() => setShowHow(true)}
                >
                  <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                  {t.howItWorks}
                </Button>
              </div>
            </div>

            {/* Core Trust & Benefit Badges */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-xs">
                <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                  <CloudOff className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-foreground">{t.statZeroData}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.statZeroDataDesc}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-xs">
                <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Activity className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-foreground">{t.statInstant}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.statInstantDesc}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-xs">
                <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-foreground">{t.statSafe}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.statSafeDesc}</p>
              </div>
            </div>

            {/* Quick Access to Offline Guides */}
            <div className="mt-5 space-y-3">
              <button
                onClick={() => setScreen("firstaid")}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 text-left shadow-xs transition hover:border-primary/50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-100 p-2.5 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{t.firstAidLibrary}</p>
                    <p className="text-xs text-muted-foreground">
                      ORS recipes, snakebite rules, fever sponge guides
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button
                onClick={() => setScreen("emergency")}
                className="flex w-full items-center justify-between rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-left shadow-xs transition hover:bg-destructive/10"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-destructive p-2.5 text-destructive-foreground">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-destructive">{t.emergencyGuide}</p>
                    <p className="text-xs text-muted-foreground">
                      Immediate life-saving instructions & 108 dialer
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-destructive" />
              </button>
            </div>

            {/* Medical Disclaimer Banner */}
            <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-center text-xs leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">{t.disclaimerShort}</p>
              <p className="mt-1">{t.disclaimerFull}</p>
            </div>
          </main>
        )}

        {/* SCREEN 2: SYMPTOM CHECKER & WIZARD */}
        {screen === "check" && (
          <main className="px-4 py-5 sm:px-6">
            {result ? (
              /* RESULTS VIEW */
              <ResultScreen
                result={result}
                answers={answers}
                t={t}
                lang={settings.language}
                emergencyPhone={settings.emergencyPhone}
                isPlayingAudio={isPlayingAudio}
                onToggleSpeech={toggleSpeech}
                onAgain={beginCheck}
                onHome={() => setScreen("welcome")}
                onShowToast={showToast}
              />
            ) : (
              /* INTERACTIVE STEP WIZARD */
              <div>
                {/* Step Progress Bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                    <span className="text-primary uppercase tracking-wider">
                      {t.stepOf} {step + 1} / 5
                    </span>
                    <span>{Math.round(((step + 1) / 5) * 100)}%</span>
                  </div>
                  <div className="mt-2 flex h-2 w-full gap-1 rounded-full bg-border overflow-hidden">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className={`h-full flex-1 transition-all duration-300 ${
                          s <= step ? "bg-primary" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Potentially Urgent Symptom Alert Interceptor */}
                {hasDangerousSelected && (
                  <div className="mb-5 rounded-xl border-2 border-destructive bg-destructive/10 p-4 shadow-sm pulse-emergency">
                    <div className="flex items-start gap-3">
                      <AlertOctagon className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
                      <div>
                        <p className="font-extrabold text-destructive text-sm">
                          {t.dangerAlertDetected}
                        </p>
                        <p className="mt-1 text-xs text-foreground leading-relaxed">
                          {t.dangerAlertMsg}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href={`tel:${settings.emergencyPhone}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-destructive px-3 py-2 text-xs font-bold text-destructive-foreground shadow-sm transition hover:bg-destructive/90"
                          >
                            <PhoneCall className="h-4 w-4" />
                            {t.emergencyCallNow}
                          </a>
                          <button
                            onClick={() => setScreen("emergency")}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 bg-card px-3 py-2 text-xs font-bold text-destructive transition hover:bg-destructive/10"
                          >
                            {t.emergencyGuide}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 0: SYMPTOMS SELECTION */}
                {step === 0 && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                      {t.qSymptomsTitle}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{t.selectMultipleNotice}</p>

                    {/* Search Box */}
                    <div className="relative mt-4">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={t.searchSymptomPlaceholder}
                        value={symptomSearch}
                        onChange={(e) => setSymptomSearch(e.target.value)}
                        className="h-12 w-full rounded-xl border border-input bg-card pl-10 pr-10 text-sm font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {symptomSearch && (
                        <button
                          onClick={() => setSymptomSearch("")}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label="Clear search"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Category Filter Chips */}
                    <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {(
                        [
                          { id: "all", label: t.allCategories },
                          { id: "fever", label: t.catFever },
                          { id: "breathing", label: t.catBreathing },
                          { id: "stomach", label: t.catStomach },
                          { id: "nerves", label: t.catNerves },
                          { id: "bites", label: t.catBites },
                        ] as const
                      ).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-primary text-primary-foreground shadow-xs"
                              : "border border-border bg-card text-muted-foreground hover:bg-secondary/60"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Symptoms Grid */}
                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {filteredSymptoms.map((symptom) => {
                        const isSelected = answers.symptoms.includes(symptom.id);
                        const labelText = getSymptomLabel(symptom.id, settings.language);
                        return (
                          <button
                            key={symptom.id}
                            type="button"
                            onClick={() => toggleSymptom(symptom.id)}
                            className={`flex min-h-[56px] w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-bold transition-all active:scale-[0.99] ${
                              isSelected
                                ? "border-primary bg-secondary/80 text-foreground ring-2 ring-primary/20 shadow-xs"
                                : symptom.dangerous
                                ? "border-destructive/30 bg-card hover:border-destructive/60"
                                : "border-border bg-card hover:border-primary/40 hover:bg-secondary/20"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                  isSelected
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "border-input bg-background"
                                }`}
                              >
                                {isSelected && <Check className="h-3.5 w-3.5" />}
                              </span>
                              <span className="leading-snug">{labelText}</span>
                            </div>
                            {symptom.dangerous && (
                              <span
                                className="shrink-0 rounded bg-destructive/15 px-1.5 py-0.5 text-[10px] font-black text-destructive"
                                title="High Priority Warning Sign"
                              >
                                ALERT
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {answers.symptoms.length > 0 && (
                      <p className="mt-3 text-xs font-bold text-primary">
                        {answers.symptoms.length} {t.selectedCount}
                      </p>
                    )}
                  </div>
                )}

                {/* STEP 1: DURATION */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                      {t.qDurationTitle}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{t.qDurationSubtitle}</p>
                    <div className="mt-5 space-y-2.5">
                      {durationOptions.map((opt) => {
                        const isSelected = answers.duration === opt.id;
                        const labelText =
                          settings.language === "hi"
                            ? opt.hindi
                            : settings.language === "es"
                            ? opt.spanish
                            : settings.language === "ta"
                            ? opt.tamil
                            : opt.label;

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setAnswers({ ...answers, duration: opt.id })}
                            className={`flex min-h-[60px] w-full items-center justify-between rounded-xl border p-4 text-left text-sm font-bold transition-all ${
                              isSelected
                                ? "border-primary bg-secondary/80 text-foreground ring-2 ring-primary/20 shadow-xs"
                                : "border-border bg-card hover:bg-secondary/30"
                            }`}
                          >
                            <span>{labelText}</span>
                            <span
                              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? "border-primary bg-primary text-white" : "border-input"
                              }`}
                            >
                              {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: SEVERITY */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                      {t.qSeverityTitle}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{t.qSeveritySubtitle}</p>
                    <div className="mt-5 space-y-2.5">
                      {severityOptions.map((opt) => {
                        const isSelected = answers.severity === opt.id;
                        const titleText =
                          settings.language === "hi"
                            ? opt.hindi
                            : settings.language === "es"
                            ? opt.spanish
                            : settings.language === "ta"
                            ? opt.tamil
                            : opt.label;

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setAnswers({ ...answers, severity: opt.id })}
                            className={`flex min-h-[68px] w-full items-start justify-between rounded-xl border p-4 text-left transition-all ${
                              isSelected
                                ? "border-primary bg-secondary/80 text-foreground ring-2 ring-primary/20 shadow-xs"
                                : opt.id === "incapacitated"
                                ? "border-destructive/40 bg-card hover:border-destructive/80"
                                : "border-border bg-card hover:bg-secondary/30"
                            }`}
                          >
                            <div>
                              <p className="font-bold text-sm text-foreground">{titleText}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">{opt.detail}</p>
                            </div>
                            <span
                              className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? "border-primary bg-primary text-white" : "border-input"
                              }`}
                            >
                              {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: AGE GROUP */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                      {t.qAgeTitle}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{t.qAgeSubtitle}</p>
                    <div className="mt-5 space-y-2.5">
                      {ageOptions.map((opt) => {
                        const isSelected = answers.ageGroup === opt.id;
                        const labelText =
                          settings.language === "hi"
                            ? opt.hindi
                            : settings.language === "es"
                            ? opt.spanish
                            : settings.language === "ta"
                            ? opt.tamil
                            : opt.label;

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setAnswers({ ...answers, ageGroup: opt.id })}
                            className={`flex min-h-[64px] w-full items-center justify-between rounded-xl border p-4 text-left text-sm font-bold transition-all ${
                              isSelected
                                ? "border-primary bg-secondary/80 text-foreground ring-2 ring-primary/20 shadow-xs"
                                : "border-border bg-card hover:bg-secondary/30"
                            }`}
                          >
                            <div>
                              <p className="font-bold text-foreground">{labelText}</p>
                              <p className="text-xs text-muted-foreground font-normal">
                                {opt.riskFactor}
                              </p>
                            </div>
                            <span
                              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                isSelected ? "border-primary bg-primary text-white" : "border-input"
                              }`}
                            >
                              {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: RISK CONTEXT */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                      {t.qRiskTitle}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{t.qRiskSubtitle}</p>
                    <div className="mt-5 space-y-2.5">
                      {riskContextOptions.map((opt) => {
                        const isSelected = answers.riskContext.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleRisk(opt)}
                            className={`flex min-h-[58px] w-full items-center justify-between rounded-xl border p-4 text-left text-sm font-semibold transition-all ${
                              isSelected
                                ? "border-primary bg-secondary/80 text-foreground ring-2 ring-primary/20 shadow-xs"
                                : "border-border bg-card hover:bg-secondary/30"
                            }`}
                          >
                            <span>{opt}</span>
                            <span
                              className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 ${
                                isSelected ? "bg-primary border-primary text-white" : "border-input"
                              }`}
                            >
                              {isSelected && <Check className="h-3.5 w-3.5" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center justify-between gap-3 pt-3 border-t border-border">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-5 font-bold"
                    onClick={() => {
                      if (step === 0) setScreen("welcome");
                      else setStep((step - 1) as Step);
                    }}
                  >
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    {t.back}
                  </Button>

                  <Button
                    size="lg"
                    className="h-12 min-w-36 px-6 font-extrabold shadow-sm"
                    disabled={step === 0 && answers.symptoms.length === 0}
                    onClick={() => {
                      if (step === 4) finishCheck();
                      else setStep((step + 1) as Step);
                    }}
                  >
                    <span>{step === 4 ? t.seeResult : t.continue}</span>
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </main>
        )}

        {/* SCREEN 3: EMERGENCY SCREEN */}
        {screen === "emergency" && (
          <main className="px-4 py-6 sm:px-6">
            <div className="rounded-2xl border-2 border-destructive bg-destructive p-6 text-destructive-foreground shadow-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 shrink-0 text-white animate-bounce" />
                <div>
                  <h1 className="text-2xl font-black">{t.emergencyGuide}</h1>
                  <p className="text-xs text-destructive-foreground/90 mt-0.5">
                    Immediate steps when life or consciousness is in danger
                  </p>
                </div>
              </div>

              {/* Huge 1-tap call button */}
              <a
                href={`tel:${settings.emergencyPhone}`}
                className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-white text-base font-black text-destructive shadow-md hover:bg-slate-100 active:scale-[0.98] transition-transform"
              >
                <PhoneCall className="h-6 w-6" />
                <span>Call Emergency ({settings.emergencyPhone})</span>
              </a>
            </div>

            {/* Emergency Checklist */}
            <div className="mt-5 space-y-4">
              <Card className="p-5">
                <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <Activity className="h-5 w-5 text-destructive" />
                  Immediate Stabilizing Actions (While Waiting for Transport)
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex gap-2.5">
                    <span className="font-bold text-destructive">1.</span>
                    <span>
                      <strong>Keep Airways Clear:</strong> If unconscious, turn patient onto their
                      side (lateral recovery position) so saliva or vomit does not choke them.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-bold text-destructive">2.</span>
                    <span>
                      <strong>Loosen Tight Clothes:</strong> Unbutton collar, belt, and chest
                      clothing for easy air movement.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-bold text-destructive">3.</span>
                    <span>
                      <strong>Do NOT Force Liquids or Pills:</strong> Never pour water or oral
                      medicines into the mouth of a drowsy or seizing person.
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-bold text-destructive">4.</span>
                    <span>
                      <strong>Snake / Scorpion Bite:</strong> Keep the bitten limb lower than heart
                      level and splint it still. Never cut or suck the wound.
                    </span>
                  </li>
                </ul>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 flex-1 font-bold"
                  onClick={() => setScreen("welcome")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  {t.home}
                </Button>
                <Button
                  size="lg"
                  className="h-12 flex-1 font-bold"
                  onClick={beginCheck}
                >
                  {t.checkSymptoms}
                </Button>
              </div>
            </div>
          </main>
        )}

        {/* SCREEN 4: FIRST-AID OFFLINE LIBRARY */}
        {screen === "firstaid" && (
          <main className="px-4 py-6 sm:px-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-foreground">{t.firstAidLibrary}</h1>
                <p className="text-xs text-muted-foreground mt-0.5">{t.firstAidSubtitle}</p>
              </div>
              <BookOpen className="h-7 w-7 text-primary" />
            </div>

            <div className="space-y-4">
              {offlineFirstAidTopics.map((topic) => (
                <Card key={topic.id} className="p-5 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-secondary p-2.5 text-primary shrink-0">
                      {topic.category === "hydration" && <Droplets className="h-5 w-5" />}
                      {topic.category === "trauma" && <AlertOctagon className="h-5 w-5" />}
                      {topic.category === "heat" && <SunMedium className="h-5 w-5" />}
                      {topic.category === "pediatric" && <HeartPulse className="h-5 w-5" />}
                      {topic.category === "respiratory" && <Activity className="h-5 w-5" />}
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-foreground">{topic.title}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">{topic.shortDesc}</p>
                    </div>
                  </div>

                  {/* Do's Section */}
                  <div className="mt-4 rounded-lg bg-emerald-50/70 p-3.5 dark:bg-emerald-950/40">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      Key Steps & Do's
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs text-foreground leading-relaxed">
                      {topic.dos.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Don'ts Section */}
                  {topic.donts && (
                    <div className="mt-2.5 rounded-lg bg-rose-50/70 p-3.5 dark:bg-rose-950/40">
                      <p className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                        Never Do These (Dangers)
                      </p>
                      <ul className="mt-2 space-y-1.5 text-xs text-foreground leading-relaxed">
                        {topic.donts.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <X className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warning Note */}
                  <div className="mt-3 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                    ⚠️ {topic.warningNote}
                  </div>
                </Card>
              ))}
            </div>
          </main>
        )}

        {/* SCREEN 5: HEALTH HISTORY */}
        {screen === "history" && (
          <main className="px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-foreground">{t.history}</h1>
                <p className="text-xs text-muted-foreground mt-0.5">{t.privateDevice}</p>
              </div>
              <History className="h-7 w-7 text-primary" />
            </div>

            {history.length === 0 ? (
              <Card className="mt-6 p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-foreground">{t.noHistoryTitle}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{t.noHistoryDesc}</p>
                <Button className="mt-5 font-bold" onClick={beginCheck}>
                  {t.checkSymptoms}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Card>
            ) : (
              <div className="mt-5 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-muted-foreground px-1">
                  <span>{history.length} saved checks</span>
                  <button
                    onClick={() => {
                      clearHealthData();
                      setHistory([]);
                      showToast(t.dataCleared);
                    }}
                    className="text-destructive hover:underline"
                  >
                    {t.clearHistory}
                  </button>
                </div>

                {history.map((entry) => {
                  const isUrgent = entry.result.level === "urgent";
                  const isMod = entry.result.level === "moderate";
                  return (
                    <Card key={entry.id} className="p-4 shadow-xs">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            {new Date(entry.createdAt).toLocaleDateString(undefined, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="mt-1 font-extrabold text-sm text-foreground">
                            {entry.answers.symptoms
                              .slice(0, 3)
                              .map((id) => getSymptomLabel(id, settings.language))
                              .join(", ")}
                            {entry.answers.symptoms.length > 3 &&
                              ` +${entry.answers.symptoms.length - 3} more`}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-black ${
                                isUrgent
                                  ? "bg-destructive/15 text-destructive"
                                  : isMod
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              }`}
                            >
                              {entry.result.level.toUpperCase()}
                            </span>
                            <button
                              onClick={() => setSelectedHistoryEntry(entry)}
                              className="text-xs font-bold text-primary hover:underline"
                            >
                              {t.viewDetails} →
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const updated = deleteHistoryEntry(entry.id);
                            setHistory(updated);
                            showToast("Check removed.");
                          }}
                          className="p-1 text-muted-foreground hover:text-destructive"
                          aria-label={t.deleteEntry}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* History Detail Modal */}
            {selectedHistoryEntry && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                <Card className="max-h-[85vh] w-full max-w-lg overflow-y-auto p-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h2 className="text-lg font-black text-foreground">Saved Triage Record</h2>
                    <button
                      onClick={() => setSelectedHistoryEntry(null)}
                      className="rounded-lg p-1 text-muted-foreground hover:bg-secondary"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase">
                        Date:
                      </span>
                      <p className="font-semibold">
                        {new Date(selectedHistoryEntry.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase">
                        Assessed Care Level:
                      </span>
                      <p className="text-base font-extrabold text-foreground mt-0.5">
                        {selectedHistoryEntry.result.title}
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <span className="text-xs font-bold text-primary uppercase">
                        Recommended Action:
                      </span>
                      <p className="mt-1 text-xs leading-relaxed text-foreground">
                        {selectedHistoryEntry.result.nextStep}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase">
                        Symptoms Checked:
                      </span>
                      <p className="text-xs font-medium text-foreground mt-1">
                        {selectedHistoryEntry.answers.symptoms
                          .map((id) => getSymptomLabel(id, settings.language))
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="mt-6 w-full font-bold"
                    onClick={() => setSelectedHistoryEntry(null)}
                  >
                    Close
                  </Button>
                </Card>
              </div>
            )}
          </main>
        )}

        {/* SCREEN 6: SETTINGS & ACCESSIBILITY */}
        {screen === "settings" && (
          <main className="px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-foreground">{t.settingsTitle}</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Customize for low-light, reading comfort, and emergency
                </p>
              </div>
              <Settings className="h-7 w-7 text-primary" />
            </div>

            <div className="mt-6 space-y-4">
              {/* Language Selection */}
              <Card className="p-5">
                <div className="flex items-start gap-3">
                  <Languages className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-extrabold text-sm">{t.languageLabel}</p>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        updateSettings({
                          ...settings,
                          language: e.target.value as SupportedLanguage,
                        })
                      }
                      className="mt-3 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm font-bold shadow-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="en">English</option>
                      <option value="hi">हिन्दी (Hindi)</option>
                      <option value="es">Español (Spanish)</option>
                      <option value="ta">தமிழ் (Tamil)</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Text Sizing */}
              <Card className="p-5">
                <p className="font-extrabold text-sm">{t.textSizeLabel}</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: "standard", label: t.textSizeStandard },
                      { id: "large", label: t.textSizeLarge },
                      { id: "xlarge", label: t.textSizeXLarge },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateSettings({ ...settings, textSize: s.id })}
                      className={`h-12 rounded-xl border text-xs font-bold transition-all ${
                        settings.textSize === s.id
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-border bg-card hover:bg-secondary/50"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </Card>

              {/* High Contrast Mode */}
              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-sm">{t.contrastLabel}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Sharp borders and deep contrast for bright sunlight
                    </p>
                  </div>
                  <Button
                    variant={settings.highContrast ? "default" : "outline"}
                    size="sm"
                    className="font-bold"
                    onClick={() =>
                      updateSettings({
                        ...settings,
                        highContrast: !settings.highContrast,
                      })
                    }
                  >
                    {settings.highContrast && <Check className="mr-1 h-4 w-4" />}
                    {settings.highContrast ? "ON" : "OFF"}
                  </Button>
                </div>
              </Card>

              {/* Emergency Hotline Config */}
              <Card className="p-5">
                <div className="flex items-start gap-3">
                  <PhoneCall className="mt-0.5 h-5 w-5 text-destructive" />
                  <div className="flex-1">
                    <p className="font-extrabold text-sm">{t.emergencyNumberLabel}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Default is 108 (Ambulance). You can set your local PHC or ambulance number.
                    </p>
                    <input
                      type="tel"
                      value={settings.emergencyPhone}
                      onChange={(e) =>
                        updateSettings({ ...settings, emergencyPhone: e.target.value })
                      }
                      className="mt-3 h-11 w-full rounded-xl border border-input bg-card px-3 font-bold text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </Card>

              {/* Data & Privacy */}
              <Card className="border-destructive/30 p-5">
                <div className="flex items-start gap-3">
                  <Trash2 className="mt-0.5 h-5 w-5 text-destructive" />
                  <div className="flex-1">
                    <p className="font-extrabold text-sm text-destructive">{t.clearAllData}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Erase all saved evaluations and reset application preferences.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-destructive/40 text-destructive hover:bg-destructive/10 font-bold"
                      onClick={() => {
                        if (window.confirm(t.clearDataConfirm)) {
                          clearHealthData();
                          setHistory([]);
                          setSettings(defaultSettings);
                          showToast(t.dataCleared);
                        }
                      }}
                    >
                      {t.clearAllData}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </main>
        )}

        {/* BOTTOM NAVIGATION BAR */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 px-3 py-2 backdrop-blur-md sm:sticky sm:bottom-0">
          <div className="mx-auto flex max-w-2xl justify-around gap-1">
            {[
              { id: "welcome", label: t.home, icon: <Home className="h-5 w-5" /> },
              { id: "firstaid", label: t.firstAid, icon: <BookOpen className="h-5 w-5" /> },
              { id: "history", label: t.history, icon: <History className="h-5 w-5" /> },
              { id: "settings", label: t.settings, icon: <Settings className="h-5 w-5" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "welcome" && screen === "check" && !result) {
                    if (window.confirm("Leave symptom check in progress?")) setScreen("welcome");
                  } else {
                    setScreen(item.id as Screen);
                  }
                }}
                className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-extrabold transition-colors ${
                  screen === item.id
                    ? "bg-secondary text-primary font-black"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* HOW IT WORKS MODAL */}
      {showHow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <Card className="w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-primary">
                  Safe & 100% Offline
                </p>
                <h2 className="mt-1 text-2xl font-black text-foreground">
                  How ArogyaCare Works
                </h2>
              </div>
              <button
                onClick={() => setShowHow(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  num: "1",
                  title: "Select Felt Symptoms",
                  desc: "Choose common symptoms or rural hazards like snakebites or heat illness.",
                },
                {
                  num: "2",
                  title: "Clinical Rule Triage",
                  desc: "Our offline engine categorizes risk into 🟢 Low, 🟡 Moderate, or 🔴 Urgent concern.",
                },
                {
                  num: "3",
                  title: "Actionable Care & Voice Guidance",
                  desc: "Get homemade hydration recipes (ORS), home comfort steps, or 1-tap 108 emergency dialer.",
                },
                {
                  num: "4",
                  title: "Stored Only on Your Phone",
                  desc: "Zero tracking, zero cloud login, zero data consumption.",
                },
              ].map((stepItem) => (
                <div key={stepItem.num} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground shadow-xs">
                    {stepItem.num}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{stepItem.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs text-destructive leading-relaxed">
              <strong>Emergency Notice:</strong> If someone collapses, has severe chest pain,
              uncontrolled bleeding, or stops breathing, call 108 immediately.
            </div>

            <Button className="mt-6 w-full font-bold h-12" onClick={() => setShowHow(false)}>
              Understood
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}

// SUBCOMPONENT: RESULT VIEW
function ResultScreen({
  result,
  answers,
  t,
  lang,
  emergencyPhone,
  isPlayingAudio,
  onToggleSpeech,
  onAgain,
  onHome,
  onShowToast,
}: {
  result: TriageResult;
  answers: TriageAnswers;
  t: typeof translations.en;
  lang: SupportedLanguage;
  emergencyPhone: string;
  isPlayingAudio: boolean;
  onToggleSpeech: (text: string) => void;
  onAgain: () => void;
  onHome: () => void;
  onShowToast: (msg: string) => void;
}) {
  const isUrgent = result.level === "urgent";
  const isMod = result.level === "moderate";

  // Prepare full speech text
  const speechScript = `${result.title}. ${result.summary}. Recommended Action: ${result.nextStep}.`;

  // Summary exporter
  const handleExport = () => {
    const text = `--- ArogyaCare Triage Summary ---\nDate: ${new Date().toLocaleString()}\nLevel: ${
      result.title
    }\nSymptoms: ${answers.symptoms
      .map((id) => getSymptomLabel(id, lang))
      .join(", ")}\nDuration: ${answers.duration}\nSeverity: ${
      answers.severity
    }\nAction Recommended: ${result.nextStep}\n\nDisclaimer: Triage guidance only, not a medical prescription.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      onShowToast(t.summaryCopied);
    } else {
      alert(text);
    }
  };

  return (
    <div className="space-y-4">
      {/* Triage Status Banner Card */}
      <div
        className={`rounded-2xl border-2 p-6 shadow-md transition-all ${
          isUrgent
            ? "border-destructive bg-destructive/10"
            : isMod
            ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40"
            : "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
        }`}
      >
        <div className="flex items-start gap-4">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-black shadow-sm ${
              isUrgent
                ? "bg-destructive text-destructive-foreground pulse-emergency"
                : isMod
                ? "bg-amber-500 text-white"
                : "bg-emerald-600 text-white"
            }`}
          >
            {isUrgent ? "!" : isMod ? "⚠️" : "✓"}
          </span>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                {t.careLevel}
              </p>
              {/* Text-To-Speech Audio Button */}
              <button
                onClick={() => onToggleSpeech(speechScript)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-xs ${
                  isPlayingAudio
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                title="Read result aloud in your language"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5" />
                    <span>{t.stopReading}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>{t.readAloud}</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="mt-1 text-2xl font-black text-foreground">{result.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Emergency Red Action if Urgent */}
      {isUrgent && (
        <div className="rounded-2xl border-2 border-destructive bg-destructive p-5 text-destructive-foreground shadow-lg">
          <div className="flex items-center gap-3">
            <PhoneCall className="h-6 w-6 shrink-0" />
            <div>
              <p className="text-sm font-black uppercase tracking-wide">
                Immediate Action Required
              </p>
              <p className="text-xs mt-0.5">
                Do not wait. Transport patient to the nearest hospital immediately.
              </p>
            </div>
          </div>
          <a
            href={`tel:${emergencyPhone}`}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-black text-destructive shadow-md hover:bg-slate-100"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Call Ambulance ({emergencyPhone})</span>
          </a>
        </div>
      )}

      {/* Recommended Action Card */}
      <Card className="p-5 shadow-xs">
        <p className="text-xs font-black uppercase tracking-wider text-primary">
          {t.recommendedAction}
        </p>
        <p className="mt-2 text-base font-extrabold leading-snug text-foreground">
          {result.nextStep}
        </p>
      </Card>

      {/* Supportive Home Care Card */}
      <Card className="p-5 shadow-xs">
        <h2 className="text-sm font-extrabold text-foreground flex items-center gap-2">
          <HeartPulse className="h-4 w-4 text-emerald-600" />
          {t.homeCareHeading}
        </h2>
        <ul className="mt-3 space-y-2 text-xs text-foreground/90 leading-relaxed">
          {result.homeCareSteps.map((step, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="font-bold text-emerald-600">•</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Red-Flag Signs to Watch */}
      <Card className="p-5 shadow-xs">
        <h2 className="text-sm font-extrabold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          {t.warningSignsHeading}
        </h2>
        <ul className="mt-3 space-y-2 text-xs text-foreground/90 leading-relaxed">
          {result.warnings.map((warn, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="font-bold text-destructive">⚠️</span>
              <span>{warn}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Action CTAs */}
      <div className="pt-2 flex flex-col gap-2.5 sm:flex-row">
        <Button size="lg" className="h-13 flex-1 font-extrabold" onClick={onAgain}>
          <RotateCcw className="mr-2 h-4 w-4" />
          {t.checkAgain}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-13 flex-1 font-bold"
          onClick={handleExport}
        >
          <Share2 className="mr-2 h-4 w-4" />
          {t.exportSummary}
        </Button>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={onHome}
          className="text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          ← Return to Home Screen
        </button>
      </div>
    </div>
  );
}