# Atleta Zen — PWA de Salud, Running & Nutrición

Aplicación Web Progresiva (PWA) de uso personal para corredores de fondo amateur, con arquitectura basada en archivos estáticos (**HTML5, Tailwind CSS, Vanilla JavaScript**) y persistencia en **localStorage**, optimizada para funcionar 100% offline y lista para desplegarse en **GitHub Pages** o **Netlify**.

---

## 🏃 Perfil Base Configurado
- **Edad:** 24 años
- **Peso:** 52 kg
- **Altura:** 1.64 m
- **Frecuencia deportiva:** 6 días por semana
- **Métricas:** 
  - 1000m: 3:30 reciente (PR 3:22)
  - 5K: 19:26 reciente (PR 18:44)
- **Metas:**
  - 5K Sub 18:00 (17:59)
  - 10K Sub 37:00 (36:59)
- **Rotación de Zapatillas:**
  - *Asics GT-1000 10:* Rodajes regenerativos y recuperación
  - *Adidas Adizero Boston 11:* Series VO2max, Tempo y tirada larga
  - *Olimpicus Corre 2:* Rodajes aeróbicos medios y versatilidad

---

## 📱 Módulos y Funcionalidades

### 1. Dashboard Principal (Motivación & Hábitos)
- **Frase Filosófica Diaria:** Colección curada de más de 20 citas de estoicismo (Marco Aurelio, Séneca, Epicteto), clásicos (Homero, Sócrates, Aristóteles, Cicerón, Virgilio) y filología clásica/etimológica (*áskesis*, Nietzsche). Rota de forma determinista día a día y cuenta con botón para inspiración aleatoria.
- **Barra de Progreso Diario Unificada:** Mide el cumplimiento global ponderado (Hábitos 40%, Medicamentos 20%, Entrenamiento 20%, Hidratación 20%).
- **Misiones Diarias (Checklist Fijo):**
  - Despertar a las 4:30 am
  - Desayunar
  - Entrenar
  - Leer
  - Buscar trabajo / Trabajar
  *(Permite además registrar hábitos personalizados adicionales).*

### 2. Módulo de Medicamentos (CRUD)
- Gestión completa (Crear, Leer, Editar, Eliminar) de fármacos y suplementos (Dosis, Horario, Frecuencia, Notas).
- Lista visual interactiva diaria con marcado en 1 clic.
- Detección de tomas pendientes y alerta de tomas atrasadas según la hora actual.

### 3. Módulo Running (Planificador Inteligente, VDOT & Registro)
- **Cálculo de VDOT (Jack Daniels Running Formula):**
  Calcula con precisión científica el VDOT a partir de tus marcas recientes (5K 19:26 = VDOT 51.5) y las metas proyectadas (Sub 18 = VDOT 56.4).
- **Zonas de Ritmo Fisiológico (E, M, T, I, R):**
  Resuelve la ecuación cuadrática inversa de consumo de oxígeno para delimitar los ritmos en min/km (Easy, Maratón, Umbral, Series VO2max y Repetición).
- **Planificador Automático Semanal (6 días):**
  Genera la semana de entrenamiento con progresión:
  - *Lunes:* Rodaje Regenerativo (8 km @ Zona E) + 4 rectas 100m.
  - *Martes:* Calidad VO2max (2 km Cal. + 5x1000m @ Zona I rec. 2' + 2 km soltar = 9 km).
  - *Miércoles:* Rodaje Aeróbico de Mantenimiento (10 km @ Zona E).
  - *Jueves:* Calidad Umbral (2 km Cal. + 6 km sostenidos @ Zona T + 2 km soltar = 10 km).
  - *Viernes:* Recuperación Activa & Movilidad (7 km suaves).
  - *Sábado:* Tirada Larga Progresiva (16 km: 13 km Zona E + 3 km finales Zona M).
  - *Domingo:* Descanso Total y Asimilación.
- **Motor Adaptativo de Recálculo:**
  Al registrar tus sesiones reales, el sistema evalúa tu ritmo y esfuerzo. Si encadenas ritmos superiores con pulsaciones estables, tu VDOT asciende progresivamente y todos los ritmos del plan se recalculan automáticamente.
- **Control de Kilometraje de Zapatillas:** Supervisa el desgaste de tu rotación y emite alertas al superar el 85% de vida útil.

### 4. Módulo de Nutrición e Hidratación
- **Motor Metabólico Dinámico:**
  - TMB (Mifflin-St Jeor): 1430 kcal/día.
  - TDEE Base Sedentario: 1716 kcal/día.
  - Gasto de Carrera: Se calcula en tiempo real según los km y el factor de intensidad (ej. Series VO2max = 1.22 * peso * km).
  - TDEE Objetivo Dinámico = TDEE Base + Gasto de Carrera.
- **Registro de Comidas:**
  - Base de datos local JSON con alimentos orientados al fondista (avena, pasta con atún, pollo con arroz, batidos de suero, dátiles medjool, boniato, quinoa, etc.).
  - Formulario de entrada rápida de calorías y macronutrientes (Carbos, Proteína, Grasas).
  - Balance calórico en tiempo real.
- **Hidratación Dinámica:**
  - Base diaria de 2080 ml (40 ml/kg).
  - Ajuste dinámico por sudoración en entrenamiento (+65 a 80 ml por cada km corrido).
  - Botones de pulsación rápida (+250ml vaso, +500ml botella, +750ml bidón, -250ml).

### 5. Motor de Consejos y Alertas (Feedback Interconectado)
- **Alerta de Déficit Calórico Severo:** Si el planificador o el registro señalan series o tempo de alta intensidad y las comidas ingresadas dejan un déficit marcado respecto al TDEE modificado:
  > *"Riesgo de déficit calórico severo tras entrenamiento de velocidad. Has gastado X kcal y solo has consumido Y kcal. Aumenta la ingesta para no comprometer la recuperación."*
- **Alerta de Hidratación de las 4:00 PM:** Si se superan las 16:00 horas y el registro de agua está por debajo del 70% de la meta dinámica, lanza advertencia para proteger la recuperación cardíaca nocturna.
- **Alerta de Desgaste de Zapatillas:** Aviso cuando un par supera el umbral seguro de kilometraje.
- **Alerta de Medicación Atrasada:** Avisos si un medicamento fijado para horas pasadas sigue pendiente.

---

## 🚀 Cómo Ejecutar e Instalar como PWA

### 1. Ejecución Local Directa
- Abre directamente `index.html` en cualquier navegador moderno (Edge, Chrome, Safari, Brave, Firefox).
- No requiere Node.js, Python ni bases de datos externas.

### 2. Instalación como PWA Móvil
- **En Android (Chrome / Brave / Edge):** Pulsa el botón flotante "Instalar App" en la cabecera o abre el menú de tres puntos del navegador y selecciona *"Agregar a la pantalla principal"* / *"Instalar aplicación"*.
- **En iPhone / iPad (Safari):** Pulsa el botón *"Compartir"* (icono de cuadrado con flecha hacia arriba) y selecciona *"Agregar al inicio"*.

### 3. Despliegue en GitHub Pages / Netlify
- **Netlify:** Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop).
- **GitHub Pages:** Sube los archivos estáticos a tu repositorio y activa GitHub Pages desde la rama `main`.
