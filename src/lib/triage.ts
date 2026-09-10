export type ConcernLevel = "low" | "moderate" | "urgent";

export type SymptomCategory = "fever" | "breathing" | "stomach" | "nerves" | "bites" | "general";

export interface Symptom {
  id: string;
  label: string;
  category: SymptomCategory;
  dangerous?: boolean;
  ruralRelevance?: string;
  hindiLabel?: string;
  spanishLabel?: string;
  tamilLabel?: string;
}

export interface TriageAnswers {
  symptoms: string[];
  duration: "today" | "few-days" | "week-plus" | "sudden";
  severity: "mild" | "moderate" | "severe" | "incapacitated";
  ageGroup: "infant" | "child" | "adult" | "older-adult";
  riskContext: string[];
}

export interface TriageResult {
  level: ConcernLevel;
  title: string;
  summary: string;
  nextStep: string;
  homeCareSteps: string[];
  warnings: string[];
  dangerDetected: boolean;
  primarySymptomsFound: string[];
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  answers: TriageAnswers;
  result: TriageResult;
}

export const symptomsList: Symptom[] = [
  // Respiratory & Cardiac (High risk)
  { id: "breathing", label: "Trouble breathing / Gasping", category: "breathing", dangerous: true, hindiLabel: "सांस लेने में भारी तकलीफ / हांफना", spanishLabel: "Dificultad para respirar / ahogo", tamilLabel: "மூச்சுத்திணறல் / திண்டாட்டம்" },
  { id: "chest-pain", label: "Chest pain / Heavy pressure", category: "breathing", dangerous: true, hindiLabel: "छाती में तेज दर्द या भारी दबाव", spanishLabel: "Dolor u opresión en el pecho", tamilLabel: "மார்பு வலி / மார்பில் அழுத்தம்" },
  { id: "cough", label: "Cough (Mild / Moderate)", category: "breathing", dangerous: false, hindiLabel: "खाँसी (सामान्य)", spanishLabel: "Tos (leve a moderada)", tamilLabel: "இருமல் (லேசானது)" },
  { id: "cough-blood", label: "Coughing up blood (Hemoptysis)", category: "breathing", dangerous: true, hindiLabel: "खाँसी में खून आना", spanishLabel: "Tos con sangre", tamilLabel: "இருமலில் இரத்தம் வருதல்" },
  { id: "blue-lips", label: "Blue lips or fingernails (Cyanosis)", category: "breathing", dangerous: true, hindiLabel: "होंठ या नाखून नीले पड़ना", spanishLabel: "Labios o uñas azuladas", tamilLabel: "உதடுகள் அல்லது நகங்கள் நீலமாதல்" },

  // Fever & Systemic
  { id: "fever", label: "Fever / Body burning", category: "fever", dangerous: false, hindiLabel: "बुखार / शरीर तपना", spanishLabel: "Fiebre / cuerpo caliente", tamilLabel: "காய்ச்சல் / உடல் சூடு" },
  { id: "chills-rigor", label: "Severe chills / Shivering (Malaria sign)", category: "fever", dangerous: false, hindiLabel: "कांपने वाली भयंकर ठंड लगना", spanishLabel: "Escalofríos intensos / temblores", tamilLabel: "நடுக்கத்துடன் கூடிய குளிர்" },
  { id: "sore-throat", label: "Sore throat / Pain swallowing", category: "fever", dangerous: false, hindiLabel: "गले में खराश या निगलने में दर्द", spanishLabel: "Dolor de garganta al tragar", tamilLabel: "தொண்டை வலி / விழுங்குவதில் வலி" },
  { id: "rash-purple", label: "Rapid purple rash / Red spots", category: "fever", dangerous: true, hindiLabel: "त्वचा पर तेजी से फैलते लाल-बैंगनी चकत्ते", spanishLabel: "Manchas moradas o rojas repentinas", tamilLabel: "உடலில் திடீர் சிவப்பு/ஊதா புள்ளிகள்" },
  { id: "body-ache", label: "Severe bone/joint ache (Breakbone)", category: "fever", dangerous: false, hindiLabel: "हड्डियों व जोड़ों में तेज टूटन", spanishLabel: "Dolores musculares y articulares fuertes", tamilLabel: "மூட்டு மற்றும் உடல் வலி" },

  // Stomach & Gastrointestinal
  { id: "diarrhea-watery", label: "Frequent watery diarrhea", category: "stomach", dangerous: false, hindiLabel: "लगातार पतला पानी जैसा दस्त", spanishLabel: "Diarrea líquida frecuente", tamilLabel: "அடிக்கடி நீர் போன்ற வயிற்றுப்போக்கு" },
  { id: "vomiting-continuous", label: "Continuous vomiting (cannot keep fluid)", category: "stomach", dangerous: true, hindiLabel: "लगातार उल्टियाँ (पानी भी न पचना)", spanishLabel: "Vómitos continuos (no retiene líquidos)", tamilLabel: "தொடர் வாந்தி (நீர் கூட தங்கவில்லை)" },
  { id: "stomach-pain", label: "Stomach ache / Cramps", category: "stomach", dangerous: false, hindiLabel: "पेट दर्द / मरोड़", spanishLabel: "Dolor o cólicos estomacales", tamilLabel: "வயிற்று வலி / பிடிப்பு" },
  { id: "stomach-rigid", label: "Severe rigid, rock-hard abdomen", category: "stomach", dangerous: true, hindiLabel: "पेट का पत्थर जैसा सख्त और असहनीय दर्द", spanishLabel: "Abdomen rígido y dolor intenso", tamilLabel: "வயிறு கல் போல இறுக்கமடைதல்" },
  { id: "bloody-stool", label: "Blood in stool or black tarry stool", category: "stomach", dangerous: true, hindiLabel: "शौच में खून या काला मल", spanishLabel: "Heces con sangre o negras", tamilLabel: "மலத்தில் இரத்தம் அல்லது கருமை" },

  // Neurological & Head
  { id: "headache", label: "Headache (Moderate)", category: "nerves", dangerous: false, hindiLabel: "सिरदर्द (सामान्य)", spanishLabel: "Dolor de cabeza", tamilLabel: "தலைவலி" },
  { id: "confusion", label: "Confusion / Disoriented / Drowsy", category: "nerves", dangerous: true, hindiLabel: "बेहोशी, भ्रम या बात न समझ पाना", spanishLabel: "Confusión / desorientación / somnolencia", tamilLabel: "குழப்பம் / சுயநினைவு மாறுதல்" },
  { id: "stiff-neck", label: "Stiff neck cannot touch chin to chest", category: "nerves", dangerous: true, hindiLabel: "गर्दन की जकड़न (ठोड़ी छाती पर न लगना)", spanishLabel: "Rigidez en el cuello con fiebre", tamilLabel: "கழுத்து விறைப்பு / அசைக்க முடியாமை" },
  { id: "seizure", label: "Seizure / Fits / Convulsions", category: "nerves", dangerous: true, hindiLabel: "दौरे पड़ना / झटका आना", spanishLabel: "Convulsiones o espasmos", tamilLabel: "வலிப்பு / இழுப்பு" },
  { id: "facial-droop", label: "Facial droop / Slurred speech", category: "nerves", dangerous: true, hindiLabel: "चेहरा टेढ़ा होना या बोली लड़खड़ाना", spanishLabel: "Boca torcida o dificultad para hablar", tamilLabel: "முகம் ஒருபுறம் மாறுதல் / குழம்பிய பேச்சு" },

  // Rural Bites & Environmental
  { id: "snake-bite", label: "Snake bite / Fang puncture mark", category: "bites", dangerous: true, hindiLabel: "सांप का काटना या डंक के निशान", spanishLabel: "Mordedura de serpiente", tamilLabel: "பாம்பு கடி / பற்கள் தடம்" },
  { id: "scorpion-bite", label: "Scorpion sting / Insect swelling", category: "bites", dangerous: false, hindiLabel: "बिच्छू का डंक या तेज जलन", spanishLabel: "Picadura de escorpión / ardor", tamilLabel: "தேள் கொட்டுதல் / கடுமையான வலி" },
  { id: "animal-bite", label: "Dog / Monkey / Animal bite or scratch", category: "bites", dangerous: true, hindiLabel: "कुत्ता, बन्दर या जंगली जानवर का काटना", spanishLabel: "Mordedura de perro u otro animal", tamilLabel: "நாய் / குரங்கு அல்லது விலங்கு கடி" },
  { id: "heat-dry", label: "Extremely hot, red skin without sweating", category: "bites", dangerous: true, hindiLabel: "अत्यधिक गर्म लाल त्वचा, पसीना पूरी तरह बंद", spanishLabel: "Piel muy caliente y seca sin sudor", tamilLabel: "வியர்க்காத அதிவெப்ப உடல்" },
  { id: "bleeding", label: "Heavy uncontrolled bleeding", category: "bites", dangerous: true, hindiLabel: "तेजी से बहता हुआ खून", spanishLabel: "Sangrado abundante e incontrolable", tamilLabel: "நிறுத்த முடியாத அதிக இரத்தப்போக்கு" },
];

