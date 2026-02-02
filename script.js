// Globale Variablen
let vocabList = [];
let selectedLessons = [];
let currentCards = [];
let currentIndex = 0;

const STORAGE_KEY = "vocabStats";
let stats = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Sections anzeigen
function showSection(sectionId){
    const sections = ["dashboard", "lessonSelect", "flashcards", "statistics"];
    sections.forEach(id => document.getElementById(id).style.display = id === sectionId ? "block" : "none");
}

// CSV laden
document.getElementById("uploadCSVBtn").addEventListener("click", () => {
    const file = document.getElementById("csvFile").files[0];
    if(!file) return alert("Bitte CSV auswählen");

    const reader = new FileReader();
    reader.onload = () => {
        parseCSV(reader.result);
        alert("CSV erfolgreich geladen!");
    };
    reader.readAsText(file);
});

// CSV Parser
function parseCSV(text){
    vocabList = text.trim().split("\n").map(line => {
        const [latein, formen, deutsch, lektion] = line.split(",");
        return { latein, formen, deutsch, lektion: Number(lektion) };
    });
}

// Dashboard Buttons
document.getElementById("startLessonBtn").addEventListener("click", () => {
    if(vocabList.length === 0) return alert("Bitte zuerst CSV hochladen!");
    showSection("lessonSelect");
    showLessons();
});

document.getElementById("viewStatsBtn").addEventListener("click", () => {
    showSection("statistics");
    showStats();
});

document.getElementById("resetBtn").addEventListener("click", () => {
    if(!confirm("Alles löschen?")) return;
    localStorage.removeItem(STORAGE_KEY);
    stats = {};
    location.reload();
});

// Lektionen auswählen
function showLessons(){
    const lessonDiv = document.getElementById("lessons");
    lessonDiv.innerHTML = "";
    const lessons = [...new Set(vocabList.map(v=>v.lektion))].sort((a,b)=>a-b);
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

document.getElementById("beginTrainingBtn").addEventListener("click", () => {
    selectedLessons = Array.from(document.querySelectorAll("#lessons input:checked")).map(cb=>Number(cb.value));
    if(selectedLessons.length === 0) return alert("Bitte mindestens eine Lektion auswählen");
    currentCards = vocabList.filter(v=>selectedLessons.includes(v.lektion));
    shuffle(currentCards);
    currentIndex = 0;
    showSection("flashcards");
    updateProgress();
    showCard();
});

// Karteikarten
function showCard(){
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

document.getElementById("flashcard").addEventListener("click", () => {
    const back = document.getElementById("back");
    back.style.display = back.style.display === "none" ? "block" : "none";
});

document.getElementById("knowBtn").addEventListener("click", () => handleAnswer(true));
document.getElementById("dontKnowBtn").addEventListener("click", () => handleAnswer(false));

function handleAnswer(known){
    const card = currentCards[currentIndex];
    const lektion = card.lektion; // LESSON KEY

    if(!stats[lektion]) stats[lektion] = {right:0, wrong:0, total:0};
    stats[lektion].total++;
    if(known) stats[lektion].right++;
    else stats[lektion].wrong++;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    currentIndex++;
    showCard();
}


// Statistik
function showStats() {
    const ctx = document.getElementById('statsChart').getContext('2d');

    const labels = Object.keys(stats).sort((a,b)=>a-b); // Lektionen
    const rightData = labels.map(l => stats[l].right);
    const wrongData = labels.map(l => stats[l].wrong);
    const totalData = labels.map(l => stats[l].total);

    if(window.myChart) window.myChart.destroy(); // vorhandenes Chart löschen

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.map(l => `Lektion ${l}`),
            datasets: [
                {
                    label: 'Richtig',
                    data: rightData,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)'
                },
                {
                    label: 'Falsch',
                    data: wrongData,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)'
                },
                {
                    label: 'Gesamt',
                    data: totalData,
                    type: 'line',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Statistik pro Lektion'
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Zurück zum Dashboard
document.getElementById("backToDashboard").addEventListener("click", ()=> showSection("dashboard"));

// Hilfsfunktion: mischen
function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Fortschritt
function updateProgress(){
    document.getElementById("progress").innerText = `Karte ${currentIndex+1} von ${currentCards.length}`;
}
