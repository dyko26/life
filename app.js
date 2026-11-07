/**
 * ============================================================================
 * ATLETA ZEN - PWA PERSONAL DE SALUD, RUNNING & NUTRICIÓN
 * ============================================================================
 * Optimizado para Celulares / Mobile-First PWA (iOS & Android)
 * Algoritmos: Jack Daniels VDOT, Mifflin-St Jeor TMB/TDEE dinámico,
 *             Pérdida de líquidos por volumen/intensidad, Motor de alertas cruzadas.
 */

// ============================================================================
// 1. CONSTANTES, CITAS FILOSÓFICAS Y BASE DE DATOS LOCAL DE ALIMENTOS
// ============================================================================

const PHILOSOPHICAL_QUOTES = [
  {
    quote: "Al amanecer, cuando de mala gana te levantes, ten presente: me despierto para hacer la tarea de un ser humano.",
    author: "Marco Aurelio",
    work: "Meditaciones, Libro V",
    tag: "Estoicismo"
  },
  {
    quote: "No nos falta valor para emprender las cosas porque sean difíciles, sino que son difíciles porque nos falta valor.",
    author: "Séneca",
    work: "Epístolas a Lucilio, CV",
    tag: "Estoicismo"
  },
  {
    quote: "Ningún toro se convierte en héroe de repente, ni el hombre nace grande; debe ejercitarse con dureza en invierno y prepararse.",
    author: "Epicteto",
    work: "Discursos, Libro I",
    tag: "Disciplina Clásica"
  },
  {
    quote: "Somos lo que hacemos día tras día de modo excelente; la excelencia, por tanto, no es un acto, sino un hábito.",
    author: "Aristóteles",
    work: "Ética a Nicómaco",
    tag: "Filosofía Clásica"
  },
  {
    quote: "Es una pena para un hombre envejecer sin ver la belleza y la fuerza de la que su cuerpo es capaz.",
    author: "Sócrates",
    work: "Memorables (Jenofonte)",
    tag: "Filosofía Griega"
  },
  {
    quote: "Aquel que tiene un porqué para vivir se puede enfrentar a todos los 'cómos'.",
    author: "Friedrich Nietzsche",
    work: "El crepúsculo de los ídolos",
    tag: "Filología & Vitalismo"
  },
  {
    quote: "El término 'áskesis' (ἄσκησις) significaba originalmente el entrenamiento físico y riguroso del atleta antes de trasladarse a la disciplina del alma.",
    author: "Filología Clásica",
    work: "Etimología Griega",
    tag: "Filología"
  },
  {
    quote: "Nadie se baña dos veces en el mismo río, porque todo fluye y nada permanece inmóvil. El carácter del hombre es su destino.",
    author: "Heráclito de Éfeso",
    work: "Fragmentos (Diels-Kranz)",
    tag: "Presocráticos"
  },
  {
    quote: "Pueden porque creen que pueden (Possunt, quia posse videntur).",
    author: "Virgilio",
    work: "La Eneida, Libro V",
    tag: "Clásicos Latinos"
  },
  {
    quote: "Siempre ser el mejor y sobresalir por encima de los demás en valor y esfuerzo.",
    author: "Homero",
    work: "Ilíada, Canto VI",
    tag: "Épica Griega"
  },
  {
    quote: "Si te afliges por alguna causa externa, no es ella lo que te perturba, sino tu propio juicio sobre ella. Y en tu poder está anularlo.",
    author: "Marco Aurelio",
    work: "Meditaciones, Libro VIII",
    tag: "Estoicismo"
  },
  {
    quote: "La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.",
    author: "Séneca",
    work: "Tratados Morales",
    tag: "Estoicismo"
  },
  {
    quote: "Primero dite a ti mismo quién quieres ser; luego haz lo que tengas que hacer.",
    author: "Epicteto",
    work: "Discursos, Libro III",
    tag: "Estoicismo"
  },
  {
    quote: "El esfuerzo continuo, incansable y metódico vence donde la brillantez efímera desiste.",
    author: "Píndaro",
    work: "Odas Olímpicas",
    tag: "Filología & Lírica"
  },
  {
    quote: "La paciencia y la perseverancia tienen un efecto mágico ante el cual las dificultades desaparecen y los obstáculos se desvanecen.",
    author: "Cicerón",
    work: "De Officiis",
    tag: "Humanismo Clásico"
  },
  {
    quote: "Cuanto más dura es la batalla, más dulce es el triunfo. El atleta curtido en el frío no teme al viento de la competición.",
    author: "Plutarco",
    work: "Vidas Paralelas",
    tag: "Historia Clásica"
  },
  {
    quote: "No busques que los acontecimientos sucedan como tú deseas, sino desea que sucedan como suceden y serás feliz.",
    author: "Epicteto",
    work: "Enquiridión",
    tag: "Estoicismo"
  },
  {
    quote: "La vida es como una carrera de relevos donde cada mañana recibes el testigo de ti mismo.",
    author: "Séneca",
    work: "Cartas Morales",
    tag: "Estoicismo"
  },
  {
    quote: "El alma se tiñe del color de sus pensamientos. Tiñe la tuya con pensamientos de fortaleza, sobriedad y constancia.",
    author: "Marco Aurelio",
    work: "Meditaciones, Libro V",
    tag: "Estoicismo"
  },
  {
    quote: "Quien no es capaz de soportar la monotonía del entrenamiento jamás probará el néctar de la victoria.",
    author: "Aristóteles",
    work: "Retórica",
    tag: "Filosofía Clásica"
  }
];

// Base de datos de alimentos precargados (Enfoque corredor de fondo)
const FOOD_DATABASE = [
  { id: "f_1", name: "Avena con leche semidesnatada y plátano", portion: "1 tazón (80g avena + 200ml leche + 1 plátano)", calories: 430, carbs: 76, protein: 16, fat: 7, category: "Desayuno" },
  { id: "f_2", name: "Pechuga de pollo a la plancha con arroz blanco y verduras", portion: "Plato estándar (150g pollo + 100g arroz en seco)", calories: 510, carbs: 65, protein: 44, fat: 6, category: "Almuerzo" },
  { id: "f_3", name: "Pasta integral con atún al natural y salsa de tomate casera", portion: "1 plato hondo (100g pasta + 2 latas atún)", calories: 520, carbs: 75, protein: 38, fat: 5, category: "Almuerzo/Cena" },
  { id: "f_4", name: "Huevos revueltos (2 u.) con 2 tostadas de masa madre y aguacate", portion: "Ración completa", calories: 390, carbs: 32, protein: 18, fat: 21, category: "Desayuno" },
  { id: "f_5", name: "Batido recuperador: Proteína Whey + Leche + Plátano + 30g Avena", portion: "Vaso batidor 450ml", calories: 380, carbs: 48, protein: 34, fat: 5, category: "Post-Entreno" },
  { id: "f_6", name: "Yogur griego natural (200g) con miel (15g) y nueces (20g)", portion: "1 tazón mediano", calories: 320, carbs: 24, protein: 19, fat: 16, category: "Snack" },
  { id: "f_7", name: "3 Dátiles Medjool con mantequilla de maní natural (15g)", portion: "Snack rápido pre-entreno", calories: 260, carbs: 50, protein: 5, fat: 8, category: "Pre-Entreno" },
  { id: "f_8", name: "Boniato/Camote asado (200g) con filete de salmón (120g)", portion: "1 plato cena", calories: 470, carbs: 42, protein: 32, fat: 18, category: "Cena" },
  { id: "f_9", name: "Lentejas guisadas con arroz integral y verduras", portion: "1 plato hondo tradicional", calories: 440, carbs: 68, protein: 22, fat: 6, category: "Almuerzo" },
  { id: "f_10", name: "Gel energético de carbohidratos (Maltodextrina + Fructosa)", portion: "1 sobre (40g)", calories: 100, carbs: 25, protein: 0, fat: 0, category: "Durante Entreno" },
  { id: "f_11", name: "Sandwich de pan integral con pavo braseado y tomate", portion: "2 rebanadas pan + 80g pavo", calories: 260, carbs: 32, protein: 21, fat: 4, category: "Snack" },
  { id: "f_12", name: "Manzana con un puñado de almendras tostadas (25g)", portion: "1 manzana mediana + frutos secos", calories: 210, carbs: 24, protein: 6, fat: 12, category: "Snack" },
  { id: "f_13", name: "Ensalada de quinoa con garbanzos, espinacas y aceite de oliva", portion: "1 bol grande", calories: 430, carbs: 58, protein: 16, fat: 15, category: "Almuerzo/Cena" },
  { id: "f_14", name: "Tortilla francesa (2 huevos) con queso fresco y espinacas", portion: "1 ración ligera", calories: 280, carbs: 4, protein: 22, fat: 19, category: "Cena" }
];

