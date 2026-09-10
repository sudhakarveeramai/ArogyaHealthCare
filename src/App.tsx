import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { assessSymptoms, ageOptions, durationOptions, getSymptomLabel, riskOptions, severityOptions, symptoms, type TriageAnswers, type TriageResult } from "@/lib/triage";
import { clearHealthData, defaultSettings, deleteHistoryEntry, loadHistory, loadSettings, saveHistoryEntry, saveSettings, type HealthSettings } from "@/lib/healthStorage";
import type { HistoryEntry } from "@/lib/triage";
import { registerAppShell } from "@/lib/pwa";
import welcomeImage from "@/assets/health-welcome.png";
import { AlertTriangle, ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, CircleHelp, Clock3, CloudOff, HeartPulse, History, Home, Info, Languages, Menu, PhoneCall, RotateCcw, Settings, ShieldCheck, Trash2, Wifi, X } from "lucide-react";

type Screen = "welcome" | "check" | "history" | "settings";
type Step = 0 | 1 | 2 | 3 | 4;

const emptyAnswers: TriageAnswers = { symptoms: [], duration: "today", severity: "mild", ageGroup: "adult", riskContext: [] };

const copy = {
  en: {
    appName: "RuralCare",
    tagline: "A calm first step when care is far away.",
    check: "Check symptoms",
    history: "Health history",
    settings: "Settings",
  },
  hi: {
    appName: "RuralCare",
    tagline: "जब इलाज दूर हो, एक आसान पहला कदम।",
    check: "लक्षण जाँचें",
    history: "स्वास्थ्य इतिहास",
    settings: "सेटिंग्स",
  },
};

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<TriageAnswers>(emptyAnswers);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [settings, setSettings] = useState<HealthSettings>(defaultSettings);
  const [isOnline, setIsOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
  const [showHow, setShowHow] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
    setSettings(loadSettings());
    void registerAppShell();
    const updateConnection = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);
    return () => {
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
    };
  }, []);

  const strings = copy[settings.language];

  const beginCheck = () => {
    setAnswers(emptyAnswers);
    setResult(null);
    setStep(0);
    setScreen("check");
  };

  const finishCheck = () => {
    const nextResult = assessSymptoms(answers);
    const entry: HistoryEntry = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), answers, result: nextResult };
    setResult(nextResult);
    setHistory(saveHistoryEntry(entry));
  };

  const updateSettings = (next: HealthSettings) => {
    setSettings(next);
    saveSettings(next);
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${settings.textSize === "large" ? "text-lg" : ""} ${settings.highContrast ? "contrast-125" : ""}`}>
      <div className="mx-auto min-h-screen max-w-3xl bg-background pb-24 shadow-sm">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
            <button aria-label="Open home" onClick={() => setScreen("welcome")} className="flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><HeartPulse className="h-5 w-5" /></span>
              <span><span className="block text-sm font-bold leading-none">{strings.appName}</span><span className="block text-[11px] text-muted-foreground">Offline health guide</span></span>
            </button>
            <OfflineBadge isOnline={isOnline} />
          </div>
        </header>

        {screen === "welcome" && <Welcome strings={strings} onCheck={beginCheck} onHow={() => setShowHow(true)} />}
        {screen === "check" && (
          result ? <ResultView result={result} onAgain={beginCheck} onHome={() => setScreen("welcome")} /> : <Checker step={step} answers={answers} setAnswers={setAnswers} onBack={() => step === 0 ? setScreen("welcome") : setStep((step - 1) as Step)} onNext={() => step === 4 ? finishCheck() : setStep((step + 1) as Step)} />
        )}
        {screen === "history" && <HistoryView history={history} onDelete={(id) => setHistory(deleteHistoryEntry(id))} onStart={beginCheck} />}
        {screen === "settings" && <SettingsView settings={settings} onUpdate={updateSettings} onClear={() => { clearHealthData(); setHistory([]); setSettings(defaultSettings); }} />}

        {screen !== "welcome" && <BottomNav screen={screen} setScreen={setScreen} labels={strings} />}
      </div>

      {showHow && <HowItWorks onClose={() => setShowHow(false)} />}
    </div>
  );
}

function OfflineBadge({ isOnline }: { isOnline: boolean }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${isOnline ? "border-primary/25 bg-primary/10 text-primary" : "border-accent/35 bg-accent/10 text-accent-foreground"}`}><span className={`h-1.5 w-1.5 rounded-full ${isOnline ? "bg-primary" : "bg-accent"}`} />{isOnline ? <><Wifi className="h-3.5 w-3.5" />Online</> : <><CloudOff className="h-3.5 w-3.5" />Offline mode</>}</span>;
}

