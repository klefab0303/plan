/* ===================== DATA ===================== */
const trainingPlan = [
  {
    id:"montag",dayName:"Montag",label:"Push + Core",emoji:"🏠",location:"Zu Hause",
    exercises:[
      {id:"mo1",name:"Bankdrücken",sets:"5",reps:"8–12",videoQuery:"Bankdrücken Technik"},
      {id:"mo2",name:"Schulterdrücken (Hantel)",sets:"4",reps:"8–12",videoQuery:"Schulterdrücken Kurzhantel Technik"},
      {id:"mo3",name:"Liegestütze langsam",sets:"4",reps:"20–30",videoQuery:"langsame Liegestütze Technik"},
      {id:"mo4",name:"Enge Liegestütze",sets:"3",reps:"max",videoQuery:"enge Liegestütze Trizeps"},
      {id:"mo5",name:"Seitheben",sets:"3",reps:"15–20",videoQuery:"Seitheben Technik"},
      {id:"mo6",name:"Plank",sets:"3",reps:"60 s",isTimeBasedHold:true,videoQuery:"Plank richtig"},
      {id:"mo7",name:"Seitstütz",sets:"2",reps:"45 s je Seite",isTimeBasedHold:true,videoQuery:"Seitstütz Side Plank"},
      {id:"mo8",name:"Schwimmen",sets:"–",reps:"–",isOptional:true,videoQuery:"Schwimmen Technik Kraulen"},
    ],
  },
  {id:"dienstag",dayName:"Dienstag",label:"Judo",emoji:"🥋",location:"Judo",exercises:[],isRestDay:false},
  {
    id:"mittwoch",dayName:"Mittwoch",label:"Beine + Core",emoji:"🏠",location:"Zu Hause",
    exercises:[
      {id:"mi1",name:"Kniebeugen (langsam)",sets:"5",reps:"15–20",videoQuery:"Kniebeugen Technik"},
      {id:"mi2",name:"Bulgarian Split Squats",sets:"4",reps:"10 je Bein",videoQuery:"Bulgarian Split Squat Technik"},
      {id:"mi3",name:"Hip Thrusts (Hantel)",sets:"4",reps:"12–15",videoQuery:"Hip Thrust Kurzhantel"},
      {id:"mi4",name:"Ausfallschritte",sets:"3",reps:"20 Schritte",videoQuery:"Ausfallschritte Technik"},
      {id:"mi5",name:"Wadenheben einbeinig",sets:"4",reps:"20",videoQuery:"Wadenheben einbeinig"},
      {id:"mi6",name:"Dead Bug",sets:"3",reps:"10",videoQuery:"Dead Bug Übung"},
      {id:"mi7",name:"Hollow Hold",sets:"3",reps:"30–40 s",isTimeBasedHold:true,videoQuery:"Hollow Hold Technik"},
    ],
  },
  {
    id:"donnerstag",dayName:"Donnerstag",label:"Pull / Rücken",emoji:"🌳",location:"Park",
    exercises:[
      {id:"do1",name:"Klimmzüge",sets:"6",reps:"max",videoQuery:"Klimmzüge Technik"},
      {id:"do2",name:"Australian Rows",sets:"5",reps:"12–15",videoQuery:"Australian Rows Technik"},
      {id:"do3",name:"Chin-Ups",sets:"4",reps:"max",videoQuery:"Chin Ups Technik"},
      {id:"do4",name:"Scapula Pull-ups",sets:"3",reps:"10",videoQuery:"Scapula Pull-ups"},
      {id:"do5",name:"Dead Hang",sets:"4",reps:"40–60 s",isTimeBasedHold:true,videoQuery:"Dead Hang"},
      {id:"do6",name:"Hanging Knee Raises",sets:"4",reps:"12–15",videoQuery:"Hanging Knee Raises"},
    ],
  },
  {id:"freitag",dayName:"Freitag",label:"Judo",emoji:"🥋",location:"Judo",exercises:[],isRestDay:false},
  {
    id:"samstag",dayName:"Samstag",label:"Push + Skill",emoji:"🌳",location:"Park",
    exercises:[
      {id:"sa1",name:"Dips",sets:"6",reps:"6–10",videoQuery:"Dips Technik"},
      {id:"sa2",name:"Explosive Liegestütze",sets:"4",reps:"10–15",videoQuery:"Explosive Liegestütze"},
      {id:"sa3",name:"Pike Push-ups",sets:"4",reps:"10–12",videoQuery:"Pike Push-ups"},
      {id:"sa4",name:"Negative Klimmzüge (5 Sek.)",sets:"3",reps:"5",videoQuery:"Negative Klimmzüge"},
      {id:"sa5",name:"L-Sit (oder angewinkelt)",sets:"4",reps:"10–20 s",isTimeBasedHold:true,videoQuery:"L-Sit Tutorial"},
      {id:"sa6",name:"Dead Hang locker",sets:"2",reps:"max",videoQuery:"Dead Hang"},
      {id:"sa7",name:"Schwimmen",sets:"–",reps:"–",isOptional:true,videoQuery:"Schwimmen Training"},
    ],
  },
  {id:"sonntag",dayName:"Sonntag",label:"Erholung",emoji:"😴",location:"–",exercises:[],isRestDay:true},
];

