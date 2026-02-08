const weekPlan = {
  Montag: ["Schwimmen"],
  Dienstag: ["Bankdrücken", "Schulterdrücken", "Liegestütze"],
  Mittwoch: ["Kniebeugen", "Hip Thrusts"],
  Donnerstag: ["Klimmzüge", "Australian Rows"],
  Freitag: ["Judo"],
  Samstag: ["Dips", "Pike Push-ups"],
  Sonntag: ["Erholung"]
};

const exerciseData = {
  "Bankdrücken": {
    reps: "5×8–12",
    link: "https://www.youtube.com/results?search_query=bankdrücken+technik",
    desc: "Grundübung für Brust, Schulter, Trizeps."
  },
  "Klimmzüge": {
    reps: "6× max",
    link: "https://www.youtube.com/results?search_query=klimmzüge+technik",
    desc: "Beste Rückenübung mit Eigengewicht."
  },
  "Dips": {
    reps: "6×6–10",
    link: "https://www.youtube.com/results?search_query=dips+technik",
    desc: "Push-Übung für Brust & Trizeps."
  }
};

// Tabelle bauen
const table = document.getElementById("week");
for (const day in weekPlan) {
  const row = table.insertRow();
  row.insertCell().textContent = day;
  const cell = row.insertCell();
  cell.textContent = weekPlan[day].join(", ");
  cell.onclick = () => openModal(day);
}

// Modal
function openModal(day) {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal-title").textContent = day;
  const body = document.getElementById("modal-body");
  body.innerHTML = "";

  weekPlan[day].forEach(ex => {
    const data = exerciseData[ex] || {};
    body.innerHTML += `
      <div class="exercise">
        <strong>${ex}</strong> (${data.reps || "—"})<br>
        Ist: <input placeholder="z.B. 15"><br>
        <a href="${data.link || "#"}" target="_blank">Zur Erklärung</a>
      </div>
    `;
  });
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Katalog
const catalog = document.getElementById("catalog");
for (const ex in exerciseData) {
  const d = exerciseData[ex];
  catalog.innerHTML += `
    <details>
      <summary>${ex}</summary>
      <p>${d.desc}</p>
      <a href="${d.link}" target="_blank">Video</a>
    </details>
  `;
}