function Welcome({ strings, onCheck, onHow }: { strings: typeof copy.en; onCheck: () => void; onHow: () => void }) {
  return <main className="px-4 pb-10 pt-5 sm:px-6">
    <div className="mx-auto max-w-2xl">
      <section className="grid items-center gap-6 py-2 sm:grid-cols-[1.05fr_.95fr] sm:gap-8 sm:py-8">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary"><ShieldCheck className="h-4 w-4" />Private by design</p>
          <h1 className="max-w-md text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">A safer next step for your health.</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">RuralCare helps you understand how urgently to seek care. It works offline and never replaces a qualified health professional.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button size="lg" className="h-12 justify-between px-5" onClick={onCheck}>{strings.check}<ArrowRight className="h-5 w-5" /></Button><Button size="lg" variant="outline" className="h-12" onClick={onHow}><CircleHelp className="h-5 w-5" />How it works</Button></div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/50 p-3 sm:p-4"><img src={welcomeImage} alt="A community health worker listening to a patient" width={768} height={768} className="aspect-square w-full object-cover" /></div>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <InfoTile icon={<CloudOff />} title="Works offline" detail="Your check can continue without internet." />
        <InfoTile icon={<ShieldCheck />} title="Private" detail="Your history stays on this device." />
        <InfoTile icon={<HeartPulse />} title="Safety first" detail="Warning signs are always highlighted." />
      </section>
      <div className="mt-7 border-t border-border pt-5 text-center text-xs leading-5 text-muted-foreground">For health guidance only. Not a diagnosis, prescription, or replacement for medical care.</div>
    </div>
  </main>;
}

