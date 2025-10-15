# 🎮 LUMETRIX — Diseño de niveles y progresión

## 🌍 ESTRUCTURA GENERAL

| Parámetro | Valor |
|------------|--------|
| Total de mundos | 5 |
| Niveles por mundo | 10 |
| Total de niveles | 50 |
| Fichas iniciales | 4 |
| Fichas finales | 10 |
| Tiempo por nivel | 35s → 12s |
| Mecánicas totales | 3 (Toque, Arrastre, Doble toque) |

---

## 🧩 MECÁNICAS DISPONIBLES

| Código | Nombre | Descripción |
|--------|---------|-------------|
| `touch` | Toque secuencial (base) | Mecánica principal del juego. El jugador debe deducir la secuencia correcta y tocar las fichas en el orden adecuado. |
| `drag` | Arrastre | Algunas fichas deben **arrastrarse** hasta su posición objetivo o su color correspondiente. |
| `double` | Doble toque | Fichas con **borde doble** requieren dos toques consecutivos para validarse. |
| `combo` | Combinado | Se mezclan las tres mecánicas anteriores. Presente en los niveles más avanzados. |

---

## ⚡ PROGRESIÓN POR MUNDOS

| 🌍 Mundo | Mecánicas activas | Nº Fichas por nivel | Tiempo aprox. (s) | Descripción / Dificultad |
|----------|-------------------|----------------------|--------------------|---------------------------|
| **1** | `touch` | 4, 4, 5, 5, 6, 6, 7, 7, 8, 8 | 35 → 22 | Introducción. Enseña las reglas básicas del juego. Sin mecánicas extra. Dificultad baja. |
| **2** | `touch`, `drag` | 4, 4, 5, 5, 6, 6, 7, 7, 8, 8 | 33 → 20 | Igual que el mundo 1, pero se añaden fichas de **arrastre**. Aparecen 1 o 2 por nivel. |
| **3** | `touch`, `drag` | 5, 5, 6, 6, 7, 7, 8, 8, 9, 9 | 30 → 18 | Aumenta en 1 ficha por nivel y reduce el tiempo. Ritmo más exigente. Sin nuevas mecánicas. |
| **4** | `touch`, `drag`, `double` | 6 → 9 | 28 → 15 | Introduce **doble toque (borde doble)**. Algunos niveles combinan arrastre + doble toque. Dificultad alta. |
| **5** | `combo` | 7 → 10 | 25 → 12 | Modo experto. Todos los tipos combinados: toques simples, dobles y arrastres. Algunos niveles casi imposibles pero posibles. |

---

## 🧠 LÓGICA DE DIFICULTAD

- Cada mundo mantiene el ritmo de aprendizaje → desafío → adaptación.  
- La **complejidad crege por tres vías**:
  1. Mayor número de fichas por nivel.
  2. Menor tiempo disponible.
  3. Nuevas mecánicas combinadas.
- El **último mundo (5)** combina todo en 10 niveles de dificultad extrema pero "humanamente posible".

---

## 🧾 FORMATO JSON (para uso en código / DB)

```json
{
  "worlds": [
    {
      "id": 1,
      "mechanics": ["touch"],
      "tiles": [4,4,5,5,6,6,7,7,8,8],
      "time": [35,34,33,32,30,28,26,25,24,22],
      "notes": "Mundo 1 — introducción y aprendizaje."
    },
    {
      "id": 2,
      "mechanics": ["touch","drag"],
      "tiles": [4,4,5,5,6,6,7,7,8,8],
      "time": [33,32,31,30,28,26,24,22,21,20],
      "notes": "Mundo 2 — añade arrastre."
    },
    {
      "id": 3,
      "mechanics": ["touch","drag"],
      "tiles": [5,5,6,6,7,7,8,8,9,9],
      "time": [30,29,28,27,26,24,22,20,19,18],
      "notes": "Mundo 3 — más fichas y menos tiempo."
    },
    {
      "id": 4,
      "mechanics": ["touch","drag","double"],
      "tiles": [6,6,7,7,8,8,9,9,9,9],
      "time": [28,26,25,24,22,20,18,17,16,15],
      "notes": "Mundo 4 — introduce doble toque."
    },
    {
      "id": 5,
      "mechanics": ["combo"],
      "tiles": [7,7,8,8,9,9,10,10,10,10],
      "time": [25,24,22,21,20,18,16,14,13,12],
      "notes": "Mundo 5 — modo experto, combina todo."
    }
  ]
}
```

