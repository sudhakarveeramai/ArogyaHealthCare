export type SupportedLanguage = "en" | "hi" | "es" | "ta";

export interface TranslationStrings {
  appName: string;
  tagline: string;
  worksOffline: string;
  onlineReady: string;
  offlineActive: string;
  privateDevice: string;
  checkSymptoms: string;
  emergencyGuide: string;
  firstAid: string;
  howItWorks: string;
  history: string;
  settings: string;
  home: string;
  installApp: string;
  installAppDesc: string;
  heroTitle: string;
  heroDesc: string;
  statZeroData: string;
  statZeroDataDesc: string;
  statInstant: string;
  statInstantDesc: string;
  statSafe: string;
  statSafeDesc: string;
  stepOf: string;
  back: string;
  continue: string;
  seeResult: string;
  searchSymptomPlaceholder: string;
  allCategories: string;
  catFever: string;
  catBreathing: string;
  catStomach: string;
  catNerves: string;
  catBites: string;
  selectedCount: string;
  selectMultipleNotice: string;
  qSymptomsTitle: string;
  qDurationTitle: string;
  qDurationSubtitle: string;
  qSeverityTitle: string;
  qSeveritySubtitle: string;
  qAgeTitle: string;
  qAgeSubtitle: string;
  qRiskTitle: string;
  qRiskSubtitle: string;
  dangerAlertDetected: string;
  dangerAlertMsg: string;
  emergencyCallNow: string;
  emergencyOverride: string;
  careLevel: string;
  readAloud: string;
  stopReading: string;
  recommendedAction: string;
  homeCareHeading: string;
  warningSignsHeading: string;
  checkAgain: string;
  saveHistory: string;
  historySaved: string;
  exportSummary: string;
  summaryCopied: string;
  disclaimerShort: string;
  disclaimerFull: string;
  speechLangCode: string;
  noHistoryTitle: string;
  noHistoryDesc: string;
  clearHistory: string;
  deleteEntry: string;
  viewDetails: string;
  firstAidLibrary: string;
  firstAidSubtitle: string;
  orsTitle: string;
  orsDesc: string;
  orsSteps: string[];
  snakeBiteTitle: string;
  snakeBiteDesc: string;
  snakeBiteDos: string[];
  snakeBiteDonts: string[];
  heatTitle: string;
  heatDesc: string;
  heatSteps: string[];
  feverChildTitle: string;
  feverChildDesc: string;
  feverChildSteps: string[];
  settingsTitle: string;
  languageLabel: string;
  textSizeLabel: string;
  textSizeStandard: string;
  textSizeLarge: string;
  textSizeXLarge: string;
  contrastLabel: string;
  contrastToggle: string;
  emergencyNumberLabel: string;
  clearAllData: string;
  clearDataConfirm: string;
  dataCleared: string;
}