// Perfil inicial del usuario por defecto
const DEFAULT_USER_PROFILE = {
  age: 24,
  weight: 52,        // kg
  height: 164,       // cm
  gender: "male",
  activityLevel: 1.2, // Base sin entrenar (NEAT ligero)
  trainingDaysPerWeek: 6,
  metrics: {
    m1000Recent: "3:30",
    m1000PR: "3:22",
    k5Recent: "19:26",
    k5PR: "18:44"
  },
  goals: {
    k5Target: "17:59", // Sub 18:00
    k10Target: "36:59" // Sub 37:00
  },
  currentVDOT: 51.52, // Calculado a partir de 5K en 19:26
  shoes: [
    { id: "shoe_1", name: "Asics GT-1000 10", role: "Recuperación & Rodajes Suaves", km: 245, maxKm: 700, color: "text-sky-400" },
    { id: "shoe_2", name: "Adidas Adizero Boston 11", role: "Series VO2max, Tempo & Tirada Larga", km: 180, maxKm: 650, color: "text-amber-400" },
    { id: "shoe_3", name: "Olimpicus Corre 2", role: "Rodajes Aeróbicos Medios & Versatilidad", km: 115, maxKm: 600, color: "text-emerald-400" }
  ]
};

// Misiones fijas requeridas
const DEFAULT_DAILY_HABITS = [
  { id: "h_1", label: "Despertar a las 4:30 am", icon: "alarm", detail: "Activación temprana y disciplina estoica", fixed: true },
  { id: "h_2", label: "Desayunar", icon: "breakfast", detail: "Carga de energía y resíntesis matutina", fixed: true },
  { id: "h_3", label: "Entrenar", icon: "run", detail: "Cumplir la sesión programada del plan semanal", fixed: true },
  { id: "h_4", label: "Leer", icon: "book", detail: "Mínimo 30 minutos de lectura profunda / filología", fixed: true },
  { id: "h_5", label: "Buscar trabajo / Trabajar", icon: "briefcase", detail: "Enfoque laboral y desarrollo profesional", fixed: true }
];

// Medicamentos iniciales por defecto (CRUD listo)
const DEFAULT_MEDICATIONS = [
  {
    id: "med_1",
    name: "Complejo B & Multivitamínico",
    dose: "1 cápsula",
    times: "07:00",
    frequency: "Diario",
    notes: "Tomar junto con el desayuno"
  },
  {
    id: "med_2",
    name: "Citrato de Magnesio",
    dose: "350 mg",
    times: "21:30",
    frequency: "Diario (Noche)",
    notes: "Favorece la relajación muscular y recuperación nerviosa"
  },
  {
    id: "med_3",
    name: "Omega 3 EPA/DHA",
    dose: "1 perla (1000 mg)",
    times: "13:30",
    frequency: "Diario con almuerzo",
    notes: "Antiinflamatorio natural para corredores"
  }
];

// Función para retroalimentación háptica en celulares
function triggerHaptic(duration = 10) {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(duration);
    } catch (e) {
      // Ignorar si no está soportado en iOS
    }
  }
}

// ============================================================================
// 2. ALGORITMOS DE RUNNING & FISIOLOGÍA (JACK DANIELS VDOT)
// ============================================================================

function timeStrToSeconds(str) {
  if (!str) return 0;
  const parts = str.split(':').map(Number);
  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1];
  } else if (parts.length === 3) {
    return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  }
  return Number(str) || 0;
}