export const durationOptions = [
  { id: "sudden", label: "Sudden onset (within hours)", hindi: "अचानक कुछ ही घंटों में शुरू हुआ", spanish: "Repentino (pocas horas)", tamil: "திடீரென சில மணிநேரங்களில்" },
  { id: "today", label: "Started today (past 24h)", hindi: "आज शुरू हुआ (पिछले 24 घंटे)", spanish: "Empezó hoy (últimas 24h)", tamil: "இன்று தொடங்கியது (24 மணிநேரம்)" },
  { id: "few-days", label: "2–4 days", hindi: "2 से 4 दिन से", spanish: "De 2 a 4 días", tamil: "2 முதல் 4 நாட்கள்" },
  { id: "week-plus", label: "More than a week", hindi: "एक सप्ताह से अधिक समय से", spanish: "Más de una semana", tamil: "ஒரு வாரத்திற்கு மேல்" },
] as const;

export const severityOptions = [
  { id: "mild", label: "Mild discomfort", detail: "Can carry on regular village/home work", hindi: "हल्की परेशानी", spanish: "Molestia leve", tamil: "லேசான தொந்தரவு" },
  { id: "moderate", label: "Moderate pain/illness", detail: "Struggling to do basic chores or eat well", hindi: "मध्यम तकलीफ - कामकाज में बाधा", spanish: "Moderada - dificulta tareas", tamil: "மிதமான பாதிப்பு - வேலை கடினம்" },
  { id: "severe", label: "Severe distress", detail: "Bedridden, severe pain or high weakness", hindi: "गंभीर कष्ट - बिस्तर से उठना कठिन", spanish: "Severa - postrado en cama o dolor intenso", tamil: "தீவிர பாதிப்பு - படுக்கையில் இருத்தல்" },
  { id: "incapacitated", label: "Critical / Incapacitated", detail: "Barely responsive, unable to stand or breathe easily", hindi: "अत्यंत गंभीर - होश खोना या खड़ा न हो पाना", spanish: "Crítica / Incapacitado - apenas responde", tamil: "ஆபத்தான நிலை - நிற்க இயலாமை" },
] as const;

