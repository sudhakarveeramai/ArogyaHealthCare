export interface FirstAidTopic {
  id: string;
  category: "hydration" | "trauma" | "heat" | "pediatric" | "respiratory";
  title: string;
  iconName: string;
  shortDesc: string;
  dos: string[];
  donts?: string[];
  warningNote: string;
}

export const offlineFirstAidTopics: FirstAidTopic[] = [
  {
    id: "ors-rehydration",
    category: "hydration",
    title: "Homemade ORS (Oral Rehydration Solution)",
    iconName: "Droplets",
    shortDesc: "Prevents fatal dehydration from cholera, acute diarrhea, vomiting, and sunstroke.",
    dos: [
      "Clean Container: Wash hands with soap and use 1 clean liter of drinking water.",
      "Sugar: Add exactly 6 level teaspoons (or 2 level tablespoons) of clean sugar.",
      "Salt: Add exactly 1/2 level teaspoon of salt.",
      "Stir vigorously until both sugar and salt dissolve completely.",
      "Administration: Give frequent small sips. For children under 2, give 1/4 to 1/2 cup after every loose stool. For older individuals, 1 full cup."
    ],
    donts: [
      "Do NOT boil the solution after mixing.",
      "Do NOT add raw milk, sweet soda, or excessive salt.",
      "Discard any leftover prepared solution after 24 hours."
    ],
    warningNote: "If the person cannot drink, is constantly vomiting everything up, or has sunken eyes and extreme lethargy, transport immediately to a clinic for IV fluids."
  },
  {
    id: "snake-scorpion-bite",
    category: "trauma",
    title: "Snake Bite & Scorpion Emergency Response",
    iconName: "AlertOctagon",
    shortDesc: "Immediate stabilization protocol before hospital Anti-Snake Venom (ASV).",
    dos: [
      "Reassure & Keep Still: Panic speeds venom spread. Keep the patient lying down and calm.",
      "Immobilize: Splint the affected arm or leg using cloth and a stick to prevent joint movement.",
      "Keep Below Heart: Maintain the bitten limb slightly lower than the level of the heart.",
      "Remove Jewelry: Remove rings, anklets, bracelets, and footwear immediately before swelling starts.",
      "Transport Rapidly: Carry the patient to a vehicle; do not let them walk."
    ],
    donts: [
      "NEVER cut, pierce, or slash the bite wound.",
      "NEVER attempt to suck out venom with mouth or suction devices.",
      "NEVER apply herbal pastes, chemicals, or electrical shocks.",
      "NEVER tie a tight tourniquet (stops blood flow and causes limb gangrene)."
    ],
    warningNote: "Watch for drooping eyelids (ptosis), difficulty swallowing, foaming, or breathing weakness. Every snakebite must be evaluated at an emergency health centre."
  },
  {
    id: "heat-stroke-cooling",
    category: "heat",
    title: "Extreme Heat Exhaustion & Sunstroke",
    iconName: "SunMedium",
    shortDesc: "Rapid cooling protocol for agricultural and outdoor workers in high temperatures.",
    dos: [
      "Move to Deep Shade: Transfer immediately into cool shade, tree cover, or well-ventilated room.",
      "Position: Lie the person flat with feet slightly elevated.",
      "Aggressive Evaporative Cooling: Strip heavy clothing. Wet the entire skin with room-temperature water and fan continuously.",
      "Cool Compresses: Place damp cloths over neck, armpits, and groin area.",
      "Conscious Hydration: If alert and able to swallow, provide small sips of cool water, buttermilk, or ORS."
    ],
    donts: [
      "Do NOT give fluids if the person is confused, drowsy, or vomiting.",
      "Do NOT use freezing ice baths (causes peripheral vasoconstriction).",
      "Do NOT administer paracetamol/aspirin for heat stroke (ineffective and strains liver/kidneys)."
    ],
    warningNote: "Hot, dry skin with cessation of sweating and mental confusion indicates heat stroke, a life-threatening medical emergency requiring immediate hospitalization."
  },
  {
    id: "child-fever-management",
    category: "pediatric",
    title: "Pediatric High Fever & Febrile Fits",
    iconName: "Baby",
    shortDesc: "Safe temperature management for infants and children in rural homes.",
    dos: [
      "Dress Lightly: Remove heavy blankets and sweaters. Dress in a single thin layer of cotton.",
      "Lukewarm Sponging: Use a cloth dampened in lukewarm tap water (approx 30°C) across forehead and body for 15-20 minutes.",
      "Continuous Hydration: Encourage frequent small amounts of breast milk, clean water, or thin soups.",
      "Keep Cool Airflow: Maintain adequate ventilation and airflow in the room."
    ],
    donts: [
      "NEVER use ice water, cold showers, or alcohol rubs.",
      "NEVER bundle a feverish child in quilts to 'sweat out' the fever.",
      "NEVER give aspirin to children or teenagers."
    ],
    warningNote: "Any baby under 3 months old with fever >38°C (100.4°F), or any child with persistent vomiting, stiff neck, purple skin spots, or seizing, must be taken to a hospital immediately."
  },
  {
    id: "choking-unconscious-recovery",
    category: "respiratory",
    title: "Unconscious Breathing & Lateral Recovery Position",
    iconName: "Activity",
    shortDesc: "Preventing airway obstruction in fainting, post-seizure, or unconscious patients.",
    dos: [
      "Airway Check: Gently tilt head back and lift chin to ensure airway is open and tongue isn't blocking throat.",
      "Roll to Recovery Position: Turn patient onto their side, bend top leg at knee for stability, and tuck top hand under cheek.",
      "Check Breathing: Watch chest rise and listen for breath sounds regularly.",
      "Loosen Tight Collar: Unbutton shirt around throat and chest."
    ],
    donts: [
      "NEVER pour water or medicine into the mouth of an unconscious person.",
      "NEVER force objects, keys, or spoons between the teeth during a seizure.",
      "NEVER leave an unconscious patient lying flat on their back."
    ],
    warningNote: "If the patient stops breathing or turns blue, begin continuous chest compressions (hands centered on breastbone, 100-120 beats per minute) and arrange emergency transport."
  }
];