const exerciseCatalog = [
  {name:"Bankdrücken",targetMuscle:"Brust, vordere Schulter, Trizeps",technique:"Schulterblätter zusammenziehen, Brust raus, Stange kontrolliert zur Brust und explosiv drücken. Fester Stand mit den Füßen.",commonMistakes:"Schultern nicht fixiert, Ellbogen zu weit außen, Hohlkreuz zu stark, Stange prallt auf der Brust ab.",videoQuery:"Bankdrücken Technik richtig"},
  {name:"Schulterdrücken (Hantel)",targetMuscle:"Schultern (Deltoideus), Trizeps",technique:"Aufrechter Oberkörper, Hanteln auf Schulterhöhe, kontrolliert nach oben drücken ohne ins Hohlkreuz zu fallen.",commonMistakes:"Zu viel Schwung, Hohlkreuz, Hanteln nicht auf gleicher Höhe.",videoQuery:"Schulterdrücken Kurzhantel"},
  {name:"Liegestütze (langsam)",targetMuscle:"Brust, Trizeps, Core",technique:"Körper gerade wie ein Brett, 3 Sekunden runter, 1 Sekunde hoch. Ellbogen ca. 45° zum Körper.",commonMistakes:"Hüfte hängt durch, Kopf nach unten, zu schnelle Ausführung.",videoQuery:"Liegestütze langsam Technik"},
  {name:"Enge Liegestütze",targetMuscle:"Trizeps, innere Brust",technique:"Hände eng zusammen (Schulterbreit oder enger), Ellbogen nah am Körper, kontrollierte Bewegung.",commonMistakes:"Hände zu eng (Handgelenkschmerzen), Ellbogen nach außen.",videoQuery:"Enge Liegestütze Trizeps"},
  {name:"Seitheben",targetMuscle:"Seitliche Schulter (lateraler Deltoideus)",technique:"Leicht vorgebeugt, Arme seitlich heben bis Schulterhöhe, kontrolliert ablassen. Leichtes Gewicht!",commonMistakes:"Zu schweres Gewicht, Schwung aus dem Körper, Arme über Schulterhöhe.",videoQuery:"Seitheben richtig"},
  {name:"Plank",targetMuscle:"Core (Rektus, Transversus, Obliquus)",technique:"Unterarme und Zehen aufstellen, Körper bildet gerade Linie. Bauch aktiv anspannen, Po nicht zu hoch.",commonMistakes:"Hüfte hängt durch oder zu hoch, Kopf in den Nacken, Schultern nicht über Ellbogen.",videoQuery:"Plank richtig machen"},
  {name:"Kniebeugen (langsam)",targetMuscle:"Quadrizeps, Gluteus, hintere Oberschenkel",technique:"Füße schulterbreit, Gewicht auf den Fersen, tief runter (mind. 90°), 3 Sek. runter, 1 Sek. hoch.",commonMistakes:"Knie fallen nach innen, Fersen heben ab, Rundrücken.",videoQuery:"Kniebeugen Technik"},
  {name:"Bulgarian Split Squats",targetMuscle:"Quadrizeps, Gluteus, Balance",technique:"Hinterer Fuß auf Erhöhung, vorderes Knie über dem Fuß, tief absenken, Oberkörper aufrecht.",commonMistakes:"Knie schießt über Fuß hinaus, wackeliges Gleichgewicht, zu wenig Tiefe.",videoQuery:"Bulgarian Split Squat"},
  {name:"Hip Thrusts",targetMuscle:"Gluteus maximus, hintere Oberschenkel",technique:"Schulterblätter auf Bank/Erhöhung, Hantel auf der Hüfte, Hüfte maximal strecken und oben kurz halten.",commonMistakes:"Überstreckung der Lendenwirbelsäule, zu wenig Squeeze oben.",videoQuery:"Hip Thrust Kurzhantel"},
  {name:"Klimmzüge",targetMuscle:"Latissimus, Bizeps, oberer Rücken",technique:"Schulterbreiter Obergriff, Schulterblätter nach unten ziehen, Kinn über die Stange, kontrolliert ablassen.",commonMistakes:"Kipping/Schwung, nicht volle Range of Motion, Schultern hochgezogen.",videoQuery:"Klimmzüge Technik"},
  {name:"Australian Rows",targetMuscle:"Oberer Rücken, Bizeps, hintere Schulter",technique:"Unter einer Stange liegen, Körper gerade, zur Stange ziehen, Schulterblätter zusammen.",commonMistakes:"Hüfte hängt, Ellbogen zu weit außen, nicht voller Bewegungsumfang.",videoQuery:"Australian Rows Rudern"},
  {name:"Chin-Ups",targetMuscle:"Bizeps, Latissimus",technique:"Untergriff, schulterbreit greifen, aus dem Hang komplett hochziehen, kontrolliert runter.",commonMistakes:"Zu viel Schwung, halbe Wiederholungen.",videoQuery:"Chin Ups Technik"},
  {name:"Dips",targetMuscle:"Trizeps, untere Brust, vordere Schulter",technique:"Arme strecken, kontrolliert absenken bis 90°, wieder hochdrücken. Oberkörper leicht vorbeugen für mehr Brust.",commonMistakes:"Zu tief gehen (Schulterstress), Schultern hochziehen, Schwung.",videoQuery:"Dips Technik richtig"},
  {name:"Pike Push-ups",targetMuscle:"Schultern, Trizeps",technique:"Hüfte hoch in umgekehrte V-Position, Kopf Richtung Boden senken, wieder hochdrücken.",commonMistakes:"Zu flacher Winkel (wird normaler Liegestütz), Kopf nicht tief genug.",videoQuery:"Pike Push-ups"},
  {name:"Dead Hang",targetMuscle:"Griffkraft, Schultern, Rücken (Dekompression)",technique:"An der Stange hängen, Schultern aktiv nach unten ziehen, Körper ruhig halten.",commonMistakes:"Schultern passiv hängen lassen, Schwingen.",videoQuery:"Dead Hang Technik"},
  {name:"Hanging Knee Raises",targetMuscle:"Unterer Bauch, Hüftbeuger",technique:"An der Stange hängen, Knie kontrolliert zur Brust ziehen, langsam ablassen.",commonMistakes:"Zu viel Schwung, Knie nicht hoch genug, unkontrolliertes Ablassen.",videoQuery:"Hanging Knee Raises"},
  {name:"Dead Bug",targetMuscle:"Core (tiefe Stabilisation)",technique:"Rückenlage, gegenüberliegenden Arm und Bein strecken, Rücken bleibt am Boden. Langsam und kontrolliert.",commonMistakes:"Hohlkreuz, zu schnelle Bewegung, Rücken hebt vom Boden ab.",videoQuery:"Dead Bug Übung"},
  {name:"Hollow Hold",targetMuscle:"Core (Rektus, Transversus)",technique:"Rückenlage, Arme und Beine gestreckt leicht vom Boden heben, unterer Rücken bleibt am Boden.",commonMistakes:"Hohlkreuz, Beine zu hoch, Spannung lässt nach.",videoQuery:"Hollow Hold Technik"},
  {name:"L-Sit",targetMuscle:"Core, Hüftbeuger, Trizeps",technique:"Auf Parallettes oder am Boden abstützen, Beine gestreckt nach vorne halten. Anfänger: Knie angewinkelt.",commonMistakes:"Rücken rund, Schultern hochgezogen, zu wenig Spannung.",videoQuery:"L-Sit Tutorial Anfänger"},
];