function secondsToTimeStr(totalSeconds) {
  if (isNaN(totalSeconds) || totalSeconds <= 0) return "--:--";
  const rounded = Math.round(totalSeconds);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function calculateVDOT(distanceMeters, timeSeconds) {
  if (!distanceMeters || !timeSeconds || timeSeconds <= 0) return 51.5;
  const timeMinutes = timeSeconds / 60;
  const v = distanceMeters / timeMinutes; // m/min

  const vo2Cost = -4.60 + (0.182258 * v) + (0.000104 * Math.pow(v, 2));
  const percentVO2Max = 0.8 + 
    (0.1894393 * Math.exp(-0.012778 * timeMinutes)) + 
    (0.2989558 * Math.exp(-0.1932605 * timeMinutes));

  if (percentVO2Max <= 0) return 51.5;
  const vdot = vo2Cost / percentVO2Max;
  return parseFloat(vdot.toFixed(2));
}

function getPaceFromVDOTIntensity(vdot, intensityFraction) {
  const targetVO2 = vdot * intensityFraction;
  const a = 0.000104;
  const b = 0.182258;
  const c = -(4.60 + targetVO2);

  const discriminant = Math.pow(b, 2) - (4 * a * c);
  if (discriminant < 0) return 300;

  const v = (-b + Math.sqrt(discriminant)) / (2 * a);
  const secondsPerKm = (1000 / v) * 60;
  return secondsPerKm;
}

function calculatePaceZones(vdot) {
  const eFastSec = getPaceFromVDOTIntensity(vdot, 0.71);
  const eSlowSec = getPaceFromVDOTIntensity(vdot, 0.62);

  const mFastSec = getPaceFromVDOTIntensity(vdot, 0.80);
  const mSlowSec = getPaceFromVDOTIntensity(vdot, 0.75);

  const tFastSec = getPaceFromVDOTIntensity(vdot, 0.88);
  const tSlowSec = getPaceFromVDOTIntensity(vdot, 0.86);

  const iFastSec = getPaceFromVDOTIntensity(vdot, 0.98);
  const iSlowSec = getPaceFromVDOTIntensity(vdot, 0.95);

  const rFastSec = getPaceFromVDOTIntensity(vdot, 1.10);
  const rSlowSec = getPaceFromVDOTIntensity(vdot, 1.05);

  return {
    E: {
      name: "Easy / Recuperación (E)",
      rangeStr: `${secondsToTimeStr(eFastSec)} - ${secondsToTimeStr(eSlowSec)} /km`,
      hrRange: "65 - 75% FCmáx",
      purpose: "Adaptaciones mitocondriales y volumen seguro.",
      color: "emerald"
    },
    M: {
      name: "Maratón / Rodaje Vivo (M)",
      rangeStr: `${secondsToTimeStr(mFastSec)} - ${secondsToTimeStr(mSlowSec)} /km`,
      hrRange: "75 - 84% FCmáx",
      purpose: "Ritmo de crucero y tiradas progresivas.",
      color: "sky"
    },
    T: {
      name: "Umbral de Lactato / Tempo (T)",
      rangeStr: `${secondsToTimeStr(tFastSec)} - ${secondsToTimeStr(tSlowSec)} /km`,
      hrRange: "86 - 88% FCmáx",
      purpose: "Clave para 5K sub 18:00 y 10K sub 37:00.",
      color: "amber"
    },
    I: {
      name: "Series VO2max / Intervalos (I)",
      rangeStr: `${secondsToTimeStr(iFastSec)} - ${secondsToTimeStr(iSlowSec)} /km`,
      hrRange: "95 - 100% FCmáx",
      purpose: "Potencia aeróbica máxima (ej. 5x1000m).",
      color: "rose"
    },
    R: {
      name: "Repetición / Velocidad Pura (R)",
      rangeStr: `${secondsToTimeStr(rFastSec)} - ${secondsToTimeStr(rSlowSec)} /km`,
      hrRange: "Anaeróbico",
      purpose: "Economía y velocidad terminal de 1000m.",
      color: "purple"
    }
  };
}

function generateWeeklyTrainingPlan(vdot) {
  const zones = calculatePaceZones(vdot);

  const plan = [
    {
      dayIndex: 1,
      shortName: "Lun",
      dayName: "Lunes",
      type: "Rodaje Regenerativo + Rectas",
      intensity: "Recuperación",
      intensityFactor: 1.02,
      totalKm: 8,
      suggestedPace: zones.E.rangeStr,
      suggestedShoe: "Asics GT-1000 10",
      description: "8 km continuos muy cómodos en Zona E suave. Al terminar, movilidad articular y 4 rectas progresivas de 100m para soltar piernas.",
      color: "emerald"
    },
    {
      dayIndex: 2,
      shortName: "Mar",
      dayName: "Martes",
      type: "Calidad VO2max: 5x1000m",
      intensity: "Alta Intensidad (Series)",
      intensityFactor: 1.22,
      totalKm: 9,
      suggestedPace: `5x1000m @ ${zones.I.rangeStr} (rec. 2')`,
      suggestedShoe: "Adidas Adizero Boston 11",
      description: "2 km calentamiento + 5 series de 1000m clavando Zona I con 2 minutos de recuperación al trote + 2 km enfriamiento regenerativo.",
      color: "rose"
    },
    {
      dayIndex: 3,
      shortName: "Mié",
      dayName: "Miércoles",
      type: "Rodaje Aeróbico de Mantenimiento",
      intensity: "Medio Aeróbico",
      intensityFactor: 1.05,
      totalKm: 10,
      suggestedPace: zones.E.rangeStr,
      suggestedShoe: "Olimpicus Corre 2",
      description: "10 km continuos y fluidos en Zona E media. Mantén cadencia alta (alrededor de 178-182 ppm) para optimizar la reactividad.",
      color: "sky"
    },
    {
      dayIndex: 4,
      shortName: "Jue",
      dayName: "Jueves",
      type: "Calidad Umbral: Tempo Run 6K",
      intensity: "Alta Intensidad (Tempo/Umbral)",
      intensityFactor: 1.15,
      totalKm: 10,
      suggestedPace: `6 km @ ${zones.T.rangeStr}`,
      suggestedShoe: "Adidas Adizero Boston 11",
      description: "2 km calentamiento + 6 km sostenidos a ritmo Umbral de Lactato (Zona T) + 2 km soltar. Esencial para romper 18:00 en 5K.",
      color: "amber"
    },
    {
      dayIndex: 5,
      shortName: "Vie",
      dayName: "Viernes",
      type: "Recuperación Activa & Soltar",
      intensity: "Muy Suave / Regenerativo",
      intensityFactor: 1.00,
      totalKm: 7,
      suggestedPace: zones.E.rangeStr,
      suggestedShoe: "Asics GT-1000 10",
      description: "7 km muy tranquilos para oxigenar las piernas antes del fondo del fin de semana. Sesión breve de foam roller.",
      color: "emerald"
    },
    {
      dayIndex: 6,
      shortName: "Sáb",
      dayName: "Sábado",
      type: "Tirada Larga Progresiva (Long Run)",
      intensity: "Fondo & Resistencia",
      intensityFactor: 1.10,
      totalKm: 16,
      suggestedPace: `13 km Zona E + 3 km finales @ ${zones.M.rangeStr}`,
      suggestedShoe: "Adidas Adizero Boston 11",
      description: "16 km totales. Inicia en Zona E controlada y en los últimos 3 km acelera progresivamente hasta ritmo Maratón (Zona M).",
      color: "purple"
    },
    {
      dayIndex: 0,
      shortName: "Dom",
      dayName: "Domingo",
      type: "Descanso Total & Asimilación",
      intensity: "Descanso",
      intensityFactor: 0,
      totalKm: 0,
      suggestedPace: "N/A",
      suggestedShoe: "Descanso",
      description: "Descanso completo. La supercompensación y adaptaciones ocurren en reposo. Hidratación abundante y buena comida.",
      color: "zinc"
    }
  ];

  return plan;
}

// ============================================================================
// 3. MOTOR METABÓLICO, NUTRICIÓN E HIDRATACIÓN
// ============================================================================

function calculateBMR(weightKg, heightCm, ageYears, gender = "male") {
  const base = (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears);
  return gender === "male" ? Math.round(base + 5) : Math.round(base - 161);
}

function calculateWorkoutBurn(distanceKm, weightKg, intensityFactor = 1.05) {
  if (!distanceKm || distanceKm <= 0) return 0;
  return Math.round(distanceKm * weightKg * intensityFactor);
}

function calculateDynamicTDEE(weightKg, heightCm, ageYears, workoutCaloriesToday, activityLevel = 1.2) {
  const bmr = calculateBMR(weightKg, heightCm, ageYears);
  const baselineTDEE = Math.round(bmr * activityLevel);
  return {
    bmr,
    baselineTDEE,
    workoutCalories: workoutCaloriesToday,
    totalTDEE: baselineTDEE + workoutCaloriesToday
  };
}

function calculateDynamicHydrationGoal(weightKg, distanceKmToday = 0, intensityFactor = 1.05) {
  const baseWater = Math.round(weightKg * 40); // 52 kg = 2080 ml
  const sweatLoss = Math.round(distanceKmToday * (intensityFactor > 1.1 ? 80 : 65));
  return {
    baseWater,
    sweatLoss,
    totalWaterGoal: baseWater + sweatLoss
  };
}

// ============================================================================
// 4. GESTIÓN DEL ESTADO Y LOCALSTORAGE
// ============================================================================

const STORAGE_KEYS = {
  PROFILE: "vita_user_profile_v1",
  WORKOUT_LOGS: "vita_workout_logs_v1",
  HABITS: "vita_daily_habits_v1",
  MEDICATIONS: "vita_medications_v1",
  MEALS: "vita_meals_v1",
  HYDRATION: "vita_hydration_v1",
  ACTIVE_TAB: "vita_active_tab_v1"
};

class StateManager {
  constructor() {
    this.profile = this.load(STORAGE_KEYS.PROFILE, DEFAULT_USER_PROFILE);
    this.workoutLogs = this.load(STORAGE_KEYS.WORKOUT_LOGS, []);
    this.medications = this.load(STORAGE_KEYS.MEDICATIONS, DEFAULT_MEDICATIONS);
    this.habits = this.load(STORAGE_KEYS.HABITS, {});
    this.meals = this.load(STORAGE_KEYS.MEALS, {});
    this.hydration = this.load(STORAGE_KEYS.HYDRATION, {});
    
    if (!this.profile.currentVDOT) {
      this.recalculateUserVDOT();
    }
  }

  load(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error cargando ${key}:`, e);
      return defaultValue;
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error guardando ${key}:`, e);
    }
  }

  getTodayKey() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getTodayHabits() {
    const todayKey = this.getTodayKey();
    if (!this.habits[todayKey]) {
      this.habits[todayKey] = DEFAULT_DAILY_HABITS.map(h => ({
        ...h,
        completed: false
      }));
      this.save(STORAGE_KEYS.HABITS, this.habits);
    }
    return this.habits[todayKey];
  }

  toggleHabit(habitId) {
    triggerHaptic(15);
    const todayKey = this.getTodayKey();
    const list = this.getTodayHabits();
    const habit = list.find(h => h.id === habitId);
    if (habit) {
      habit.completed = !habit.completed;
      this.habits[todayKey] = list;
      this.save(STORAGE_KEYS.HABITS, this.habits);
    }
    return list;
  }

  addCustomHabit(label) {
    if (!label.trim()) return;
    triggerHaptic(12);
    const todayKey = this.getTodayKey();
    const list = this.getTodayHabits();
    const newHabit = {
      id: "h_custom_" + Date.now(),
      label: label.trim(),
      icon: "check",
      detail: "Hábito personalizado",
      fixed: false,
      completed: false
    };
    list.push(newHabit);
    this.habits[todayKey] = list;
    this.save(STORAGE_KEYS.HABITS, this.habits);
    return list;
  }

  getTodayMeals() {
    const todayKey = this.getTodayKey();
    return this.meals[todayKey] || [];
  }

  addMeal(meal) {
    triggerHaptic(12);
    const todayKey = this.getTodayKey();
    if (!this.meals[todayKey]) this.meals[todayKey] = [];
    const newMeal = {
      id: "meal_" + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...meal
    };
    this.meals[todayKey].push(newMeal);
    this.save(STORAGE_KEYS.MEALS, this.meals);
    return newMeal;
  }

  deleteMeal(mealId) {
    triggerHaptic(10);
    const todayKey = this.getTodayKey();
    if (!this.meals[todayKey]) return;
    this.meals[todayKey] = this.meals[todayKey].filter(m => m.id !== mealId);
    this.save(STORAGE_KEYS.MEALS, this.meals);
  }

  getTodayHydration() {
    const todayKey = this.getTodayKey();
    return this.hydration[todayKey] || 0;
  }

  addHydration(amountMl) {
    triggerHaptic(15);
    const todayKey = this.getTodayKey();
    const current = this.getTodayHydration();
    const updated = Math.max(0, current + amountMl);
    this.hydration[todayKey] = updated;
    this.save(STORAGE_KEYS.HYDRATION, this.hydration);
    return updated;
  }

  getMedications() {
    return this.medications;
  }

  saveMedication(med) {
    triggerHaptic(12);
    if (med.id) {
      const idx = this.medications.findIndex(m => m.id === med.id);
      if (idx !== -1) {
        this.medications[idx] = { ...this.medications[idx], ...med };
      }
    } else {
      const newMed = {
        id: "med_" + Date.now(),
        ...med,
        takenToday: false
      };
      this.medications.push(newMed);
    }
    this.save(STORAGE_KEYS.MEDICATIONS, this.medications);
  }

  deleteMedication(medId) {
    triggerHaptic(10);
    this.medications = this.medications.filter(m => m.id !== medId);
    this.save(STORAGE_KEYS.MEDICATIONS, this.medications);
  }

  toggleMedicationTaken(medId) {
    triggerHaptic(15);
    const todayKey = this.getTodayKey();
    const med = this.medications.find(m => m.id === medId);
    if (med) {
      if (!med.intakeHistory) med.intakeHistory = {};
      const wasTaken = !!med.intakeHistory[todayKey];
      if (wasTaken) {
        delete med.intakeHistory[todayKey];
      } else {
        med.intakeHistory[todayKey] = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      this.save(STORAGE_KEYS.MEDICATIONS, this.medications);
    }
  }

  getTodayWorkoutLog() {
    const todayKey = this.getTodayKey();
    return this.workoutLogs.find(w => w.date === todayKey);
  }

  addWorkoutLog(workout) {
    triggerHaptic(20);
    const todayKey = this.getTodayKey();
    const newLog = {
      id: "run_" + Date.now(),
      date: workout.date || todayKey,
      ...workout
    };

    if (workout.shoeId && workout.distanceKm) {
      const shoe = this.profile.shoes.find(s => s.id === workout.shoeId);
      if (shoe) {
        shoe.km = parseFloat((shoe.km + Number(workout.distanceKm)).toFixed(1));
        this.save(STORAGE_KEYS.PROFILE, this.profile);
      }
    }

    this.workoutLogs.unshift(newLog);
    this.save(STORAGE_KEYS.WORKOUT_LOGS, this.workoutLogs);
    this.adaptVDOTFromWorkout(newLog);
    return newLog;
  }

  deleteWorkoutLog(logId) {
    triggerHaptic(10);
    this.workoutLogs = this.workoutLogs.filter(w => w.id !== logId);
    this.save(STORAGE_KEYS.WORKOUT_LOGS, this.workoutLogs);
  }

  recalculateUserVDOT() {
    const sec5K = timeStrToSeconds(this.profile.metrics.k5Recent || "19:26");
    const vdot = calculateVDOT(5000, sec5K);
    this.profile.currentVDOT = vdot;
    this.save(STORAGE_KEYS.PROFILE, this.profile);
    return vdot;
  }

  adaptVDOTFromWorkout(log) {
    const distMeters = log.distanceKm * 1000;
    const timeSec = timeStrToSeconds(log.timeStr);
    if (!timeSec || !distMeters) return;

    const sessionVDOT = calculateVDOT(distMeters, timeSec);
    const currentVDOT = this.profile.currentVDOT || 51.52;

    if (log.type.includes("VO2max") || log.type.includes("Carrera") || log.type.includes("Tempo")) {
      const paceSec = timeSec / log.distanceKm;
      if (sessionVDOT > currentVDOT) {
        const delta = Math.min(0.4, parseFloat(((sessionVDOT - currentVDOT) * 0.25).toFixed(2)));
        if (delta > 0.05) {
          const oldVDOT = currentVDOT;
          this.profile.currentVDOT = parseFloat((currentVDOT + delta).toFixed(2));
          this.save(STORAGE_KEYS.PROFILE, this.profile);
          this.lastAdaptationNotice = {
            type: "increase",
            oldVDOT,
            newVDOT: this.profile.currentVDOT,
            delta,
            message: `¡Supercompensación detectada! Tu sesión de ${log.distanceKm} km a ${secondsToTimeStr(paceSec)}/km demuestra mejor economía. Tu VDOT ascendió de ${oldVDOT} a ${this.profile.currentVDOT}. Todos tus ritmos del plan semanal se han ajustado automáticamente.`
          };
          return;
        }
      }
    }
  }
}

