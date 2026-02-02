// -------------------------
// Globale Variablen
// -------------------------
let vocabList = [];
let selectedLessons = [];
let currentCards = [];
let currentIndex = 0;

// LocalStorage für Statistik
const STORAGE_KEY = "vocabStats";
let stats = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// -------------------------
// Hilfsfunktion: Sections anzeigen
// -------------------------
function showSection(sectionId) {
  const sections = ["dashboard", "lessonSelect", "flashcards", "statistics"];
  sections.forEach(id => {
    document.getElementById(id).style.display = id === sectionId ? "block" : "none";
  });
}

// -------------------------
// CSV Laden
// -------------------------
document.getElementById("uploadCSVBtn").addEventListener("click", () => {
  const file = document.getElementById("csvFile").files[0];
  if (!file) return alert("Bitte CSV auswählen");

  const reader = new FileReader();
  reader.onload = () => {
    parseCSV(reader.result);
    alert("CSV erfolgreich geladen!");
  };
  reader.readAsText(file);
});

// -------------------------
// CSV Parser
// -------------------------
function parseCSV(text) {
  vocabList = text.trim().split("\n").map(line => {
    const [latein, formen, deutsch, lektion] = line.split(",");
    return {
      latein,
      formen,
      deutsch,
      lektion: Number(lektion)
    };
  });
}

// -------------------------
// Lektionen anzeigen
// -------------------------
function showLessons() {
  const lessonDiv = document.getElementById("lessons");
  lessonDiv.innerHTML = "";

  const lessons = [...new Set(vocabList.map(v => v.lektion))].sort((a,b)=>a-b);
  lessons.forEach(l => {
    const label = document.createElement("label");
    label.className = "lesson";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = l;

    label.appendChild(checkbox);
    label.append(` Lektion ${l}`);
    lessonDiv.appendChild(label);
  });
}

// -------------------------
// Dashboard Buttons
// -------------------------
document.getElementById("startLessonBtn").addEventListener("click", () => {
  if(vocabList.length === 0) return alert("Bitte zuerst CSV hochladen!");
  showSection("lessonSelect");
  showLessons();
});

document.getElementById("viewStatsBtn").addEventListener("click", () => {
  showSection("statistics");
  showStats();
});

document.getElementById("backToDashboard").addEventListener("click", () => {
  showSection("dashboard");
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if(!confirm("Alles löschen?")) return;
  localStorage.removeItem(STORAGE_KEY);
  stats = {};
  location.reload();
});

// -------------------------
// Lektionen auswählen -> Training starten
// -------------------------
document.getElementById("beginTrainingBtn").addEventListener("click", () => {
  selectedLessons = Array.from(document.querySelectorAll("#lessons input:checked"))
                        .map(cb => Number(cb.value));
  if(selectedLessons.length === 0) return alert("Bitte mindestens eine Lektion auswählen");

  currentCards = vocabList.filter(v => selectedLessons.includes(v.lektion));
  shuffle(currentCards);
  currentIndex = 0;

  showSection("flashcards");
  updateProgress();
  showCard();
});

// -------------------------
// Karteikarten
// -------------------------
function showCard() {
  if(currentIndex >= currentCards.length){
    showStats();
    showSection("statistics");
    return;
  }

  const card = currentCards[currentIndex];
  document.getElementById("front").innerText = card.latein;
  document.getElementById("back").innerText = `${card.formen}\n${card.deutsch}`;
  document.getElementById("back").style.display = "none";

  updateProgress();
}

// Karte aufdecken
document.getElementById("flashcard").addEventListener("click", () => {
  const back = document.getElementById("back");
  back.style.display = back.style.display === "none" ? "block" : "none";
});

// Gewusst / Nicht gewusst
document.getElementById("knowBtn").addEventListener("click", () => handleAnswer(true));
document.getElementById("dontKnowBtn").addEventListener("click", () => handleAnswer(false));

function handleAnswer(known){
  const card = currentCards[currentIndex];
  if(!stats[card.latein]) stats[card.latein] = {right:0, wrong:0};
  if(known) stats[card.latein].right++;
  else stats[card.latein].wrong++;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  currentIndex++;
  showCard();
}

// Fortschrittsanzeige
function updateProgress(){
  document.getElementById("progress").innerText = `Karte ${currentIndex+1} von ${currentCards.length}`;
}

// -------------------------
// Statistik anzeigen
// -------------------------
function showStats(){
  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = "";

  let total = 0, right = 0;
  for(const key in stats){
    total += stats[key].right + stats[key].wrong;
    right += stats[key].right;
  }
  const percent = total === 0 ? 0 : Math.round((right/total)*100);

  statsDiv.innerHTML = `<p>Gesamt: ${total} | Richtig: ${right} | Quote: ${percent}%</p>`;

  for(const key in stats){
    const s = stats[key];
    const p = document.createElement("p");
    p.innerText = `${key}: Richtig ${s.right} / Falsch ${s.wrong}`;
    statsDiv.appendChild(p);
  }
}

// -------------------------
// Hilfsfunktion: Array mischen
// -------------------------
function shuffle(array){
  for(let i=array.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
