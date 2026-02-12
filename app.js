222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
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