const state = new StateManager();

// ============================================================================
// 5. MOTOR DE ALERTAS Y FEEDBACK CRUZADO
// ============================================================================

function generateCrossModuleAlerts() {
  const alerts = [];
  const todayKey = state.getTodayKey();
  const now = new Date();
  const currentHour = now.getHours();

  const dayIndex = now.getDay();
  const weeklyPlan = generateWeeklyTrainingPlan(state.profile.currentVDOT);
  const plannedToday = weeklyPlan.find(p => p.dayIndex === dayIndex);
  const loggedWorkout = state.getTodayWorkoutLog();

  const isHighIntensity = (loggedWorkout && (loggedWorkout.type.includes("VO2max") || loggedWorkout.type.includes("Tempo") || loggedWorkout.type.includes("Series"))) ||
                          (plannedToday && plannedToday.intensity.includes("Alta Intensidad"));

  const workoutCaloriesToday = loggedWorkout 
    ? calculateWorkoutBurn(loggedWorkout.distanceKm, state.profile.weight, loggedWorkout.intensityFactor || 1.15)
    : 0;

  const tdeeData = calculateDynamicTDEE(
    state.profile.weight,
    state.profile.height,
    state.profile.age,
    workoutCaloriesToday,
    state.profile.activityLevel
  );

  const todayMeals = state.getTodayMeals();
  const totalCaloriesConsumed = todayMeals.reduce((acc, m) => acc + Number(m.calories || 0), 0);

  const hydrationData = calculateDynamicHydrationGoal(
    state.profile.weight,
    loggedWorkout ? Number(loggedWorkout.distanceKm) : (plannedToday ? plannedToday.totalKm : 0),
    isHighIntensity ? 1.2 : 1.05
  );
  const currentWater = state.getTodayHydration();
  const waterPercent = Math.round((currentWater / hydrationData.totalWaterGoal) * 100);

  // ALERTA 1: Déficit Calórico Severo
  const caloricDeficit = tdeeData.totalTDEE - totalCaloriesConsumed;
  if ((isHighIntensity || workoutCaloriesToday > 400) && caloricDeficit > 550 && currentHour >= 13) {
    alerts.push({
      id: "alert_caloric_deficit",
      level: "critical",
      title: "Riesgo de Déficit Calórico Severo",
      message: `Gastaste ${workoutCaloriesToday} kcal en tu sesión y solo has ingerido ${totalCaloriesConsumed} kcal de tu TDEE (${tdeeData.totalTDEE} kcal). Déficit: -${caloricDeficit} kcal. Ingiere carbohidratos complejos y proteína para evitar catabolismo muscular.`,
      action: "Registrar Comida",
      targetTab: "tab-nutrition"
    });
  }

  // ALERTA 2: Hidratación a las 4:00 PM
  if (currentHour >= 16 && currentWater < (hydrationData.totalWaterGoal * 0.70)) {
    const pendingWater = hydrationData.totalWaterGoal - currentWater;
    alerts.push({
      id: "alert_dehydration_4pm",
      level: "warning",
      title: "Alerta de Hidratación (Superadas las 4:00 PM)",
      message: `Llevas ${currentWater} ml de tu meta dinámica de ${hydrationData.totalWaterGoal} ml (${waterPercent}%). La deshidratación eleva el pulso cardíaco en reposo. Bebe al menos ${pendingWater} ml antes de descansar.`,
      action: "+500 ml Agua",
      targetAction: "add_water_500"
    });
  }

  // ALERTA 3: Medicamentos pendientes
  const pendingMeds = state.getMedications().filter(m => !m.intakeHistory || !m.intakeHistory[todayKey]);
  if (pendingMeds.length > 0) {
    const overdueMeds = pendingMeds.filter(m => {
      if (!m.times) return false;
      const [medH] = m.times.split(':').map(Number);
      return currentHour >= medH;
    });

    if (overdueMeds.length > 0) {
      alerts.push({
        id: "alert_meds_overdue",
        level: "info",
        title: "Toma de Medicación Pendiente",
        message: `Tomas atrasadas: ${overdueMeds.map(m => `${m.name} (${m.dose})`).join(', ')}.`,
        action: "Ver Meds",
        targetTab: "tab-medications"
      });
    }
  }

  // ALERTA 4: Desgaste de zapatillas
  state.profile.shoes.forEach(shoe => {
    if (shoe.km >= shoe.maxKm * 0.85) {
      alerts.push({
        id: `alert_shoe_${shoe.id}`,
        level: "warning",
        title: `Zapatillas al 85%: ${shoe.name}`,
        message: `Llevas ${shoe.km} de ${shoe.maxKm} km recomendados. Revisa el desgaste de la mediasuela para prevenir periostitis.`,
        action: "Ver Zapatos",
        targetTab: "tab-running"
      });
    }
  });

  if (state.lastAdaptationNotice) {
    alerts.push({
      id: "alert_vdot_adapted",
      level: "success",
      title: "¡Adaptación Fisiológica Recalculada!",
      message: state.lastAdaptationNotice.message,
      action: "Ver Ritmos",
      targetTab: "tab-running"
    });
  }

  return alerts;
}

// ============================================================================
// 6. RENDERIZADO DEL DOM Y CONTROLADORES MÓVILES
// ============================================================================

let currentSelectedPlanDay = new Date().getDay(); // Día seleccionado en el planificador

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  setupNavigation();
  setupEventListeners();
  renderAll();
  registerPWA();
}

function setupNavigation() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      triggerHaptic(12);
      const targetId = btn.getAttribute("data-tab-target");
      switchTab(targetId);
    });
  });

  const savedTab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB) || "tab-dashboard";
  switchTab(savedTab);
}

function switchTab(targetId) {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  const tabContents = document.querySelectorAll(".tab-content");

  tabContents.forEach(content => {
    if (content.id === targetId) {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });

  tabButtons.forEach(btn => {
    const isTarget = btn.getAttribute("data-tab-target") === targetId;
    if (btn.classList.contains("tab-btn")) {
      // Barra inferior móvil
      if (isTarget) {
        btn.classList.add("active", "text-emerald-400");
        btn.classList.remove("text-slate-400");
      } else {
        btn.classList.remove("active", "text-emerald-400");
        btn.classList.add("text-slate-400");
      }
    } else {
      // Barra de escritorio
      if (isTarget) {
        btn.classList.add("text-emerald-400", "border-emerald-400", "bg-slate-800/80");
        btn.classList.remove("text-slate-400", "border-transparent");
      } else {
        btn.classList.remove("text-emerald-400", "border-emerald-400", "bg-slate-800/80");
        btn.classList.add("text-slate-400", "border-transparent");
      }
    }
  });

  localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, targetId);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  renderHeaderStatus();
  renderDailyQuote();
  renderDailyHabits();
  renderAlerts();
  renderDailyProgress();
  renderRunningModule();
  renderNutritionModule();
  renderHydrationModule();
  renderMedicationsModule();
  renderProfileModal();
}

