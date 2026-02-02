// Globale Variablen
let vocabList = [];
let selectedLessons = [];
let currentCards = [];
let currentIndex = 0;

// LocalStorage Keys
const STORAGE_KEY = "vocabStats";
let stats = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// CSV laden
document.getElementById("loadBtn").addEventListener("click", () => {
  const file = document.getElementById("csvFile").files[0];
  if (!file) return alert("Bitte CSV auswählen");

  const reader = new FileReader();
  reader.onload = () => {
    parseCSV(reader.result);
    showLessons();
  };
  reader.readAsText(file);
});

// CSV Parser
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

// Lektionen anzeigen
function showLessons() {
  document.getElementById("upload-section").style.display = "none";
  const lessonDiv = document.getElementById("lessons");
  lessonDiv.innerHTML = "";

  const lessons = [...new Set(vocabList.map(v => v.lektion))].sort((a,b)=>a-b);
  lessons.forEach(l => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = l;
    label.appendChild(checkbox);
    label.append(` Lektion ${l}`);
    lessonDiv.appendChild(label);
  });

  document.getElementById("lesson-section").style.display = "block";
}

// Lektionen auswählen und Training starten
document.getElementById("startTraining").addEventListener("click", () => {
  selectedLessons = Array.from(document.querySelectorAll("#lessons input:checked"))
                        .map(cb => Number(cb.value));

  if (selectedLessons.length === 0) return alert("Bitte mindestens eine Lektion auswählen");

  currentCards = vocabList.filter(v => selectedLessons.includes(v.lektion));
  shuffle(currentCards);
  currentIndex = 0;

  document.getElementById("lesson-section").style.display = "none";
  document.getElementById("flashcard-section").style.display = "block";
  showCard();
});

// Karte anzeigen
function showCard() {
  if (currentIndex >= currentCards.length) {
    showStats();
    return;
  }
  const card = currentCards[currentIndex];
  document.getElementById("front").innerText = card.latein;
  document.getElementById("back").style.display = "none";
  document.getElementById("back").innerText = `${card.formen}\n${card.deutsch}`;
}

// Karte aufdecken
document.getElementById("flashcard").addEventListener("click", () => {
  const back = document.getElementById("back");
  back.style.display = back.style.display === "none" ? "block" : "none";
});

// Gewusst
document.getElementById("knowBtn").addEventListener("click", () => handleAnswer(true));
document.getElementById("dontKnowBtn").addEventListener("click", () => handleAnswer(false));

function handleAnswer(known) {
  const card = currentCards[currentIndex];
  if (!stats[card.latein]) stats[card.latein] = { right: 0, wrong: 0 };
  if (known) stats[card.latein].right++;
  else stats[card.latein].wrong++;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  currentIndex++;
  showCard();
}

// Statistik anzeigen
function showStats() {
  document.getElementById("flashcard-section").style.display = "none";
  document.getElementById("stats-section").style.display = "block";

  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = "";

  let total = 0, right = 0;
  for (const key in stats) {
    const s = stats[key];
    total += s.right + s.wrong;
    right += s.right;
  }
  const percent = total === 0 ? 0 : Math.round((right/total)*100);
  statsDiv.innerHTML = `<p>Gesamt: ${total} | Richtig: ${right} | Quote: ${percent}%</p>`;

  for (const key in stats) {
    const s = stats[key];
    const p = document.createElement("p");
    p.innerText = `${key}: Richtig ${s.right} / Falsch ${s.wrong}`;
    statsDiv.appendChild(p);
  }
}

// Alles zurücksetzen
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Alles löschen?")) return;
  localStorage.removeItem(STORAGE_KEY);
  stats = {};
  location.reload();
});

// Hilfsfunktion: shuffle
function shuffle(array) {
  for (let i = array.length -1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
