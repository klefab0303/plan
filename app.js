/* ===================== DATA ===================== */
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