function renderHeaderStatus() {
  const badgeContainer = document.getElementById("header-user-badge");
  if (badgeContainer) {
    badgeContainer.innerHTML = `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>VDOT ${state.profile.currentVDOT}</span>
        <span class="text-slate-400 font-normal hidden xs:inline">• ${state.profile.weight}kg</span>
      </span>
    `;
  }
}

let currentQuoteIndex = -1;
function renderDailyQuote(forceRandom = false) {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const quoteWork = document.getElementById("quote-work");
  const quoteTag = document.getElementById("quote-tag");

  if (!quoteText) return;

  if (currentQuoteIndex === -1 || !forceRandom) {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    currentQuoteIndex = dayOfYear % PHILOSOPHICAL_QUOTES.length;
  } else {
    currentQuoteIndex = Math.floor(Math.random() * PHILOSOPHICAL_QUOTES.length);
  }

  const item = PHILOSOPHICAL_QUOTES[currentQuoteIndex];
  quoteText.textContent = `"${item.quote}"`;
  quoteAuthor.textContent = item.author;
  quoteWork.textContent = item.work ? `— ${item.work}` : "";
  quoteTag.textContent = item.tag;
}

function renderDailyHabits() {
  const container = document.getElementById("daily-habits-container");
  if (!container) return;

  const habits = state.getTodayHabits();
  container.innerHTML = "";

  habits.forEach(habit => {
    const isCompleted = habit.completed;
    const card = document.createElement("div");
    card.className = `flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none touch-press ${
      isCompleted 
        ? "bg-slate-900/90 border-emerald-800/50 text-slate-300 shadow-inner" 
        : "bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-100 shadow-sm"
    }`;

    card.innerHTML = `
      <div class="flex items-center gap-3 flex-1">
        <div class="w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
          isCompleted 
            ? "bg-emerald-500 border-emerald-400 text-slate-950 font-bold" 
            : "border-slate-600 bg-slate-800/60 text-transparent hover:border-emerald-500"
        }">
          <svg class="w-4 h-4 stroke-current stroke-[3] fill-none" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="flex flex-col">
          <span class="text-xs sm:text-sm font-semibold tracking-wide ${isCompleted ? 'line-through text-slate-400 font-normal' : ''}">
            ${habit.label}
          </span>
          <span class="text-[10px] text-slate-400">${habit.detail || ''}</span>
        </div>
      </div>
      ${habit.fixed ? `<span class="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">Fija</span>` : ''}
    `;

    card.addEventListener("click", () => {
      state.toggleHabit(habit.id);
      renderDailyHabits();
      renderDailyProgress();
      renderAlerts();
    });

    container.appendChild(card);
  });
}

function renderDailyProgress() {
  const progressBar = document.getElementById("daily-progress-bar");
  const progressText = document.getElementById("daily-progress-percent");
  const progressLabel = document.getElementById("daily-progress-label");
  if (!progressBar || !progressText) return;

  const todayKey = state.getTodayKey();
  const habits = state.getTodayHabits();
  const totalHabits = habits.length;
  const completedHabits = habits.filter(h => h.completed).length;
  const habitsScore = totalHabits > 0 ? (completedHabits / totalHabits) : 0;

  const meds = state.getMedications();
  const takenMeds = meds.filter(m => m.intakeHistory && m.intakeHistory[todayKey]).length;
  const medsScore = meds.length > 0 ? (takenMeds / meds.length) : 1;

  const hasWorkout = !!state.getTodayWorkoutLog();
  const workoutScore = hasWorkout ? 1 : 0;

  const currentWater = state.getTodayHydration();
  const waterGoal = calculateDynamicHydrationGoal(state.profile.weight).totalWaterGoal;
  const waterScore = Math.min(1, currentWater / waterGoal);

  const totalScore = Math.round(
    (habitsScore * 40) + 
    (medsScore * 20) + 
    (workoutScore * 20) + 
    (waterScore * 20)
  );

  progressBar.style.width = `${totalScore}%`;
  progressText.textContent = `${totalScore}%`;

  if (progressLabel) {
    if (totalScore === 100) {
      progressLabel.textContent = "¡Día Impecable! Máxima disciplina estoica";
      progressLabel.className = "text-[11px] font-semibold text-emerald-400";
    } else if (totalScore >= 70) {
      progressLabel.textContent = "Excelente avance en tus objetivos de hoy";
      progressLabel.className = "text-[11px] font-semibold text-sky-400";
    } else if (totalScore >= 40) {
      progressLabel.textContent = "Día en progreso. Mantén la inercia";
      progressLabel.className = "text-[11px] font-semibold text-amber-400";
    } else {
      progressLabel.textContent = "Cumple las primeras misiones del día";
      progressLabel.className = "text-[11px] font-semibold text-slate-400";
    }
  }
}

function renderAlerts() {
  const container = document.getElementById("alerts-container");
  if (!container) return;

  const alerts = generateCrossModuleAlerts();
  container.innerHTML = "";

  if (alerts.length === 0) {
    container.innerHTML = `
      <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-300 text-xs">
        <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
        <span>Parámetros sincronizados en equilibrio (Nutrición, Hidratación, Entrenamiento y Descanso).</span>
      </div>
    `;
    return;
  }

  alerts.forEach(alert => {
    const card = document.createElement("div");
    let borderClass = "border-slate-800 bg-slate-900/70";
    let badgeColor = "bg-slate-800 text-slate-300";

    if (alert.level === "critical") {
      borderClass = "border-rose-900/60 bg-rose-950/20 text-rose-100";
      badgeColor = "bg-rose-900/60 text-rose-300 border border-rose-700/60";
    } else if (alert.level === "warning") {
      borderClass = "border-amber-900/60 bg-amber-950/20 text-amber-100";
      badgeColor = "bg-amber-900/60 text-amber-300 border border-amber-700/60";
    } else if (alert.level === "success") {
      borderClass = "border-emerald-900/60 bg-emerald-950/20 text-emerald-100";
      badgeColor = "bg-emerald-900/60 text-emerald-300 border border-emerald-700/60";
    } else if (alert.level === "info") {
      borderClass = "border-sky-900/60 bg-sky-950/20 text-sky-100";
      badgeColor = "bg-sky-900/60 text-sky-300 border border-sky-700/60";
    }

    card.className = `p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-md ${borderClass}`;
    card.innerHTML = `
      <div class="flex items-start gap-2.5 flex-1">
        <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${badgeColor} shrink-0 mt-0.5">
          ${alert.level === 'critical' ? 'Alerta Crítica' : alert.level === 'warning' ? 'Aviso' : alert.level === 'success' ? 'Progreso' : 'Recordatorio'}
        </span>
        <div class="space-y-0.5">
          <h4 class="text-xs font-bold text-slate-100">${alert.title}</h4>
          <p class="text-[11px] text-slate-300 leading-relaxed">${alert.message}</p>
        </div>
      </div>
      ${alert.action ? `
        <button class="alert-action-btn self-end sm:self-center shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors touch-press">
          ${alert.action}
        </button>
      ` : ''}
    `;

    if (alert.action) {
      card.querySelector(".alert-action-btn").addEventListener("click", () => {
        triggerHaptic(12);
        if (alert.targetTab) {
          switchTab(alert.targetTab);
        } else if (alert.targetAction === "add_water_500") {
          state.addHydration(500);
          renderHydrationModule();
          renderDailyProgress();
          renderAlerts();
        }
      });
    }

    container.appendChild(card);
  });
}

/**
 * Módulo de Running Optimizado para Celular
 */