export const ageOptions = [
  { id: "infant", label: "Infant (< 1 year old)", riskFactor: "Very vulnerable to rapid dehydration & fever", hindi: "शिशु (1 वर्ष से कम)", spanish: "Bebé (< 1 año)", tamil: "கைக்குழந்தை (1 வயதுக்குட்பட்டோர்)" },
  { id: "child", label: "Child (1 – 12 years old)", riskFactor: "Watch fluid intake & alertness", hindi: "बच्चा (1 से 12 वर्ष)", spanish: "Niño (1 a 12 años)", tamil: "சிறுவர் (1 - 12 வயது)" },
  { id: "adult", label: "Adult (13 – 64 years old)", riskFactor: "Evaluate functional ability", hindi: "वयस्क (13 से 64 वर्ष)", spanish: "Adulto (13 a 64 años)", tamil: "பெரியவர் (13 - 64 வயது)" },
  { id: "older-adult", label: "Elderly (65+ years old)", riskFactor: "Higher complication risk for lungs & heart", hindi: "बुजुर्ग (65 वर्ष या अधिक)", spanish: "Adulto mayor (65+ años)", tamil: "முதியவர் (65 வயதுக்கு மேற்பட்டோர்)" },
] as const;

export const riskContextOptions = [
  "Pregnant or delivered within 6 weeks",
  "Has long-term Diabetes or High Blood Pressure",
  "Severe malnutrition or chronic weakness",
  "Living > 20 km from nearest Community Health Centre",
  "Recent local outbreak (Dengue / Malaria / Cholera)",
  "Recent head injury or vehicular fall",
];