function InfoTile({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return <div className="border border-border bg-card p-4"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">{icon}</div><p className="font-bold">{title}</p><p className="mt-1 text-sm leading-5 text-muted-foreground">{detail}</p></div>;
}

function HowItWorks({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-3 sm:items-center"><Card className="w-full max-w-lg p-6 shadow-xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Simple and local</p><h2 className="mt-1 text-2xl font-bold">How RuralCare works</h2></div><Button variant="ghost" size="icon" aria-label="Close" onClick={onClose}><X /></Button></div><div className="mt-5 space-y-4">{[["1", "Answer a few questions", "Choose what feels closest. You can go back at any time."], ["2", "Get a care level", "See whether to monitor, contact a health worker, or seek urgent help."], ["3", "Choose your next step", "Your answers and history stay only on this device."]].map(([number, title, detail]) => <div key={number} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{number}</span><div><p className="font-bold">{title}</p><p className="text-sm leading-5 text-muted-foreground">{detail}</p></div></div>)}</div><div className="mt-6 border-l-4 border-accent bg-accent/10 p-3 text-sm leading-5">If someone has trouble breathing, chest pain, confusion, fainting, or heavy bleeding, seek immediate medical help.</div><Button className="mt-6 w-full" onClick={onClose}>Got it</Button></Card></div>;
}

function Checker({ step, answers, setAnswers, onBack, onNext }: { step: Step; answers: TriageAnswers; setAnswers: (answers: TriageAnswers) => void; onBack: () => void; onNext: () => void }) {
  const titles = ["What are you feeling?", "How long has this been happening?", "How strong are your symptoms?", "Who is this check for?", "Is there anything else to know?"];
  const canContinue = step === 0 ? answers.symptoms.length > 0 : true;
  const toggle = (field: "symptoms" | "riskContext", value: string) => setAnswers({ ...answers, [field]: answers[field].includes(value) ? answers[field].filter((item) => item !== value) : [...answers[field], value] });
  return <main className="px-4 pb-10 pt-5 sm:px-6"><div className="mx-auto max-w-2xl"><div className="mb-7 flex items-center justify-between"><div><p className="text-sm font-bold text-primary">Symptom check</p><h1 className="mt-1 text-3xl font-bold tracking-tight">{titles[step]}</h1></div><span className="text-sm font-bold text-muted-foreground">{step + 1} of 5</span></div><div className="mb-8 flex gap-1.5" aria-label={`Step ${step + 1} of 5`}>{titles.map((_, index) => <div key={index} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-primary" : "bg-border"}`} />)}</div>
    {step === 0 && <QuestionCard label="Select all that apply" detail="You can choose more than one."><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{symptoms.map((symptom) => <ChoiceButton key={symptom.id} selected={answers.symptoms.includes(symptom.id)} onClick={() => toggle("symptoms", symptom.id)}>{symptom.icon} {symptom.label}</ChoiceButton>)}</div></QuestionCard>}
    {step === 1 && <QuestionCard label="When did it start?"><div className="space-y-2">{durationOptions.map((option) => <ChoiceButton key={option.id} selected={answers.duration === option.id} onClick={() => setAnswers({ ...answers, duration: option.id })}>{option.label}</ChoiceButton>)}</div></QuestionCard>}
    {step === 2 && <QuestionCard label="Choose the closest match"><div className="space-y-2">{severityOptions.map((option) => <ChoiceButton key={option.id} selected={answers.severity === option.id} onClick={() => setAnswers({ ...answers, severity: option.id })}><span><span className="block text-left">{option.label}</span><span className="block text-left text-xs font-normal text-muted-foreground">{option.detail}</span></span></ChoiceButton>)}</div></QuestionCard>}
    {step === 3 && <QuestionCard label="Age helps us make safer suggestions"><div className="space-y-2">{ageOptions.map((option) => <ChoiceButton key={option.id} selected={answers.ageGroup === option.id} onClick={() => setAnswers({ ...answers, ageGroup: option.id })}>{option.label}</ChoiceButton>)}</div></QuestionCard>}
    {step === 4 && <QuestionCard label="Select anything that applies" detail="You may leave this blank."><div className="space-y-2">{riskOptions.map((option) => <ChoiceButton key={option} selected={answers.riskContext.includes(option)} onClick={() => toggle("riskContext", option)}>{option}</ChoiceButton>)}</div></QuestionCard>}
    <div className="mt-7 flex items-center justify-between gap-3"><Button variant="outline" size="lg" onClick={onBack}><ArrowLeft />Back</Button><Button size="lg" className="min-w-32" disabled={!canContinue} onClick={onNext}>{step === 4 ? "See result" : "Continue"}<ArrowRight /></Button></div><p className="mt-6 text-center text-xs leading-5 text-muted-foreground">If you already feel unsafe or seriously unwell, do not wait for this check. Seek immediate medical care.</p>
  </div></main>;
}

function QuestionCard({ label, detail, children }: { label: string; detail?: string; children: React.ReactNode }) { return <Card className="p-4 sm:p-6"><p className="font-bold">{label}</p>{detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}<div className="mt-5">{children}</div></Card>; }

function ChoiceButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) { return <Button type="button" variant={selected ? "default" : "outline"} className={`min-h-12 w-full justify-start whitespace-normal px-4 text-left ${selected ? "ring-2 ring-primary/25" : "bg-background"}`} onClick={onClick}>{selected ? <Check className="shrink-0" /> : <span className="h-4 w-4 shrink-0 rounded-full border border-input" />}{children}</Button>; }

function ResultView({ result, onAgain, onHome }: { result: TriageResult; onAgain: () => void; onHome: () => void }) {
  const urgent = result.level === "urgent";
  const moderate = result.level === "moderate";
  return <main className="px-4 pb-10 pt-5 sm:px-6"><div className="mx-auto max-w-2xl"><div className={`border p-5 sm:p-7 ${urgent ? "border-destructive/40 bg-destructive/10" : moderate ? "border-accent/40 bg-accent/10" : "border-primary/30 bg-primary/10"}`}><div className="flex items-start gap-4"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl ${urgent ? "bg-destructive text-destructive-foreground" : moderate ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>{urgent ? "!" : moderate ? "~" : "✓"}</span><div><p className="text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground">Your care level</p><h1 className="mt-1 text-3xl font-bold">{result.title}</h1><p className="mt-3 leading-6">{result.summary}</p></div></div></div>{urgent && <div className="mt-4 border-2 border-destructive bg-destructive p-5 text-destructive-foreground"><div className="flex gap-3"><AlertTriangle className="mt-0.5 h-6 w-6 shrink-0" /><div><h2 className="text-lg font-bold">Please seek immediate care</h2><p className="mt-1 text-sm leading-5">Call your local emergency service or go to the nearest health facility now. Do not wait for this app to tell you what is wrong.</p><Button variant="secondary" className="mt-4" asChild><a href="tel:112"><PhoneCall />Call emergency services</a></Button></div></div></div>}<Card className="mt-5 p-5"><p className="text-sm font-bold uppercase tracking-[0.1em] text-primary">Recommended next step</p><p className="mt-2 text-lg font-semibold leading-7">{result.nextStep}</p></Card><Card className="mt-4 p-5"><h2 className="flex items-center gap-2 font-bold"><AlertTriangle className="h-5 w-5 text-accent" />Watch for these warning signs</h2><ul className="mt-4 space-y-3">{result.warnings.map((warning) => <li key={warning} className="flex gap-2 text-sm leading-5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{warning}</li>)}</ul></Card><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Button size="lg" onClick={onAgain}><RotateCcw />Check again</Button><Button size="lg" variant="outline" onClick={onHome}><Home />Back to home</Button></div><p className="mt-6 text-center text-xs leading-5 text-muted-foreground">RuralCare offers triage support only. It cannot diagnose illness or replace a qualified healthcare professional.</p></div></main>;
}

function HistoryView({ history, onDelete, onStart }: { history: HistoryEntry[]; onDelete: (id: string) => void; onStart: () => void }) {
  return <main className="px-4 pb-10 pt-5 sm:px-6"><div className="mx-auto max-w-2xl"><div className="flex items-end justify-between"><div><p className="text-sm font-bold text-primary">Private on this device</p><h1 className="mt-1 text-3xl font-bold">Health history</h1></div><History className="h-8 w-8 text-primary" /></div><p className="mt-3 text-sm leading-6 text-muted-foreground">Your previous checks are saved locally so you can notice changes over time. No account is needed.</p>{history.length === 0 ? <Card className="mt-7 p-8 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary"><BookOpen /></div><h2 className="mt-4 text-xl font-bold">No checks yet</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-muted-foreground">Your saved symptom checks will appear here on this device.</p><Button className="mt-5" onClick={onStart}>Start a check <ArrowRight /></Button></Card> : <div className="mt-7 space-y-3">{history.map((entry) => <Card key={entry.id} className="p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">{new Date(entry.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</p><p className="mt-2 font-bold">{entry.answers.symptoms.slice(0, 3).map(getSymptomLabel).join(", ")}{entry.answers.symptoms.length > 3 ? ` +${entry.answers.symptoms.length - 3}` : ""}</p><span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${entry.result.level === "urgent" ? "bg-destructive/15 text-destructive" : entry.result.level === "moderate" ? "bg-accent/20 text-accent-foreground" : "bg-primary/15 text-primary"}`}>{entry.result.title}</span></div><Button variant="ghost" size="icon" aria-label="Delete this check" onClick={() => onDelete(entry.id)}><Trash2 className="h-4 w-4 text-muted-foreground" /></Button></div></Card>)}</div>}</div></main>;
}

function SettingsView({ settings, onUpdate, onClear }: { settings: HealthSettings; onUpdate: (settings: HealthSettings) => void; onClear: () => void }) {
  return <main className="px-4 pb-10 pt-5 sm:px-6"><div className="mx-auto max-w-2xl"><p className="text-sm font-bold text-primary">Make it easier to use</p><h1 className="mt-1 text-3xl font-bold">Settings</h1><div className="mt-7 space-y-4"><Card className="p-5"><div className="flex items-start gap-3"><Languages className="mt-1 h-5 w-5 text-primary" /><div className="min-w-0 flex-1"><p className="font-bold">Language</p><p className="mt-1 text-sm text-muted-foreground">Choose the language for key app labels.</p><select value={settings.language} onChange={(event) => onUpdate({ ...settings, language: event.target.value as HealthSettings["language"] })} className="mt-4 h-11 w-full rounded-md border border-input bg-background px-3 text-base"><option value="en">English</option><option value="hi">हिन्दी</option></select></div></div></Card><Card className="p-5"><div className="flex items-start gap-3"><Menu className="mt-1 h-5 w-5 text-primary" /><div className="min-w-0 flex-1"><p className="font-bold">Reading comfort</p><p className="mt-1 text-sm text-muted-foreground">Make text larger or increase contrast.</p><div className="mt-4 grid gap-2 sm:grid-cols-2"><Button variant={settings.textSize === "standard" ? "default" : "outline"} onClick={() => onUpdate({ ...settings, textSize: "standard" })}>Standard text</Button><Button variant={settings.textSize === "large" ? "default" : "outline"} onClick={() => onUpdate({ ...settings, textSize: "large" })}>Large text</Button></div><Button variant={settings.highContrast ? "default" : "outline"} className="mt-2 w-full" onClick={() => onUpdate({ ...settings, highContrast: !settings.highContrast })}>{settings.highContrast && <Check />} High contrast {settings.highContrast ? "on" : "off"}</Button></div></div></Card><Card className="p-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-5 w-5 text-primary" /><div><p className="font-bold">Privacy and safety</p><p className="mt-1 text-sm leading-5 text-muted-foreground">RuralCare saves symptom checks only in this browser. It does not diagnose conditions, store an account, or replace a health professional.</p></div></div></Card><Card className="border-destructive/30 p-5"><div className="flex items-start gap-3"><Trash2 className="mt-1 h-5 w-5 text-destructive" /><div className="flex-1"><p className="font-bold">Clear local data</p><p className="mt-1 text-sm text-muted-foreground">Delete all saved checks and return preferences to their defaults.</p><Button variant="outline" className="mt-4 border-destructive/40 text-destructive hover:bg-destructive/10" onClick={onClear}>Clear history and settings</Button></div></div></Card></div></div></main>;
}

function BottomNav({ screen, setScreen, labels }: { screen: Screen; setScreen: (screen: Screen) => void; labels: typeof copy.en }) {
  const items: Array<{ screen: Screen; label: string; icon: React.ReactNode }> = [{ screen: "welcome", label: labels.check, icon: <Home /> }, { screen: "history", label: labels.history, icon: <History /> }, { screen: "settings", label: labels.settings, icon: <Settings /> }];
  return <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 px-3 py-2 backdrop-blur sm:absolute sm:left-1/2 sm:w-full sm:max-w-3xl sm:-translate-x-1/2"><div className="mx-auto flex max-w-2xl justify-around gap-2">{items.map((item) => <Button key={item.screen} variant={screen === item.screen ? "secondary" : "ghost"} className="h-14 flex-1 flex-col gap-1 rounded-md text-xs" onClick={() => setScreen(item.screen)}>{item.icon}<span>{item.label}</span></Button>)}</div></nav>;
}

export default App;