function renderRunningModule() {
  const vdot = state.profile.currentVDOT || 51.52;
  const zones = calculatePaceZones(vdot);
  const weeklyPlan = generateWeeklyTrainingPlan(vdot);
  const todayIndex = new Date().getDay();

  // Métricas
  const vdotCurrentDisplay = document.getElementById("running-vdot-current");
  const target5kDisplay = document.getElementById("running-goal-5k");
  const target10kDisplay = document.getElementById("running-goal-10k");
  const recent5kDisplay = document.getElementById("running-recent-5k");

  if (vdotCurrentDisplay) vdotCurrentDisplay.textContent = vdot.toFixed(1);
  if (target5kDisplay) target5kDisplay.textContent = state.profile.goals.k5Target;
  if (target10kDisplay) target10kDisplay.textContent = state.profile.goals.k10Target;
  if (recent5kDisplay) recent5kDisplay.textContent = `${state.profile.metrics.k5Recent} (PR ${state.profile.metrics.k5PR})`;

  // Barra de Selector de Días Móvil (Lun, Mar, Mié, Jue, Vie, Sáb, Dom)
  const pillsBar = document.getElementById("weekly-day-pills-bar");
  if (pillsBar) {
    pillsBar.innerHTML = "";
    // Reordenar para empezar en Lunes (1..6, 0)
    const sortedDays = [1, 2, 3, 4, 5, 6, 0];
    sortedDays.forEach(dayIdx => {
      const planItem = weeklyPlan.find(p => p.dayIndex === dayIdx);
      const isToday = dayIdx === todayIndex;
      const isSelected = dayIdx === currentSelectedPlanDay;

      const pillBtn = document.createElement("button");
      pillBtn.className = `px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 touch-press ${
        isSelected 
          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50 scale-105" 
          : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
      }`;

      pillBtn.innerHTML = `
        <span>${planItem.shortName}</span>
        ${isToday ? `<span class="w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-emerald-400'}"></span>` : ''}
      `;

      pillBtn.addEventListener("click", () => {
        triggerHaptic(10);
        currentSelectedPlanDay = dayIdx;
        renderRunningModule();
      });

      pillsBar.appendChild(pillBtn);
    });
  }

  // Tarjeta del Día Seleccionado en el Planificador
  const planContainer = document.getElementById("running-weekly-plan-container");
  if (planContainer) {
    planContainer.innerHTML = "";
    const activeItem = weeklyPlan.find(p => p.dayIndex === currentSelectedPlanDay) || weeklyPlan[0];
    const isToday = activeItem.dayIndex === todayIndex;

    const card = document.createElement("div");
    card.className = `p-4 sm:p-5 rounded-2xl border transition-all ${
      isToday 
        ? "bg-slate-900 border-emerald-500/80 ring-1 ring-emerald-500/30 shadow-xl shadow-emerald-950/30" 
        : "bg-slate-900/60 border-slate-800 text-slate-300"
    }`;

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex items-center gap-2">
          <span class="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded ${isToday ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}">
            ${activeItem.dayName} ${isToday ? '• HOY' : ''}
          </span>
          <span class="text-[11px] font-semibold text-slate-400">${activeItem.intensity}</span>
        </div>
        <span class="font-mono text-sm font-black text-slate-100">${activeItem.totalKm > 0 ? `${activeItem.totalKm} km` : 'Descanso'}</span>
      </div>

      <h4 class="text-sm font-bold text-slate-100 mb-1">${activeItem.type}</h4>
      <p class="text-xs text-slate-300 leading-relaxed mb-3">${activeItem.description}</p>
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-800 gap-2 text-xs">
        <div class="flex items-center gap-1.5 text-slate-300 font-mono">
          <svg class="w-3.5 h-3.5 text-emerald-400 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span class="truncate">${activeItem.suggestedPace}</span>
        </div>
        <div class="flex items-center gap-1.5 text-slate-400">
          <svg class="w-3.5 h-3.5 text-amber-400 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" y1="22" x2="4" y2="15"></line>
          </svg>
          <span class="truncate">${activeItem.suggestedShoe}</span>
        </div>
      </div>

      ${activeItem.totalKm > 0 ? `
        <div class="pt-3">
          <button id="btn-prefill-session" class="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors touch-press">
            <span>⚡ Prellenar y Registrar esta Sesión</span>
          </button>
        </div>
      ` : ''}
    `;

    const btnPrefill = card.querySelector("#btn-prefill-session");
    if (btnPrefill) {
      btnPrefill.addEventListener("click", () => {
        triggerHaptic(15);
        const distInput = document.getElementById("workout-distance");
        const typeSelect = document.getElementById("workout-type");
        const shoeSelect = document.getElementById("workout-shoe-select");
        const formSection = document.getElementById("section-log-workout");

        if (distInput) distInput.value = activeItem.totalKm;
        if (typeSelect) {
          // Buscar opción más cercana
          for (let opt of typeSelect.options) {
            if (opt.value.toLowerCase().includes(activeItem.type.substring(0, 7).toLowerCase())) {
              typeSelect.value = opt.value;
              break;
            }
          }
        }
        if (shoeSelect) {
          const matchedShoe = state.profile.shoes.find(s => s.name.toLowerCase().includes(activeItem.suggestedShoe.substring(0, 6).toLowerCase()));
          if (matchedShoe) shoeSelect.value = matchedShoe.id;
        }

        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const timeInput = document.getElementById("workout-time");
        if (timeInput) setTimeout(() => timeInput.focus(), 400);
      });
    }

    planContainer.appendChild(card);
  }

  // Zonas de Ritmo
  const zonesContainer = document.getElementById("running-zones-container");
  if (zonesContainer) {
    zonesContainer.innerHTML = "";
    Object.keys(zones).forEach(key => {
      const zone = zones[key];
      const row = document.createElement("div");
      row.className = "flex items-center justify-between p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 gap-2";
      row.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-emerald-400 shrink-0">
            ${key}
          </span>
          <div class="truncate">
            <div class="text-xs font-semibold text-slate-100">${zone.name}</div>
            <div class="text-[10px] text-slate-400 truncate">${zone.hrRange}</div>
          </div>
        </div>
        <span class="px-2 py-0.5 rounded bg-slate-950 font-mono text-xs font-bold text-emerald-300 border border-slate-800 shrink-0">
          ${zone.rangeStr}
        </span>
      `;
      zonesContainer.appendChild(row);
    });
  }

  // Selector de zapatillas
  const shoeSelect = document.getElementById("workout-shoe-select");
  if (shoeSelect) {
    shoeSelect.innerHTML = `<option value="">Selecciona zapatilla...</option>`;
    state.profile.shoes.forEach(s => {
      shoeSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.km} km)</option>`;
    });
  }

  renderShoeRotation();
  renderWorkoutLogs();
}

function renderShoeRotation() {
  const container = document.getElementById("shoe-rotation-container");
  if (!container) return;
  container.innerHTML = "";

  state.profile.shoes.forEach(shoe => {
    const percent = Math.min(100, Math.round((shoe.km / shoe.maxKm) * 100));
    const card = document.createElement("div");
    card.className = "p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5";
    card.innerHTML = `
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-slate-100 truncate">${shoe.name}</span>
        <span class="font-mono text-slate-300 font-semibold text-[11px] shrink-0">${shoe.km}/${shoe.maxKm}km</span>
      </div>
      <div class="text-[10px] text-slate-400 truncate">${shoe.role}</div>
      <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div class="h-full rounded-full ${percent > 85 ? 'bg-rose-500' : percent > 65 ? 'bg-amber-400' : 'bg-emerald-400'}" style="width: ${percent}%"></div>
      </div>
      <div class="flex justify-between items-center text-[9px] text-slate-400">
        <span>Uso: ${percent}%</span>
        <button class="text-slate-400 hover:text-emerald-400 underline shoe-edit-km" data-shoe-id="${shoe.id}">Editar km</button>
      </div>
    `;

    card.querySelector(".shoe-edit-km").addEventListener("click", () => {
      triggerHaptic(10);
      const newKmStr = prompt(`Actualizar kilometraje para ${shoe.name}:`, shoe.km);
      if (newKmStr !== null && !isNaN(newKmStr)) {
        shoe.km = parseFloat(Number(newKmStr).toFixed(1));
        state.save(STORAGE_KEYS.PROFILE, state.profile);
        renderShoeRotation();
        renderAlerts();
      }
    });

    container.appendChild(card);
  });
}

function renderWorkoutLogs() {
  const container = document.getElementById("workout-logs-container");
  if (!container) return;
  container.innerHTML = "";

  if (state.workoutLogs.length === 0) {
    container.innerHTML = `
      <div class="p-5 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl">
        Sin sesiones registradas aún. Registra tu primer entrenamiento.
      </div>
    `;
    return;
  }

  state.workoutLogs.forEach(log => {
    const card = document.createElement("div");
    const shoe = state.profile.shoes.find(s => s.id === log.shoeId);
    card.className = "p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-2 text-xs";
    card.innerHTML = `
      <div class="space-y-0.5 flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-bold text-slate-100">${log.distanceKm} km</span>
          <span class="font-mono text-emerald-400 font-semibold text-[11px]">@ ${log.paceStr || '--:--'}/km</span>
          <span class="px-1.5 py-0.2 rounded bg-slate-800 text-[9px] text-slate-300 truncate max-w-[130px]">${log.type}</span>
        </div>
        <div class="text-slate-400 text-[10px] flex items-center gap-2 truncate">
          <span>📅 ${log.date}</span>
          <span>⏱️ ${log.timeStr}</span>
          ${log.avgHr ? `<span>❤️ ${log.avgHr}</span>` : ''}
          ${shoe ? `<span>👟 ${shoe.name.split(' ')[0]}</span>` : ''}
        </div>
      </div>
      <button class="delete-workout-btn text-slate-400 hover:text-rose-400 p-2 shrink-0 touch-press" data-id="${log.id}" title="Eliminar">
        <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    card.querySelector(".delete-workout-btn").addEventListener("click", () => {
      triggerHaptic(10);
      if (confirm("¿Eliminar este entrenamiento?")) {
        state.deleteWorkoutLog(log.id);
        renderRunningModule();
        renderNutritionModule();
        renderHydrationModule();
        renderAlerts();
        renderDailyProgress();
      }
    });

    container.appendChild(card);
  });
}

