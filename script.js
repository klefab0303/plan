const TOTAL_WEEKS = 8;
let currentWeek = Number(localStorage.getItem("week")) || 1;

const plan = {
  Montag: [
    "🏠 Bankdrücken 5x8–12",
    "🏠 Schulterdrücken 4x8–12",
    "🏠 Liegestütze 4x20–30",
    "🏠 Enge Liegestütze 3x max",
    "🏠 Seitheben 3x20",
    "🏠 Plank 3x60s"
  ],
  Dienstag: ["Judo"],
  Mittwoch: [
    "🏠 Kniebeugen 5x15–20",
    "🏠 Bulgarian Split Squats 4x10",
    "🏠 Hip Thrusts 4x15",
    "🏠 Wadenheben 4x20",
    "🏠 Hollow Hold 3x40s"
  ],
  Donnerstag: [
    "🌳 Klimmzüge 6x max",
    "🌳 Australian Rows 5x15",
    "🌳 Chin-Ups 4x max",
    "🌳 Dead Hang 4x60s"
  ],
  Freitag: ["Judo"],
  Samstag: [
    "🌳 Dips 6x6–10",
    "🌳 Explosive Liegestütze 4x15",
    "🌳 Pike Push-ups 4x12",
    "🌳 L-Sit 4x20s"
  ],
  Sonntag: ["Erholung / Mobility"]
};

const calendar = document.getElementById("calendar");
const weekEl = document.getElementById("week");
const progressEl = document.getElementById("progress");

function storageKey(day, ex) {
  return `w${currentWeek}-${day}-${ex}`;
}

function render() {
  calendar.innerHTML = "";
  weekEl.textContent = currentWeek;

  let done = 0;
  let total = 0;

  for (const day in plan) {
    const div = document.createElement("div");
    div.className = "day";
    div.innerHTML = `<h3>${day}</h3>`;

    plan[day].forEach(ex => {
      total++;
      const key = storageKey(day, ex);
      const checked = localStorage.getItem(key) === "true";
      if (checked) done++;

      const row = document.createElement("div");
      row.className = "exercise";
      row.innerHTML = `
        <span>${ex}</span>
        <input type="checkbox" ${checked ? "checked" : ""}>
      `;

      row.querySelector("input").addEventListener("change", e => {
        localStorage.setItem(key, e.target.checked);
        render();
      });

      div.appendChild(row);
    });

    calendar.appendChild(div);
  }

  progressEl.textContent = Math.round((done / total) * 100);
}

document.getElementById("next").onclick = () => {
  if (currentWeek < TOTAL_WEEKS) {
    currentWeek++;
    localStorage.setItem("week", currentWeek);
    render();
  }
};

document.getElementById("prev").onclick = () => {
  if (currentWeek > 1) {
    currentWeek--;
    localStorage.setItem("week", currentWeek);
    render();
  }
};

document.getElementById("resetWeek").onclick = () => {
  for (const day in plan) {
    plan[day].forEach(ex => {
      localStorage.removeItem(storageKey(day, ex));
    });
  }
  render();
};

render();