export function assessSymptoms(answers: TriageAnswers): TriageResult {
  const selectedObjList = answers.symptoms.map(id => symptomsList.find(s => s.id === id)).filter(Boolean) as Symptom[];
  const dangerousFound = selectedObjList.filter(s => s.dangerous);
  const dangerDetected = dangerousFound.length > 0;
  const isSudden = answers.duration === "sudden";
  const isSevere = answers.severity === "severe" || answers.severity === "incapacitated";
  const isInfant = answers.ageGroup === "infant";
  const isElderly = answers.ageGroup === "older-adult";
  const hasRiskContext = answers.riskContext.length > 0;

  // Primary symptoms names for display
  const primarySymptomsFound = selectedObjList.map(s => s.label);

  // 1. URGENT EMERGENCY LEVEL
  if (
    dangerDetected ||
    answers.severity === "incapacitated" ||
    (isInfant && answers.symptoms.includes("fever")) ||
    (answers.symptoms.includes("snake-bite")) ||
    (answers.symptoms.includes("chest-pain")) ||
    (answers.symptoms.includes("breathing") && isSevere) ||
    (answers.symptoms.includes("vomiting-continuous") && answers.symptoms.includes("diarrhea-watery") && isSevere)
  ) {
    let specificNext = "Arrange immediate transport to the nearest Community Health Centre (CHC) or District Hospital now. Call emergency ambulance (108 / 112).";
    if (answers.symptoms.includes("snake-bite")) {
      specificNext = "CRITICAL: Transport immediately to a facility equipped with Anti-Snake Venom (ASV). Keep patient lying down and still; splint the bitten limb.";
    } else if (answers.symptoms.includes("chest-pain") || answers.symptoms.includes("breathing")) {
      specificNext = "Seek immediate emergency hospital care. Keep patient seated upright in a well-ventilated space. Do not let them exert themselves.";
    }

    return {
      level: "urgent",
      title: "Immediate Emergency Care Required (Red Level)",
      summary: "One or more critical red-flag signs were identified that require direct, prompt medical intervention by certified doctors. Do not wait for home symptoms to improve.",
      nextStep: specificNext,
      homeCareSteps: [
        "Keep the patient rested, calm, and lying in a safe position (recovery position on side if drowsy).",
        "Loosen all tight collars, belts, or waistbands to assist effortless breathing.",
        "Gather any existing prescription cards, medicine strips, or health documents to take with you.",
        "Do NOT give solid foods or force large drinks if the patient is drowsy, breathless, or vomiting."
      ],
      warnings: [
        "Do not leave the patient unattended under any circumstances.",
        "If the patient loses consciousness or breathing weakens, begin chest compressions and rush transport.",
        "Avoid unqualified quacks or unverified herbal powders for emergency conditions."
      ],
      dangerDetected: true,
      primarySymptomsFound
    };
  }

  // 2. MODERATE LEVEL
  if (
    answers.severity === "moderate" ||
    answers.duration === "week-plus" ||
    selectedObjList.length >= 3 ||
    (hasRiskContext && answers.severity !== "mild") ||
    (isInfant || isElderly) ||
    answers.symptoms.includes("chills-rigor") ||
    answers.symptoms.includes("animal-bite")
  ) {
    let note = "Contact your nearest Primary Health Centre (PHC) or village ASHA/ANM health worker within 24 hours.";
    if (answers.symptoms.includes("animal-bite")) {
      note = "Wash the wound immediately with running water and soap for 15 minutes, then visit PHC today for Rabies & Tetanus shots.";
    } else if (answers.symptoms.includes("chills-rigor")) {
      note = "Visit PHC for a rapid malaria/dengue blood smear test, especially if there is a local fever outbreak.";
    }

    return {
      level: "moderate",
      title: "Moderate Concern — Visit Clinic Soon (Yellow Level)",
      summary: "Symptoms are significant enough that a health worker should evaluate the patient within 24 hours to prevent complications or worsening.",
      nextStep: note,
      homeCareSteps: [
        "Hydration: Offer plenty of clean liquids—Oral Rehydration Salts (ORS), rice water, or boiled lukewarm water.",
        "Rest: Strict physical rest in a clean, breezy, shaded space.",
        "Temperature checks: Feel forehead or check thermometer every 4 hours.",
        "Nutritious light diet: Warm gruel, khichdi, thin soups, or bananas as tolerated."
      ],
      warnings: [
        "Watch for rapid changes: trouble breathing, inability to swallow liquids, extreme sleepiness, or stiff neck.",
        "If symptoms worsen rapidly overnight, proceed immediately to the nearest 24/7 hospital.",
        "Do not start antibiotics without a certified doctor's prescription."
      ],
      dangerDetected: false,
      primarySymptomsFound
    };
  }

  // 3. LOW CONCERN LEVEL
  return {
    level: "low",
    title: "Low Concern — Self-Care & Monitoring (Green Level)",
    summary: "Current symptoms appear mild and stable without red-flag danger indicators. Can be carefully managed with supportive home care and hydration.",
    nextStep: "Practice home self-care, ensure plenty of rest, and monitor closely. Seek a doctor if symptoms persist past 3-4 days.",
    homeCareSteps: [
      "Drink safe boiled water or homemade ORS (1L clean water + 6 tsp sugar + 1/2 tsp salt) to stay well-hydrated.",
      "Get plenty of restful sleep; avoid heavy physical labor under hot direct sunlight.",
      "For fever or aches, apply a lukewarm damp cloth to the forehead.",
      "Eat light, easily digestible home-cooked meals."
    ],
    warnings: [
      "Re-check symptoms if fever rises above 38.5°C (101.3°F) or lasts more than 3 days.",
      "Seek urgent care immediately if you develop sudden breathlessness, chest tightness, or blood in cough/stool.",
      "Remember this app offers triage guidance and cannot replace a doctor's diagnosis."
    ],
    dangerDetected: false,
    primarySymptomsFound
  };
}

export function getSymptomLabel(id: string, lang: "en" | "hi" | "es" | "ta" = "en"): string {
  const item = symptomsList.find(s => s.id === id);
  if (!item) return id;
  if (lang === "hi" && item.hindiLabel) return item.hindiLabel;
  if (lang === "es" && item.spanishLabel) return item.spanishLabel;
  if (lang === "ta" && item.tamilLabel) return item.tamilLabel;
  return item.label;
}