function renderNutritionModule() {
  const loggedWorkout = state.getTodayWorkoutLog();
  const workoutCaloriesToday = loggedWorkout 
    ? calculateWorkoutBurn(loggedWorkout.distanceKm, state.profile.weight, loggedWorkout.intensityFactor || 1.15)
    : 0;

  const tdeeData = calculateDynamicTDEE(
    state.profile.weight,
    state.profile.height,
    state.profile.age,
    workoutCaloriesToday,
    state.profile.activityLevel
  );

  const todayMeals = state.getTodayMeals();
  const totalCalories = todayMeals.reduce((acc, m) => acc + Number(m.calories || 0), 0);
  const totalCarbs = todayMeals.reduce((acc, m) => acc + Number(m.carbs || 0), 0);
  const totalProtein = todayMeals.reduce((acc, m) => acc + Number(m.protein || 0), 0);
  const totalFat = todayMeals.reduce((acc, m) => acc + Number(m.fat || 0), 0);

  const bmrDisplay = document.getElementById("nutrition-bmr");
  const baselineTdeeDisplay = document.getElementById("nutrition-baseline-tdee");
  const workoutBurnDisplay = document.getElementById("nutrition-workout-burn");
  const targetTdeeDisplay = document.getElementById("nutrition-target-tdee");
  const consumedCaloriesDisplay = document.getElementById("nutrition-consumed-calories");
  const calorieBalanceDisplay = document.getElementById("nutrition-calorie-balance");

  if (bmrDisplay) bmrDisplay.textContent = `${tdeeData.bmr} kcal`;
  if (baselineTdeeDisplay) baselineTdeeDisplay.textContent = `${tdeeData.baselineTDEE} kcal`;
  if (workoutBurnDisplay) workoutBurnDisplay.textContent = `+${workoutCaloriesToday} kcal`;
  if (targetTdeeDisplay) targetTdeeDisplay.textContent = `${tdeeData.totalTDEE} kcal`;
  if (consumedCaloriesDisplay) consumedCaloriesDisplay.textContent = `${totalCalories} kcal`;

  const balance = totalCalories - tdeeData.totalTDEE;
  if (calorieBalanceDisplay) {
    calorieBalanceDisplay.textContent = `${balance > 0 ? '+' : ''}${balance} kcal`;
    calorieBalanceDisplay.className = `font-mono text-xs sm:text-sm font-bold ${balance < -450 ? 'text-rose-400' : balance > 200 ? 'text-amber-400' : 'text-emerald-400'}`;
  }

  const carbsDisplay = document.getElementById("nutrition-total-carbs");
  const proteinDisplay = document.getElementById("nutrition-total-protein");
  const fatDisplay = document.getElementById("nutrition-total-fat");

  if (carbsDisplay) carbsDisplay.textContent = `${totalCarbs}g`;
  if (proteinDisplay) proteinDisplay.textContent = `${totalProtein}g`;
  if (fatDisplay) fatDisplay.textContent = `${totalFat}g`;

  const calorieBar = document.getElementById("nutrition-calorie-bar");
  if (calorieBar) {
    const percent = Math.min(100, Math.round((totalCalories / tdeeData.totalTDEE) * 100));
    calorieBar.style.width = `${percent}%`;
    calorieBar.className = `h-full rounded-full transition-all duration-300 ${percent > 105 ? 'bg-amber-400' : percent < 50 ? 'bg-rose-500' : 'bg-emerald-400'}`;
  }

  renderTodayMealsList();
  populateFoodSelect();
}

function populateFoodSelect() {
  const select = document.getElementById("food-db-select");
  if (!select || select.options.length > 1) return;

  FOOD_DATABASE.forEach(food => {
    const opt = document.createElement("option");
    opt.value = food.id;
    opt.textContent = `${food.name} (${food.calories} kcal | ${food.carbs}g C)`;
    select.appendChild(opt);
  });
}

function renderTodayMealsList() {
  const container = document.getElementById("today-meals-container");
  if (!container) return;
  const meals = state.getTodayMeals();
  container.innerHTML = "";

  if (meals.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl">
        No has registrado comidas hoy.
      </div>
    `;
    return;
  }

  meals.forEach(m => {
    const row = document.createElement("div");
    row.className = "flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs";
    row.innerHTML = `
      <div class="space-y-0.5 min-w-0 flex-1">
        <div class="flex items-center gap-1.5">
          <span class="font-bold text-slate-100 truncate">${m.name}</span>
          <span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 shrink-0">${m.category || 'Comida'}</span>
        </div>
        <div class="text-slate-400 text-[10px] font-mono">
          <span class="text-emerald-400 font-bold">${m.calories} kcal</span> • 
          <span>${m.carbs}g C</span> • 
          <span>${m.protein}g P</span>
        </div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <span class="text-slate-500 text-[10px]">${m.timestamp || ''}</span>
        <button class="delete-meal-btn text-slate-400 hover:text-rose-400 p-1.5 touch-press" data-id="${m.id}" title="Eliminar">
          <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;

    row.querySelector(".delete-meal-btn").addEventListener("click", () => {
      state.deleteMeal(m.id);
      renderNutritionModule();
      renderAlerts();
      renderDailyProgress();
    });

    container.appendChild(row);
  });
}

function renderHydrationModule() {
  const loggedWorkout = state.getTodayWorkoutLog();
  const workoutKm = loggedWorkout ? Number(loggedWorkout.distanceKm) : 0;
  const isHighIntensity = loggedWorkout && (loggedWorkout.type.includes("VO2max") || loggedWorkout.type.includes("Tempo"));

  const hydrationData = calculateDynamicHydrationGoal(state.profile.weight, workoutKm, isHighIntensity ? 1.2 : 1.05);
  const currentWater = state.getTodayHydration();
  const percent = Math.min(100, Math.round((currentWater / hydrationData.totalWaterGoal) * 100));

  const currentDisplay = document.getElementById("hydration-current-display");
  const targetDisplay = document.getElementById("hydration-target-display");
  const percentDisplay = document.getElementById("hydration-percent-display");
  const baseDisplay = document.getElementById("hydration-base-display");
  const sweatDisplay = document.getElementById("hydration-sweat-display");
  const waterBar = document.getElementById("hydration-bar");

  if (currentDisplay) currentDisplay.textContent = `${currentWater} ml`;
  if (targetDisplay) targetDisplay.textContent = `${hydrationData.totalWaterGoal} ml`;
  if (percentDisplay) percentDisplay.textContent = `${percent}%`;
  if (baseDisplay) baseDisplay.textContent = `${hydrationData.baseWater} ml`;
  if (sweatDisplay) sweatDisplay.textContent = `+${hydrationData.sweatLoss} ml`;
  if (waterBar) waterBar.style.width = `${percent}%`;
}