/* ===================== STORAGE ===================== */
const STORAGE_KEY = "trainingsplan_data";
function loadData() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; }
}
function saveData(d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
let data = loadData();

function getLog(dayId, exId) {
  return data[dayId]?.[exId] ?? { actualReps: "", completedSets: 0, done: false };
}
function updateLog(dayId, exId, update) {
  if (!data[dayId]) data[dayId] = {};
  if (!data[dayId][exId]) data[dayId][exId] = { actualReps: "", completedSets: 0, done: false };
  Object.assign(data[dayId][exId], update);
  saveData(data);
}
function resetDay(dayId) {
  delete data[dayId];
  saveData(data);
}
function getDayProgress(dayId, count) {
  if (count === 0) return 0;
  const dl = data[dayId] ?? {};
  const done = Object.values(dl).filter(e => e.done).length;
  return Math.round((done / count) * 100);
}

/* ===================== RENDER WEEK GRID ===================== */
function renderWeekGrid() {
  const grid = document.getElementById("weekGrid");
  grid.innerHTML = "";
  trainingPlan.forEach(day => {
    const exCount = day.exercises.filter(e => !e.isOptional).length;
    const progress = getDayProgress(day.id, exCount);
    const isJudo = day.label === "Judo";
    const isRest = day.isRestDay;

    const card = document.createElement("div");
    card.className = "day-card";
    card.onclick = () => openModal(day);

    let html = "";
    if (exCount > 0) {
      html += `<div class="progress-bar"><div class="progress-bar-fill" style="width:${progress}%"></div></div>`;
    }
    html += `<span class="emoji">${day.emoji}</span>`;
    html += `<span class="day-name">${day.dayName}</span>`;
    html += `<span class="day-label">${day.label}</span>`;
    if (isJudo) html += `<span class="day-info">Training</span>`;
    if (isRest) html += `<span class="day-info">Ruhetag</span>`;
    if (exCount > 0) html += `<span class="exercise-count">${exCount} Übungen</span>`;
    card.innerHTML = html;
    grid.appendChild(card);
  });
}

/* ===================== RENDER CATALOG ===================== */
let openCatalogIndex = null;

function renderCatalog(highlightName) {
  const el = document.getElementById("catalog");
  el.innerHTML = "";
  exerciseCatalog.forEach((ex, i) => {
    const item = document.createElement("div");
    item.className = "catalog-item";
    item.id = "catalog-" + i;
    if (highlightName && ex.name.toLowerCase() === highlightName.toLowerCase()) {
      item.classList.add("highlighted");
      setTimeout(() => item.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      setTimeout(() => item.classList.remove("highlighted"), 3000);
    }

    const isOpen = openCatalogIndex === i;
    let html = `<button class="catalog-header" onclick="toggleCatalog(${i})">
      <div><span class="name">${ex.name}</span><span class="muscle">${ex.targetMuscle}</span></div>
      <span class="chevron ${isOpen ? "open" : ""}">▼</span>
    </button>`;

    if (isOpen) {
      html += `<div class="catalog-body">
        <h4 class="tech">Technik</h4><p>${ex.technique}</p>
        <h4 class="mistakes">Häufige Fehler</h4><p>${ex.commonMistakes}</p>
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.videoQuery)}" target="_blank" rel="noopener noreferrer">🎬 Video ansehen</a>
      </div>`;
    }
    item.innerHTML = html;
    el.appendChild(item);
  });
}

function toggleCatalog(i) {
  openCatalogIndex = openCatalogIndex === i ? null : i;
  renderCatalog();
}

function scrollToCatalogExercise(name) {
  // Find the matching catalog entry
  const idx = exerciseCatalog.findIndex(e => e.name.toLowerCase() === name.toLowerCase());
  // Also try partial match (e.g. "Liegestütze langsam" → "Liegestütze (langsam)")
  const idx2 = idx === -1 ? exerciseCatalog.findIndex(e =>
    e.name.toLowerCase().includes(name.toLowerCase().split(" ")[0])
  ) : idx;
  const finalIdx = idx !== -1 ? idx : idx2;
  if (finalIdx === -1) return;
  openCatalogIndex = finalIdx;
  renderCatalog(exerciseCatalog[finalIdx].name);
}

/* ===================== MODAL ===================== */
function openModal(day) {
  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("modal");
  overlay.style.display = "flex";

  const isJudo = day.label === "Judo";
  const isRest = day.isRestDay;

  let html = `<div class="modal-header">
    <div>
      <h2>${day.emoji} ${day.dayName}</h2>
      <p>${day.location} – ${day.label}</p>
    </div>
    <div class="modal-header-actions">
      ${day.exercises.length > 0 ? `<button class="modal-btn danger" onclick="handleReset('${day.id}')" title="Tag zurücksetzen">↺</button>` : ""}
      <button class="modal-btn" onclick="closeModal()">✕</button>
    </div>
  </div>`;

  html += `<div class="modal-content">`;

  if (isJudo) {
    html += `<div class="info-panel"><p class="title">🥋 Judo-Training</p><p class="sub">Keine zusätzlichen Kraftübungen</p></div>`;
  } else if (isRest) {
    html += `<div class="info-panel"><p class="title">😴 Erholung / Mobility</p><p class="sub">Keine Kraftübungen – aktive Regeneration</p></div>`;
  }

  day.exercises.forEach(ex => {
    const log = getLog(day.id, ex.id);
    const maxSets = ex.sets === "–" ? 0 : parseInt(ex.sets) || 0;
    const doneClass = log.done ? " done" : "";
    const optClass = ex.isOptional ? " optional" : "";

    html += `<div class="exercise-card${doneClass}${optClass}">
      <div class="exercise-top">
        <div>
          <h3>${ex.name}${ex.isOptional ? '<span class="badge">optional</span>' : ""}</h3>
          <div class="sets-reps">${ex.sets}×${ex.reps}</div>
        </div>
        <button class="catalog-link-btn" onclick="handleCatalogLink('${ex.name.replace(/'/g, "\\'")}')" title="Im Übungskatalog anzeigen">📖</button>
      </div>`;

    if (!ex.isOptional && maxSets > 0) {
      html += `<div class="tracking">
        <div class="tracking-row">
          <label>Ist-Wert:</label>
          <input type="text" value="${log.actualReps}" placeholder="${ex.reps}"
            oninput="updateLog('${day.id}','${ex.id}',{actualReps:this.value})" />
        </div>
        <div class="tracking-row">
          <label>Sätze:</label>
          <div class="set-buttons">`;
      for (let s = 1; s <= maxSets; s++) {
        html += `<button class="set-btn${s <= log.completedSets ? " active" : ""}"
          onclick="handleSetClick('${day.id}','${ex.id}',${s},${log.completedSets})">${s}</button>`;
      }
      html += `</div></div>
        <div class="tracking-row">
          <label></label>
          <label class="done-label">
            <input type="checkbox" ${log.done ? "checked" : ""}
              onchange="handleDone('${day.id}','${ex.id}',this.checked)" />
            <span class="${log.done ? "checked" : ""}">Erledigt</span>
          </label>
        </div>
      </div>`;
    }
    html += `</div>`;
  });

  html += `</div>`;
  modal.innerHTML = html;

  // Close on overlay click
  overlay.onclick = function (e) { if (e.target === overlay) closeModal(); };
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

function handleSetClick(dayId, exId, set, current) {
  updateLog(dayId, exId, { completedSets: current === set ? set - 1 : set });
  // Re-open the modal for the same day
  const day = trainingPlan.find(d => d.id === dayId);
  if (day) openModal(day);
  renderWeekGrid();
}

function handleDone(dayId, exId, checked) {
  updateLog(dayId, exId, { done: checked });
  const day = trainingPlan.find(d => d.id === dayId);
  if (day) openModal(day);
  renderWeekGrid();
}

function handleReset(dayId) {
  resetDay(dayId);
  const day = trainingPlan.find(d => d.id === dayId);
  if (day) openModal(day);
  renderWeekGrid();
}

function handleCatalogLink(name) {
  closeModal();
  setTimeout(() => scrollToCatalogExercise(name), 200);
}

/* ===================== INIT ===================== */
renderWeekGrid();
renderCatalog();
