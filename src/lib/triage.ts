export type ConcernLevel = "low" | "moderate" | "urgent";

export type Symptom = {
  id: string;
  label: string;
  icon: string;
  dangerous?: boolean;
};

export type TriageAnswers = {
  symptoms: string[];
  duration: "today" | "few-days" | "week-plus";
  severity: "mild" | "moderate" | "severe";
  ageGroup: "child" | "adult" | "older-adult";
  riskContext: string[];
};

export type TriageResult = {
  level: ConcernLevel;
  title: string;
  summary: string;
  nextStep: string;
  warnings: string[];
};

export type HistoryEntry = {
  id: string;
  createdAt: string;
  answers: TriageAnswers;
  result: TriageResult;
};

export const symptoms: Symptom[] = [
  { id: "fever", label: "Fever", icon: "°" },
  { id: "cough", label: "Cough", icon: "⌁" },
  { id: "headache", label: "Headache", icon: "✦" },
  { id: "stomach", label: "Stomach pain", icon: "○" },
  { id: "vomiting", label: "Vomiting", icon: "↗" },
  { id: "diarrhea", label: "Diarrhea", icon: "≋" },
  { id: "rash", label: "Rash", icon: "·" },
  { id: "sore-throat", label: "Sore throat", icon: "◡" },
  { id: "breathing", label: "Trouble breathing", icon: "≈", dangerous: true },
  { id: "chest-pain", label: "Chest pain", icon: "♡", dangerous: true },
  { id: "confusion", label: "Confusion or fainting", icon: "!", dangerous: true },
  { id: "bleeding", label: "Heavy bleeding", icon: "+", dangerous: true },
];

export const riskOptions = [
  "Pregnant or recently gave birth",
  "Very young child",
  "Older adult",
  "Long-term health condition",
  "Recent injury",
];

export const durationOptions: Array<{ id: TriageAnswers["duration"]; label: string }> = [
  { id: "today", label: "Started today" },
  { id: "few-days", label: "1–3 days" },
  { id: "week-plus", label: "More than a week" },
];

export const severityOptions: Array<{ id: TriageAnswers["severity"]; label: string; detail: string }> = [
  { id: "mild", label: "Mild", detail: "I can do most normal activities" },
  { id: "moderate", label: "Moderate", detail: "It is making normal activities harder" },
  { id: "severe", label: "Severe", detail: "It is very hard to cope or function" },
];

export const ageOptions: Array<{ id: TriageAnswers["ageGroup"]; label: string }> = [
  { id: "child", label: "Child (under 12)" },
  { id: "adult", label: "Adult (12–64)" },
  { id: "older-adult", label: "Older adult (65+)" },
];

export function assessSymptoms(answers: TriageAnswers): TriageResult {
  const dangerousSymptom = answers.symptoms.some((id) => symptoms.find((symptom) => symptom.id === id)?.dangerous);
  const highRiskContext = answers.riskContext.length > 0 && answers.severity !== "mild";
  const persistentOrSevere = answers.severity === "severe" || answers.duration === "week-plus";

  if (dangerousSymptom || answers.severity === "severe" && answers.symptoms.length > 0) {
    return {
      level: "urgent",
      title: "Urgent concern",
      summary: "Some answers suggest you should get urgent medical help. This tool cannot diagnose the cause.",
      nextStep: "Seek immediate care from a qualified health professional or local emergency service now.",
      warnings: [
        "Do not stay alone if you feel faint, confused, or unsafe.",
        "If symptoms get worse, seek emergency help immediately.",
        "Take any medicines and health information with you if it is safe to do so.",
      ],
    };
  }

  if (highRiskContext || persistentOrSevere || answers.symptoms.length >= 3) {
    return {
      level: "moderate",
      title: "Moderate concern",
      summary: "Your answers suggest it would be wise to speak with a healthcare professional soon.",
      nextStep: "Contact or visit a health worker within 24 hours, sooner if you feel worse.",
      warnings: [
        "Drink safe fluids and rest if you can.",
        "Watch for trouble breathing, severe pain, confusion, fainting, or heavy bleeding.",
        "Do not delay care if a child, pregnant person, or older adult becomes worse.",
      ],
    };
  }

  return {
    level: "low",
    title: "Low concern",
    summary: "Your answers do not show an urgent warning sign right now. Keep monitoring how you feel.",
    nextStep: "Rest, drink safe fluids, and check your symptoms again if they continue or change.",
    warnings: [
      "Get medical advice if symptoms last longer than expected or get worse.",
      "Seek urgent care for trouble breathing, severe pain, confusion, fainting, or heavy bleeding.",
      "This result is not a diagnosis and cannot rule out serious illness.",
    ],
  };
}

export function getSymptomLabel(id: string) {
  return symptoms.find((symptom) => symptom.id === id)?.label ?? id;
}