export const translations: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    appName: "ArogyaCare",
    tagline: "Instant clinical symptom triage when doctors are far away.",
    worksOffline: "100% Offline Active",
    onlineReady: "Online Sync Ready",
    offlineActive: "Working Offline (Zero Internet)",
    privateDevice: "Private & Stored on Device",
    checkSymptoms: "Start Symptom Check",
    emergencyGuide: "Emergency Guide",
    firstAid: "First-Aid Guide",
    howItWorks: "How It Works",
    history: "Health History",
    settings: "Settings",
    home: "Home",
    installApp: "Install App for Offline Use",
    installAppDesc: "Add to home screen to use anywhere without internet.",
    heroTitle: "Safe, instant health guidance for rural families.",
    heroDesc: "Clear triage recommendations designed for villages, farms, and low-connectivity regions. Built with clinical safety guidelines.",
    statZeroData: "Zero Data Usage",
    statZeroDataDesc: "Runs entirely on your phone",
    statInstant: "Instant Triage",
    statInstantDesc: "No loading, no server wait",
    statSafe: "Clinical Safety",
    statSafeDesc: "Prioritizes urgent red flags",
    stepOf: "Step",
    back: "Back",
    continue: "Continue",
    seeResult: "Evaluate Symptoms",
    searchSymptomPlaceholder: "Search symptoms (e.g. fever, cough, pain)...",
    allCategories: "All Symptoms",
    catFever: "Fever & Infection",
    catBreathing: "Chest & Breathing",
    catStomach: "Stomach & Digestion",
    catNerves: "Head & Nerves",
    catBites: "Bites & Rural Hazards",
    selectedCount: "selected",
    selectMultipleNotice: "You can choose more than one symptom.",
    qSymptomsTitle: "What symptoms are being experienced?",
    qDurationTitle: "How long has this been happening?",
    qDurationSubtitle: "Choose how quickly or long the symptoms started.",
    qSeverityTitle: "How severe are the symptoms right now?",
    qSeveritySubtitle: "How much is this affecting normal daily activities or work?",
    qAgeTitle: "Who is this evaluation for?",
    qAgeSubtitle: "Age helps assess clinical risks more accurately.",
    qRiskTitle: "Any special conditions or health risks?",
    qRiskSubtitle: "Select any that apply to the patient.",
    dangerAlertDetected: "Potentially Urgent Sign Detected!",
    dangerAlertMsg: "You selected one or more severe warning signs. Please review emergency instructions immediately.",
    emergencyCallNow: "Call Emergency Services (108 / 112)",
    emergencyOverride: "Continue Full Check Anyway",
    careLevel: "Assessed Care Level",
    readAloud: "Listen (Read Aloud)",
    stopReading: "Stop Voice",
    recommendedAction: "Recommended Medical Action",
    homeCareHeading: "Safe Home Care & Supportive Steps",
    warningSignsHeading: "Critical Warning Signs — Get Immediate Help If:",
    checkAgain: "Check Another Person / Again",
    saveHistory: "Save to Local History",
    historySaved: "Saved to your device history",
    exportSummary: "Share / Export Summary",
    summaryCopied: "Triage summary copied to clipboard!",
    disclaimerShort: "Triage support only. Not a medical diagnosis or prescription.",
    disclaimerFull: "ArogyaCare is an educational and triage guidance tool designed for low-resource environments. It does NOT provide a definitive medical diagnosis, prescribe pharmaceutical drugs, or replace a doctor's examination. Always seek licensed medical care whenever feasible.",
    speechLangCode: "en-US",
    noHistoryTitle: "No Saved Checks Yet",
    noHistoryDesc: "Evaluations you complete will be securely saved only on this phone for your reference.",
    clearHistory: "Clear All History",
    deleteEntry: "Delete this record",
    viewDetails: "View Care Advice",
    firstAidLibrary: "Offline First-Aid Library",
    firstAidSubtitle: "Essential clinical protocols when doctors are hours away.",
    orsTitle: "Homemade ORS (Oral Rehydration Solution)",
    orsDesc: "Crucial for severe dehydration from diarrhea, vomiting, or heat exhaustion.",
    orsSteps: [
      "Clean 1 liter of safe drinking water (boiled and cooled if possible).",
      "Add 6 level teaspoons (or 2 tablespoons) of clean sugar.",
      "Add 1/2 level teaspoon of clean salt.",
      "Stir until sugar and salt completely dissolve. Sip continuously."
    ],
    snakeBiteTitle: "Snake Bite & Scorpion Emergency",
    snakeBiteDesc: "Life-saving response rules for rural venomous bites.",
    snakeBiteDos: [
      "Keep the patient calm, quiet, and completely still.",
      "Immobilize the bitten limb below heart level with a simple splint.",
      "Remove tight rings, watches, or restrictive clothing quickly.",
      "Transport immediately to a clinic with anti-snake venom (ASV)."
    ],
    snakeBiteDonts: [
      "NEVER cut, slash, or burn the bite mark.",
      "NEVER try to suck the venom out.",
      "NEVER apply ice or electric shock.",
      "NEVER apply a tight tourniquet that stops arterial blood flow."
    ],
    heatTitle: "Heat Stroke & Exhaustion Care",
    heatDesc: "Emergency cooling when body temperature spikes in field conditions.",
    heatSteps: [
      "Move the person immediately into shade, breeze, or cool room.",
      "Loosen or remove excess clothing.",
      "Sponge the entire body with cool (not freezing) water and fan aggressively.",
      "Apply damp cool cloths to neck, armpits, and groin.",
      "If conscious, give small sips of cool water or ORS. If confused/unconscious, transport immediately."
    ],
    feverChildTitle: "High Fever in Young Children",
    feverChildDesc: "Safe temperature management for pediatric patients.",
    feverChildSteps: [
      "Keep child in a ventilated room with light cotton clothes.",
      "Do NOT bundle them in heavy blankets.",
      "Sponge with lukewarm tap water (never alcohol or ice).",
      "Ensure frequent breastfeeding or fluids to prevent dehydration.",
      "Any infant under 3 months with fever needs urgent clinic visit."
    ],
    settingsTitle: "Preferences & Accessibility",
    languageLabel: "App Language / भाषा / மொழி",
    textSizeLabel: "Reading Font Size",
    textSizeStandard: "Standard (16px)",
    textSizeLarge: "Large (18px)",
    textSizeXLarge: "Extra Large (20px)",
    contrastLabel: "High Contrast Outdoor Mode",
    contrastToggle: "High Contrast",
    emergencyNumberLabel: "Local Emergency Number",
    clearAllData: "Erase All Device Data",
    clearDataConfirm: "Are you sure? This will delete all saved triage history and restore defaults.",
    dataCleared: "All local health history and preferences have been cleared."
  },
  hi: {
    appName: "आरोग्यकेयर",
    tagline: "जब अस्पताल दूर हो, तब तुरंत सुरक्षित स्वास्थ्य मार्गदर्शन।",
    worksOffline: "100% ऑफ़लाइन चालू",
    onlineReady: "ऑनलाइन उपलब्ध",
    offlineActive: "बिना इंटरनेट के चल रहा है",
    privateDevice: "निजी और केवल फोन पर सुरक्षित",
    checkSymptoms: "लक्षणों की जाँच शुरू करें",
    emergencyGuide: "आपातकालीन मार्गदर्शिका",
    firstAid: "प्राथमिक उपचार (First Aid)",
    howItWorks: "यह कैसे काम करता है",
    history: "स्वास्थ्य इतिहास",
    settings: "सेटिंग्स",
    home: "होम",
    installApp: "ऑफ़लाइन उपयोग के लिए ऐप इंस्टॉल करें",
    installAppDesc: "बिना इंटरनेट के कहीं भी चलाने के लिए होम स्क्रीन पर जोड़ें।",
    heroTitle: "ग्रामीण परिवारों के लिए सुरक्षित और तुरंत सलाह।",
    heroDesc: "गाँवों और दूरदराज के क्षेत्रों के लिए विशेष रूप से तैयार। बिना इंटरनेट तुरंत पता करें कि अस्पताल कब जाना है।",
    statZeroData: "शून्य डेटा उपयोग",
    statZeroDataDesc: "पूरी तरह आपके फ़ोन पर चलता है",
    statInstant: "तुरंत परिणाम",
    statInstantDesc: "कोई इंतज़ार नहीं, तुरंत जाँच",
    statSafe: "चिकित्सीय सुरक्षा",
    statSafeDesc: "खतरे के संकेतों की पहचान",
    stepOf: "चरण",
    back: "पीछे जाएं",
    continue: "आगे बढ़ें",
    seeResult: "परिणाम देखें",
    searchSymptomPlaceholder: "लक्षण खोजें (जैसे बुखार, खाँसी, दर्द)...",
    allCategories: "सभी लक्षण",
    catFever: "बुखार और संक्रमण",
    catBreathing: "छाती और सांस",
    catStomach: "पेट और पाचन",
    catNerves: "सिर और तंत्रिका",
    catBites: "कीड़े/सांप का काटना",
    selectedCount: "चुने गए",
    selectMultipleNotice: "आप एक से अधिक लक्षण चुन सकते हैं।",
    qSymptomsTitle: "मरीज़ को क्या परेशानी हो रही है?",
    qDurationTitle: "यह समस्या कितने समय से है?",
    qDurationSubtitle: "लक्षण कब शुरू हुए, चुनें।",
    qSeverityTitle: "तकलीफ कितनी गंभीर है?",
    qSeveritySubtitle: "क्या सामान्य कामकाज करने में कठिनाई हो रही है?",
    qAgeTitle: "यह जाँच किसके लिए है?",
    qAgeSubtitle: "उम्र के अनुसार सही सलाह देने में मदद मिलती है।",
    qRiskTitle: "क्या कोई अन्य विशेष स्थिति है?",
    qRiskSubtitle: "यदि कोई लागू हो तो चुनें।",
    dangerAlertDetected: "गंभीर खतरे का लक्षण मिला!",
    dangerAlertMsg: "आपने गंभीर चेतावनी लक्षण चुने हैं। तुरंत आपातकालीन निर्देश देखें।",
    emergencyCallNow: "आपातकालीन एम्बुलेंस बुलाएं (108 / 112)",
    emergencyOverride: "फिर भी पूरी जाँच जारी रखें",
    careLevel: "स्वास्थ्य प्राथमिकता स्तर",
    readAloud: "आवाज़ में सुनें (बोलकर बताएं)",
    stopReading: "आवाज़ बंद करें",
    recommendedAction: "सलाह और अगला कदम",
    homeCareHeading: "घर पर सुरक्षित देखभाल और राहत उपाय",
    warningSignsHeading: "खतरे के संकेत — तुरंत अस्पताल जाएं यदि:",
    checkAgain: "दूसरे व्यक्ति की जाँच करें / पुनः जाँचें",
    saveHistory: "इतिहास में सहेजें",
    historySaved: "आपके फ़ोन के इतिहास में सहेज लिया गया",
    exportSummary: "सारांश शेयर या कॉपी करें",
    summaryCopied: "सारांश कॉपी हो गया!",
    disclaimerShort: "केवल प्राथमिक triage सहायता। यह कोई डॉक्टरी निदान या दवा का नुस्खा नहीं है।",
    disclaimerFull: "आरोग्यकेयर केवल प्राथमिक मार्गदर्शन और खतरे के स्तर का आकलन करता है। यह किसी बीमारी की अंतिम जाँच नहीं करता और न ही डॉक्टर की जगह ले सकता है। गंभीर स्थिति में तुरंत योग्य चिकित्सक से संपर्क करें।",
    speechLangCode: "hi-IN",
    noHistoryTitle: "अभी कोई जाँच सुरक्षित नहीं है",
    noHistoryDesc: "आप जो भी जाँच करेंगे, वह आपके फ़ोन पर सुरक्षित रहेगी।",
    clearHistory: "सारा इतिहास मिटाएं",
    deleteEntry: "यह जाँच हटाएं",
    viewDetails: "सलाह देखें",
    firstAidLibrary: "ऑफ़लाइन प्राथमिक उपचार निर्देशिका",
    firstAidSubtitle: "जब अस्पताल घंटों दूर हो, तब तुरंत जीवनरक्षक उपाय।",
    orsTitle: "घर पर ORS (जीवनरक्षक घोल) बनाने की विधि",
    orsDesc: "दस्त, उल्टी या लू लगने पर गंभीर डिहाइड्रेशन से बचाव के लिए।",
    orsSteps: [
      "1 लीटर साफ पीने का पानी लें (उबालकर ठंडा किया हुआ सबसे अच्छा)।",
      "उसमें 6 छोटी चम्मच (या 2 बड़े चम्मच) साफ चीनी मिलाएं।",
      "उसमें आधा (1/2) छोटी चम्मच साफ नमक मिलाएं।",
      "घुलने तक अच्छी तरह हिलाएं। घूंट-घूंट करके पिलाते रहें।"
    ],
    snakeBiteTitle: "सांप या बिच्छू के काटने पर क्या करें",
    snakeBiteDesc: "ग्रामीण क्षेत्रों में तुरंत ध्यान रखने योग्य नियम।",
    snakeBiteDos: [
      "मरीज़ को शांत रखें और हिलने-डुलने न दें।",
      "काटे गए अंग को दिल के स्तर से नीचे रखें और लकड़ी या कपड़े से सहारा दें।",
      "अंगूठी, ताबीज या तंग कपड़े तुरंत उतार दें।",
      "एंटी-स्नेक वेनम वाले नजदीकी अस्पताल तुरंत ले जाएं।"
    ],
    snakeBiteDonts: [
      "काटे गए स्थान पर कभी चीरा या कट न लगाएं।",
      "मुंह से ज़हर चूसने की कोशिश न करें।",
      "बर्फ या बिजली का झटका न दें।",
      "रस्सी से खून का बहाव पूरी तरह न रोकें (टूर्निकेट न बांधें)।"
    ],
    heatTitle: "लू (Heat Stroke) लगने पर प्राथमिक उपचार",
    heatDesc: "धूप या गर्मी में अत्यधिक तापमान बढ़ने पर तुरंत उपाय।",
    heatSteps: [
      "व्यक्ति को तुरंत ठंडी छाया या पंखे की हवा में लाएं।",
      "तंग कपड़े ढीले कर दें या हटा दें।",
      "साधारण ठंडे पानी से पूरे शरीर पर पट्टी रखें और हवा करें।",
      "गर्दन, बगल और जांघों पर ठंडे गीले कपड़े रखें।",
      "यदि होश में हो तो ORS या पानी पिलाएं। बेहोश हो तो तुरंत अस्पताल ले जाएं।"
    ],
    feverChildTitle: "छोटे बच्चों में तेज बुखार की देखभाल",
    feverChildDesc: "शिशुओं के लिए सुरक्षित तापमान नियंत्रण।",
    feverChildSteps: [
      "बच्चे को हवादार कमरे में हल्के सूती कपड़ों में रखें।",
      "मोटे कंबल में कभी न लपेटें।",
      "हल्के गुनगुने पानी की पट्टी से बदन पोंछें (बर्फ या शराब कभी न लगाएं)।",
      "स्तनपान या तरल पदार्थ लगातार देते रहें।",
      "3 महीने से छोटे शिशु को बुखार होने पर तुरंत डॉक्टर के पास ले जाएं।"
    ],
    settingsTitle: "सेटिंग्स और सुगमता",
    languageLabel: "ऐप की भाषा चुनें",
    textSizeLabel: "पढ़ने के लिए अक्षरों का आकार",
    textSizeStandard: "सामान्य (16px)",
    textSizeLarge: "बड़ा (18px)",
    textSizeXLarge: "अति बड़ा (20px)",
    contrastLabel: "तेज धूप के लिए हाई कंट्रास्ट मोड",
    contrastToggle: "हाई कंट्रास्ट",
    emergencyNumberLabel: "आपातकालीन नंबर",
    clearAllData: "फ़ोन से सारा डेटा मिटाएं",
    clearDataConfirm: "क्या आप निश्चित हैं? इससे सारा इतिहास और सेटिंग्स मिट जाएंगी।",
    dataCleared: "सारा डेटा सफलतापूर्वक मिटा दिया गया।"
  },
  es: {
    appName: "ArogyaCare",
    tagline: "Triaje clínico instantáneo cuando los médicos están lejos.",
    worksOffline: "100% Fuera de Línea",
    onlineReady: "Listo para Sincronizar",
    offlineActive: "Modo Sin Conexión (Sin Internet)",
    privateDevice: "Privado y guardado en tu teléfono",
    checkSymptoms: "Evaluar Síntomas",
    emergencyGuide: "Guía de Emergencia",
    firstAid: "Primeros Auxilios",
    howItWorks: "Cómo Funciona",
    history: "Historial de Salud",
    settings: "Ajustes",
    home: "Inicio",
    installApp: "Instalar para Uso Sin Internet",
    installAppDesc: "Añade a tu pantalla de inicio para usarlo sin conexión.",
    heroTitle: "Orientación médica segura e instantánea para familias rurales.",
    heroDesc: "Recomendaciones claras de triaje diseñadas para zonas rurales y de baja conectividad.",
    statZeroData: "Cero Consumo de Datos",
    statZeroDataDesc: "Funciona completamente en tu móvil",
    statInstant: "Triaje Inmediato",
    statInstantDesc: "Sin esperas ni servidores",
    statSafe: "Seguridad Clínica",
    statSafeDesc: "Detecta signos de alarma urgentes",
    stepOf: "Paso",
    back: "Atrás",
    continue: "Continuar",
    seeResult: "Evaluar Síntomas",
    searchSymptomPlaceholder: "Buscar síntomas (fiebre, tos, dolor)...",
    allCategories: "Todos los Síntomas",
    catFever: "Fiebre e Infección",
    catBreathing: "Pecho y Respiración",
    catStomach: "Estómago y Digestión",
    catNerves: "Cabeza y Nervios",
    catBites: "Picaduras y Peligros Rurales",
    selectedCount: "seleccionados",
    selectMultipleNotice: "Puedes elegir más de un síntoma.",
    qSymptomsTitle: "¿Qué síntomas experimenta el paciente?",
    qDurationTitle: "¿Cuánto tiempo lleva con estos síntomas?",
    qDurationSubtitle: "Seleccione desde cuándo empezaron.",
    qSeverityTitle: "¿Qué tan severos son los síntomas ahora?",
    qSeveritySubtitle: "¿Cuánto dificultan sus actividades cotidianas?",
    qAgeTitle: "¿Para quién es esta evaluación?",
    qAgeSubtitle: "La edad ayuda a determinar el riesgo con mayor precisión.",
    qRiskTitle: "¿Existe alguna condición médica especial?",
    qRiskSubtitle: "Marque las que apliquen al paciente.",
    dangerAlertDetected: "¡Signo Potencialmente Urgente Detectado!",
    dangerAlertMsg: "Seleccionó síntomas de alarma graves. Revise las instrucciones de emergencia.",
    emergencyCallNow: "Llamar a Emergencias (108 / 112 / 911)",
    emergencyOverride: "Continuar con la Evaluación Completa",
    careLevel: "Nivel de Atención Recomendado",
    readAloud: "Escuchar en Voz Alta",
    stopReading: "Detener Voz",
    recommendedAction: "Acción Médica Recomendada",
    homeCareHeading: "Cuidados Seguros en el Hogar e Hidratación",
    warningSignsHeading: "Signos Críticos de Alarma — Acuda a Urgencias Si:",
    checkAgain: "Evaluar a Otra Persona / Reiniciar",
    saveHistory: "Guardar en el Historial Local",
    historySaved: "Guardado en su dispositivo",
    exportSummary: "Compartir / Copiar Resumen",
    summaryCopied: "¡Resumen copiado al portapapeles!",
    disclaimerShort: "Solo soporte de triaje. No es un diagnóstico ni receta médica.",
    disclaimerFull: "ArogyaCare es una herramienta de orientación y triaje en entornos con escasos recursos. NO diagnostica enfermedades ni sustituye a un profesional de la salud. Consulte a un médico siempre que sea posible.",
    speechLangCode: "es-ES",
    noHistoryTitle: "Sin Evaluaciones Guardadas",
    noHistoryDesc: "Sus consultas se guardarán de forma privada en este teléfono.",
    clearHistory: "Borrar Todo el Historial",
    deleteEntry: "Eliminar este registro",
    viewDetails: "Ver Recomendaciones",
    firstAidLibrary: "Guía de Primeros Auxilios Fuera de Línea",
    firstAidSubtitle: "Protocolos esenciales cuando el hospital está a horas de distancia.",
    orsTitle: "Suero Oral Casero (SRO)",
    orsDesc: "Vital para prevenir deshidratación por diarrea, vómitos o calor extremo.",
    orsSteps: [
      "1 litro de agua limpia y potable (hervida y enfriada si es posible).",
      "Agregue 6 cucharaditas al ras (o 2 cucharadas soperas) de azúcar.",
      "Agregue media (1/2) cucharadita de sal limpia.",
      "Mezcle bien hasta disolver. Dar a beber en sorbos constantes."
    ],
    snakeBiteTitle: "Picaduras de Serpiente o Escorpión",
    snakeBiteDesc: "Reglas clave de actuación para mordeduras venenosas.",
    snakeBiteDos: [
      "Mantenga al paciente calmado y quieto.",
      "Inmovilice la extremidad afectada por debajo del nivel del corazón.",
      "Retire anillos, pulseras o ropa ajustada rápidamente.",
      "Traslade de inmediato a un centro con suero antiofídico."
    ],
    snakeBiteDonts: [
      "NUNCA corte o queme la herida.",
      "NUNCA intente succionar el veneno con la boca.",
      "NUNCA aplique hielo ni descargas eléctricas.",
      "NUNCA aplique torniquetes apretados que corten la circulación arterial."
    ],
    heatTitle: "Golpe de Calor y Agotamiento",
    heatDesc: "Enfriamiento de emergencia ante subidas bruscas de temperatura.",
    heatSteps: [
      "Lleve a la persona a la sombra o a un lugar ventilado.",
      "Afloje o retire ropa innecesaria.",
      "Humedezca el cuerpo con agua fresca y abanique intensamente.",
      "Coloque paños húmedos en cuello, axilas e ingles.",
      "Si está consciente, ofrezca sorbos de agua o suero. Si está desorientado, traslade de urgencia."
    ],
    feverChildTitle: "Fiebre Alta en Niños Pequeños",
    feverChildDesc: "Control seguro de temperatura en pacientes pediátricos.",
    feverChildSteps: [
      "Mantenga al niño en una habitación fresca con ropa ligera de algodón.",
      "NO lo abrigue con mantas gruesas.",
      "Pase una esponja con agua tibia (nunca alcohol ni hielo).",
      "Asegure lactancia o líquidos constantes para evitar deshidratación.",
      "Bebés menores de 3 meses con fiebre requieren atención médica urgente."
    ],
    settingsTitle: "Configuración y Accesibilidad",
    languageLabel: "Idioma de la Aplicación",
    textSizeLabel: "Tamaño del Texto",
    textSizeStandard: "Estándar (16px)",
    textSizeLarge: "Grande (18px)",
    textSizeXLarge: "Muy Grande (20px)",
    contrastLabel: "Modo Alto Contraste para Luz Solar",
    contrastToggle: "Alto Contraste",
    emergencyNumberLabel: "Número de Emergencia Local",
    clearAllData: "Borrar Datos del Teléfono",
    clearDataConfirm: "¿Está seguro? Esto eliminará todo el historial guardado y restaurará valores iniciales.",
    dataCleared: "Todos los datos locales han sido borrados."
  },
  ta: {
    appName: "ஆரோக்கியகேர்",
    tagline: "மருத்துவர் தொலைவில் இருக்கும்போது உடனடி பாதுகாப்பான வழிகாட்டல்.",
    worksOffline: "100% ஆஃப்லைன் இயக்கம்",
    onlineReady: "ஆன்லைன் இணைப்பு தயார்",
    offlineActive: "இணையம் இன்றி இயங்குகிறது",
    privateDevice: "தகவல்கள் உங்கள் போனில் மட்டுமே சேமிக்கப்படும்",
    checkSymptoms: "அறிகுறிகளை சரிபார்க்கவும்",
    emergencyGuide: "அவசர வழிகாட்டல்",
    firstAid: "முதலுதவி வழிகாட்டி",
    howItWorks: "இது எவ்வாறு செயல்படுகிறது",
    history: "சுகாதார வரலாறு",
    settings: "அமைப்புகள்",
    home: "முகப்பு",
    installApp: "ஆஃப்லைன் பயன்பாட்டிற்கு செயலியை நிறுவவும்",
    installAppDesc: "இணையம் இல்லாமல் எங்கும் பயன்படுத்த முகப்புத் திரையில் சேர்க்கவும்.",
    heroTitle: "கிராமப்புற குடும்பங்களுக்கான உடனடி சுகாதார வழிகாட்டி.",
    heroDesc: "இணையம் இல்லாத போதும் வேலை செய்யும் எளிய மற்றும் பாதுகாப்பான மருத்துவ வழிகாட்டல் அமைப்பு.",
    statZeroData: "பூஜ்ஜிய டேட்டா பயன்பாடு",
    statZeroDataDesc: "முழுமையாக உங்கள் போனிலேயே இயங்கும்",
    statInstant: "உடனடி மதிப்பீடு",
    statInstantDesc: "காத்திருக்க தேவையில்லை",
    statSafe: "மருத்துவ பாதுகாப்பு",
    statSafeDesc: "அவசர அறிகுறிகளை உடனே எச்சரிக்கும்",
    stepOf: "படி",
    back: "பின்னால்",
    continue: "தொடரவும்",
    seeResult: "முடிவுகளைக் காண்க",
    searchSymptomPlaceholder: "அறிகுறிகளைத் தேடுங்கள் (காய்ச்சல், இருமல், வலி)...",
    allCategories: "அனைத்து அறிகுறிகள்",
    catFever: "காய்ச்சல் & தொற்று",
    catBreathing: "மார்பு & சுவாசம்",
    catStomach: "வயிறு & செரிமானம்",
    catNerves: "தலை & நரம்புகள்",
    catBites: "விஷக்கடி & ஆபத்துகள்",
    selectedCount: "தேர்வு செய்யப்பட்டது",
    selectMultipleNotice: "நீங்கள் பல அறிகுறிகளைத் தேர்ந்தெடுக்கலாம்.",
    qSymptomsTitle: "நோயாளிக்கு என்னென்ன அறிகுறிகள் உள்ளன?",
    qDurationTitle: "இது எத்தனை நாட்களாக உள்ளது?",
    qDurationSubtitle: "அறிகுறிகள் எப்போது தொடங்கியது என்பதைத் தேர்ந்தெடுக்கவும்.",
    qSeverityTitle: "தற்போது பாதிப்பு எவ்வளவு தீவிரமாக உள்ளது?",
    qSeveritySubtitle: "வழக்கமான வேலைகளை செய்ய முடிகிறதா?",
    qAgeTitle: "இந்த பரிசோதனை யாருக்காக?",
    qAgeSubtitle: "வயது அடிப்படையில் சரியான முடிவை எடுக்க உதவும்.",
    qRiskTitle: "வேறு ஏதேனும் சிறப்பு உடல்நிலை உள்ளதா?",
    qRiskSubtitle: "பொருந்துவதை மட்டும் தேர்ந்தெடுக்கவும்.",
    dangerAlertDetected: "தீவிர அவசர அறிகுறி கண்டறியப்பட்டது!",
    dangerAlertMsg: "நீங்கள் மிகக் கடுமையான எச்சரிக்கை அறிகுறியைத் தேர்ந்தெடுத்துள்ளீர்கள். உடனடியாக அவசர வழிமுறைகளைப் பார்க்கவும்.",
    emergencyCallNow: "அவசர ஊர்தியை அழைக்கவும் (108 / 112)",
    emergencyOverride: "ஆய்வைத் தொடரவும்",
    careLevel: "பரிந்துரைக்கப்பட்ட சிகிச்சை நிலை",
    readAloud: "குரலில் கேட்கவும் (வாசி)",
    stopReading: "குரலை நிறுத்து",
    recommendedAction: "பரிந்துரைக்கப்படும் அடுத்த படி",
    homeCareHeading: "வீட்டுப் பராமரிப்பு & நீர்ச்சத்து பாதுகாப்பு",
    warningSignsHeading: "உடனடி மருத்துவமனை செல்ல வேண்டிய தீவிர அறிகுறிகள்:",
    checkAgain: "மீண்டும் பரிசோதிக்க / அடுத்தவர்",
    saveHistory: "வரலாற்றில் சேமிக்கவும்",
    historySaved: "உங்கள் போனில் சேமிக்கப்பட்டது",
    exportSummary: "சுருக்கத்தைப் பகிரவும்",
    summaryCopied: "சுருக்கம் நகலெடுக்கப்பட்டது!",
    disclaimerShort: "முதற்கட்ட வழிகாட்டல் மட்டுமே. இது மருத்துவ நோயறிதல் அல்லது மருந்துச் சீட்டு அல்ல.",
    disclaimerFull: "ஆரோக்கியகேர் ஒரு முதற்கட்ட வழிகாட்டி மட்டுமே. இது மருத்துவரின் நேரடி பரிசோதனைக்கு மாற்றாகாது. உடனடியாக தகுதிவாய்ந்த மருத்துவரை அணுகவும்.",
    speechLangCode: "ta-IN",
    noHistoryTitle: "சேமிக்கப்பட்ட பதிவுகள் இல்லை",
    noHistoryDesc: "நீங்கள் செய்யும் பரிசோதனைகள் உங்கள் போனில் பாதுகாப்பாக சேமிக்கப்படும்.",
    clearHistory: "அனைத்து வரலாற்றையும் நீக்கு",
    deleteEntry: "இப்பதிவை நீக்கு",
    viewDetails: "விவரங்களைப் பார்க்க",
    firstAidLibrary: "ஆஃப்லைன் முதலுதவி கையேடு",
    firstAidSubtitle: "மருத்துவமனை வெகு தொலைவில் இருக்கும்போது அவசர உயிர் காக்கும் முறைகள்.",
    orsTitle: "வீட்டிலேயே ORS (உயிர் காக்கும் கரைசல்) தயாரிக்கும் முறை",
    orsDesc: "வயிற்றுப்போக்கு, வாந்தி, வெப்பத்தால் ஏற்படும் நீர்ச்சத்து இழப்பைத் தடுக்க.",
    orsSteps: [
      "1 லிட்டர் சுத்தமான குடிநீர் எடுக்கவும் (காய்ச்சி ஆறவைத்த நீர் சிறந்தது).",
      "அதில் 6 சிறிய தேக்கரண்டி சர்க்கரை சேர்க்கவும்.",
      "அதில் 1/2 சிறிய தேக்கரண்டி உப்பு சேர்க்கவும்.",
      "நன்கு கரைத்து சிறிது சிறிதாக குடிக்க கொடுக்கவும்."
    ],
    snakeBiteTitle: "பாம்பு அல்லது தேள் கடித்தால் செய்ய வேண்டியவை",
    snakeBiteDesc: "கிராமப்புறங்களில் உடனடியாகப் பின்பற்ற வேண்டிய விதிகள்.",
    snakeBiteDos: [
      "மிருதுவான நிலையில் நோயாளியை அசையாமல் படுக்க வைக்கவும்.",
      "கடித்த பாகத்தை இதய மட்டத்திற்கு கீழே வைக்கவும்.",
      "மோதிரம், கயிறு அல்லது இறுக்கமான உடைகளை உடனே அகற்றவும்.",
      "ஆன்டி-வெனம் உள்ள மருத்துவமனைக்கு விரைந்து செல்லவும்."
    ],
    snakeBiteDonts: [
      "கடித்த இடத்தில் கத்தியால் வெட்டவோ எரிக்கவோ கூடாது.",
      "வாயால் விஷத்தை உறிஞ்ச முயற்சிக்காதீர்கள்.",
      "பனிக்கட்டி அல்லது மின்சார அதிர்ச்சி வைக்காதீர்கள்.",
      "இரத்த ஓட்டத்தை முற்றிலும் தடுக்கும் இறுக்கமான கயிறு கட்டாதீர்கள்."
    ],
    heatTitle: "சூரிய வெப்ப பக்கவாதம் (Heat Stroke)",
    heatDesc: "உடல் வெப்பநிலை ஆபத்தான அளவுக்கு உயரும் போது.",
    heatSteps: [
      "நோயாளியை உடனே நிழல் அல்லது காற்றோட்டமான இடத்திற்கு கொண்டு வரவும்.",
      "இறுக்கமான ஆடைகளைத் தளர்த்தவும்.",
      "சாதாரண குளிர்ந்த நீரால் உடலைத் துடைத்து விசிறவும்.",
      "கழுத்து, அக்குள் பகுதியில் ஈரத்துணியை வைக்கவும்.",
      "மயக்க நிலையில் இருந்தால் உடனடியாக மருத்துவமனைக்குக் கொண்டு செல்லவும்."
    ],
    feverChildTitle: "சிறு குழந்தைகளில் அதிக காய்ச்சல்",
    feverChildDesc: "குழந்தைகளுக்கான பாதுகாப்பான வெப்பநிலை குறைப்பு.",
    feverChildSteps: [
      "மெல்லிய பருத்தி ஆடைகளை அணிய வைக்கவும்.",
      "தடிமனான போர்வைகளால் போர்த்த வேண்டாம்.",
      "வெதுவெதுப்பான நீரால் உடலை மென்மையாகத் துடைக்கவும்.",
      "தாய்ப்பால் அல்லது திரவங்களை தொடர்ந்து கொடுக்கவும்.",
      "3 மாதத்திற்கு உட்பட்ட குழந்தைக்கு காய்ச்சல் இருந்தால் உடனே மருத்துவமனை செல்லவும்."
    ],
    settingsTitle: "அமைப்புகள் & வசதிகள்",
    languageLabel: "மொழியைத் தேர்ந்தெடுக்கவும்",
    textSizeLabel: "எழுத்து அளவு",
    textSizeStandard: "வழக்கமான (16px)",
    textSizeLarge: "பெரியது (18px)",
    textSizeXLarge: "மிகப் பெரியது (20px)",
    contrastLabel: "அதிக மாறுபட்ட தோற்றம் (High Contrast)",
    contrastToggle: "ஹை கான்ட்ராஸ்ட்",
    emergencyNumberLabel: "அவசர உதவி எண்",
    clearAllData: "அனைத்து தரவையும் நீக்கு",
    clearDataConfirm: "நிச்சயமாக அழிக்க விரும்புகிறீர்களா? இது சேமித்த வரலாற்றை அழிக்கும்.",
    dataCleared: "அனைத்து தரவுகளும் வெற்றிகரமாக அழிக்கப்பட்டன."
  }
};