function renderMedicationsModule() {
  const container = document.getElementById("medications-container");
  if (!container) return;

  const meds = state.getMedications();
  const todayKey = state.getTodayKey();
  const currentHour = new Date().getHours();
  container.innerHTML = "";

  if (meds.length === 0) {
    container.innerHTML = `
      <div class="p-5 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl">
        Sin medicamentos registrados. Usa el formulario arriba.
      </div>
    `;
    return;
  }

  meds.forEach(med => {
    const isTaken = med.intakeHistory && med.intakeHistory[todayKey];
    let isOverdue = false;
    if (!isTaken && med.times) {
      const [h] = med.times.split(':').map(Number);
      if (currentHour >= h) isOverdue = true;
    }

    const card = document.createElement("div");
    card.className = `p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all touch-press ${
      isTaken 
        ? "bg-slate-900/60 border-emerald-800/40 opacity-80" 
        : isOverdue 
          ? "bg-slate-900 border-amber-800/60 ring-1 ring-amber-500/20" 
          : "bg-slate-900/80 border-slate-800"
    }`;

    card.innerHTML = `
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <button class="toggle-med-btn w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
          isTaken 
            ? "bg-emerald-500 border-emerald-400 text-slate-950 font-bold" 
            : "border-slate-600 bg-slate-800 text-transparent hover:border-emerald-400"
        }" data-id="${med.id}">
          <svg class="w-4 h-4 stroke-current stroke-[3] fill-none" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
        <div class="space-y-0.5 truncate">
          <div class="flex items-center gap-1.5">
            <h4 class="text-xs sm:text-sm font-bold text-slate-100 truncate ${isTaken ? 'line-through text-slate-400' : ''}">${med.name}</h4>
            <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold shrink-0 ${
              isTaken ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' : 
              isOverdue ? 'bg-amber-950 text-amber-300 border border-amber-800/60' : 
              'bg-slate-800 text-slate-300'
            }">
              ${isTaken ? 'Tomado' : isOverdue ? 'Atrasado' : 'Pendiente'}
            </span>
          </div>
          <div class="text-[11px] text-slate-400 truncate">
            <span>${med.dose}</span> • <span>⏰ ${med.times || '--:--'}</span> • <span>${med.frequency}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-1 shrink-0">
        <button class="delete-med-btn p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors" data-id="${med.id}" title="Eliminar">
          <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;

    card.querySelector(".toggle-med-btn").addEventListener("click", () => {
      state.toggleMedicationTaken(med.id);
      renderMedicationsModule();
      renderDailyProgress();
      renderAlerts();
    });

    card.querySelector(".delete-med-btn").addEventListener("click", () => {
      if (confirm(`¿Eliminar ${med.name}?`)) {
        state.deleteMedication(med.id);
        renderMedicationsModule();
        renderAlerts();
        renderDailyProgress();
      }
    });

    container.appendChild(card);
  });
}

function renderProfileModal() {
  const ageInput = document.getElementById("profile-age");
  const weightInput = document.getElementById("profile-weight");
  const heightInput = document.getElementById("profile-height");
  const m1000RecentInput = document.getElementById("profile-1000m-recent");
  const k5RecentInput = document.getElementById("profile-5k-recent");
  const k5PRInput = document.getElementById("profile-5k-pr");
  const k5GoalInput = document.getElementById("profile-5k-goal");
  const k10GoalInput = document.getElementById("profile-10k-goal");

  if (ageInput) ageInput.value = state.profile.age;
  if (weightInput) weightInput.value = state.profile.weight;
  if (heightInput) heightInput.value = state.profile.height;
  if (m1000RecentInput) m1000RecentInput.value = state.profile.metrics.m1000Recent;
  if (k5RecentInput) k5RecentInput.value = state.profile.metrics.k5Recent;
  if (k5PRInput) k5PRInput.value = state.profile.metrics.k5PR;
  if (k5GoalInput) k5GoalInput.value = state.profile.goals.k5Target;
  if (k10GoalInput) k10GoalInput.value = state.profile.goals.k10Target;
}

// ============================================================================
// 7. EVENT LISTENERS GENERALES
// ============================================================================

function setupEventListeners() {
  const btnNewQuote = document.getElementById("btn-new-quote");
  if (btnNewQuote) {
    btnNewQuote.addEventListener("click", () => {
      triggerHaptic(10);
      renderDailyQuote(true);
    });
  }

  const btnAddHabit = document.getElementById("btn-add-custom-habit");
  const inputAddHabit = document.getElementById("input-custom-habit");
  if (btnAddHabit && inputAddHabit) {
    const handleAdd = () => {
      const val = inputAddHabit.value.trim();
      if (val) {
        state.addCustomHabit(val);
        inputAddHabit.value = "";
        renderDailyHabits();
        renderDailyProgress();
      }
    };
    btnAddHabit.addEventListener("click", handleAdd);
    inputAddHabit.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleAdd();
    });
  }

  const formWorkout = document.getElementById("form-workout-log");
  if (formWorkout) {
    formWorkout.addEventListener("submit", (e) => {
      e.preventDefault();

      const dist = parseFloat(document.getElementById("workout-distance").value);
      const timeStr = document.getElementById("workout-time").value.trim();
      const avgHr = parseInt(document.getElementById("workout-hr").value) || null;
      const shoeId = document.getElementById("workout-shoe-select").value;
      const type = document.getElementById("workout-type").value;
      const notes = document.getElementById("workout-notes").value.trim();

      if (!dist || dist <= 0 || !timeStr) {
        alert("Ingresa distancia y tiempo válidos.");
        return;
      }

      const totalSec = timeStrToSeconds(timeStr);
      const paceSec = totalSec / dist;
      const paceStr = secondsToTimeStr(paceSec);

      state.addWorkoutLog({
        distanceKm: dist,
        timeStr,
        paceStr,
        avgHr,
        shoeId,
        type,
        notes,
        intensityFactor: type.includes("VO2max") ? 1.22 : type.includes("Tempo") ? 1.15 : 1.05
      });

      formWorkout.reset();
      renderAll();
      alert(`¡Sesión de ${dist} km guardada a ${paceStr}/km!`);
    });
  }

  const foodSelect = document.getElementById("food-db-select");
  if (foodSelect) {
    foodSelect.addEventListener("change", () => {
      const selectedId = foodSelect.value;
      if (!selectedId) return;
      const food = FOOD_DATABASE.find(f => f.id === selectedId);
      if (food) {
        state.addMeal({
          name: food.name,
          calories: food.calories,
          carbs: food.carbs,
          protein: food.protein,
          fat: food.fat,
          category: food.category
        });
        foodSelect.value = "";
        renderNutritionModule();
        renderDailyProgress();
        renderAlerts();
      }
    });
  }

  const formMeal = document.getElementById("form-manual-meal");
  if (formMeal) {
    formMeal.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("meal-name").value.trim();
      const calories = parseInt(document.getElementById("meal-calories").value) || 0;
      const carbs = parseInt(document.getElementById("meal-carbs").value) || 0;
      const protein = parseInt(document.getElementById("meal-protein").value) || 0;
      const fat = parseInt(document.getElementById("meal-fat").value) || 0;
      const category = document.getElementById("meal-category").value;

      if (!name || calories <= 0) {
        alert("Ingresa nombre y calorías.");
        return;
      }

      state.addMeal({ name, calories, carbs, protein, fat, category });
      formMeal.reset();
      renderNutritionModule();
      renderDailyProgress();
      renderAlerts();
    });
  }

  document.querySelectorAll("[data-water-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      const ml = parseInt(btn.getAttribute("data-water-add"));
      state.addHydration(ml);
      renderHydrationModule();
      renderDailyProgress();
      renderAlerts();
    });
  });

  const formMed = document.getElementById("form-add-medication");
  if (formMed) {
    formMed.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("med-name").value.trim();
      const dose = document.getElementById("med-dose").value.trim();
      const times = document.getElementById("med-time").value.trim();
      const frequency = document.getElementById("med-frequency").value.trim() || "Diario";
      const notes = document.getElementById("med-notes").value.trim();

      if (!name || !dose) {
        alert("Completa el nombre y la dosis.");
        return;
      }

      state.saveMedication({ name, dose, times, frequency, notes });
      formMed.reset();
      renderMedicationsModule();
      renderDailyProgress();
      renderAlerts();
    });
  }

  // Modal / Bottom Sheet
  const profileModal = document.getElementById("profile-modal");
  const btnOpenProfile = document.getElementById("btn-open-profile");
  const btnCloseProfile = document.getElementById("btn-close-profile");
  const formProfile = document.getElementById("form-user-profile");

  if (btnOpenProfile && profileModal) {
    btnOpenProfile.addEventListener("click", () => {
      triggerHaptic(12);
      renderProfileModal();
      profileModal.classList.remove("hidden");
    });
  }

  if (btnCloseProfile && profileModal) {
    btnCloseProfile.addEventListener("click", () => {
      triggerHaptic(8);
      profileModal.classList.add("hidden");
    });
  }

  if (formProfile) {
    formProfile.addEventListener("submit", (e) => {
      e.preventDefault();
      state.profile.age = parseInt(document.getElementById("profile-age").value) || state.profile.age;
      state.profile.weight = parseFloat(document.getElementById("profile-weight").value) || state.profile.weight;
      state.profile.height = parseInt(document.getElementById("profile-height").value) || state.profile.height;

      state.profile.metrics.m1000Recent = document.getElementById("profile-1000m-recent").value.trim() || state.profile.metrics.m1000Recent;
      state.profile.metrics.k5Recent = document.getElementById("profile-5k-recent").value.trim() || state.profile.metrics.k5Recent;
      state.profile.metrics.k5PR = document.getElementById("profile-5k-pr").value.trim() || state.profile.metrics.k5PR;

      state.profile.goals.k5Target = document.getElementById("profile-5k-goal").value.trim() || state.profile.goals.k5Target;
      state.profile.goals.k10Target = document.getElementById("profile-10k-goal").value.trim() || state.profile.goals.k10Target;

      state.recalculateUserVDOT();
      state.save(STORAGE_KEYS.PROFILE, state.profile);

      profileModal.classList.add("hidden");
      renderAll();
      alert("Perfil actualizado y ritmos recalculados.");
    });
  }
}

// ============================================================================
// 8. REGISTRO DE SERVICE WORKER & PWA
// ============================================================================

let deferredPrompt = null;

function registerPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => {
          console.log('[PWA] Service Worker registrado:', reg.scope);
        })
        .catch(err => {
          console.warn('[PWA] Error en Service Worker:', err);
        });
    });
  }

  const pwaInstallBtn = document.getElementById("btn-install-pwa");

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstallBtn) {
      pwaInstallBtn.classList.remove('hidden');
    }
  });

  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('[PWA] Instalación:', outcome);
        deferredPrompt = null;
        pwaInstallBtn.classList.add('hidden');
      } else {
        alert("Para instalar en tu móvil:\n• Android: Menú del navegador (3 puntos) -> 'Instalar aplicación' / 'Agregar a la pantalla principal'.\n• iPhone: Botón Compartir -> 'Agregar al inicio'.");
      }
    });
  }
}