---

# 🧩 MECÁNICAS DE LUMETRIX

## 1. `touch` — Toque secuencial (base)
- **Descripción:** Mecánica principal del juego.  
  El jugador debe **deducir la secuencia correcta** y tocar las fichas en ese orden.  
- **Efectos:**  
  - Cada toque correcto cambia el color de la ficha al color del nivel (accent).  
  - Si se equivoca, todas las fichas vuelven a su color original y se muestra la pista inicial.  
  - Incluye sonido y vibración según acierto o fallo.
- **Presente en:** Todos los mundos (1–5).

---

## 2. `drag` — Arrastre
- **Descripción:** Algunas fichas deben **arrastrarse** hasta su posición o color objetivo.  
  Se usan 1–2 por nivel (desde el Mundo 2).  
- **Efectos:**  
  - Se detecta el "drop" correcto (posición o zona válida).  
  - Al completar el arrastre correcto, la ficha se ilumina con el color del nivel.  
  - Si se suelta en zona incorrecta, vuelve a su posición original con sonido de error.
- **Presente en:** Mundos 2, 3, 4 y 5.

---

## 3. `double` — Doble toque
- **Descripción:** Fichas especiales con **borde doble o parpadeo distintivo** que requieren **dos toques consecutivos** para validarse.  
- **Efectos:**  
  - Primer toque → resalta parcialmente (indica que falta un toque más).  
  - Segundo toque → se valida y se queda iluminada.  
  - Si se toca otra ficha entre medias, el progreso del doble toque se pierde.
- **Presente en:** Mundos 4 y 5.

---

## 4. `combo` — Combinada
- **Descripción:** Combina **todas las mecánicas anteriores** en el mismo nivel.  
  Algunas fichas se tocan, otras se arrastran y otras requieren doble toque.  
- **Objetivo:** Mantener coordinación y memoria con diferentes interacciones simultáneas.  
- **Presente en:** Mundo 5 (modo experto).

---

## 🔊 Extras (opcional)
- **Vibración y sonido** activos según opciones del usuario.  
- **Hint inicial:** al comenzar cada nivel, parpadea una ficha para indicar la pista.  
- **Ranking:** basado en tiempo total acumulado (menos tiempo = mejor posición).

---

👉 Estas mecánicas están pensadas para ser **modulares**, es decir:
- Pueden activarse por nivel (`mechanics: ["touch", "drag"]`)
- Y controlarse fácilmente desde un JSON de configuración o DB.

---

## 📋 IMPLEMENTACIÓN ACTUAL vs OBJETIVO

### ✅ YA IMPLEMENTADO:
- Mundo 1: `touch` (toque secuencial básico)
- Mundo 2: `touch` + `drag` (arrastre básico)
- Sistema de tiempos y fichas por nivel
- Sonidos y vibración
- Ranking y progreso

### 🔄 PENDIENTE DE IMPLEMENTAR:
- Mundo 3: Más fichas y menos tiempo
- Mundo 4: `double` (doble toque)
- Mundo 5: `combo` (todas las mecánicas)
- Sistema modular de mecánicas por nivel
- Configuración JSON completa

### 🎯 PRÓXIMOS PASOS:
1. Implementar mecánica `double` (doble toque)
2. Crear sistema modular de mecánicas
3. Expandir a 50 niveles (5 mundos x 10)
4. Ajustar tiempos y dificultad según especificación
5. Implementar mecánica `combo` para Mundo 5

