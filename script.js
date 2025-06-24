//----------TOGGLE BETWEEN PACE/TIME/DISTANCE CONTAINERS----------

const paceContainer = document.querySelector("#paceDiv");
const timeContainer = document.querySelector("#timeDiv");
const distanceContainer = document.querySelector("#distanceDiv");
const paceBtn = document.querySelector(".paceBtn");
const timeBtn = document.querySelector(".timeBtn");
const distanceBtn = document.querySelector(".distanceBtn");
const note = document.querySelector(".note");
const calculateHeading = document.querySelector("#calculate-heading");

// Function to handle container switch
function handleContainerSwitch(activeBtn, activeContainer) {
  const buttons = [paceBtn, timeBtn, distanceBtn];
  const containers = [paceContainer, timeContainer, distanceContainer];

  // Set active button styles
  buttons.forEach((btn) => {
    btn.style.backgroundColor = btn === activeBtn ? "#dcdcdc" : "#198fd9";
    btn.style.color = btn === activeBtn ? "#1c1c1c" : "white";
    btn.style.fontWeight = btn === activeBtn ? "700" : "400";
  });

  // Set active container display
  containers.forEach((container) => {
    container.style.display = container === activeContainer ? "block" : "none";
  });
}

// Event listeners for button clicks
paceBtn.addEventListener("click", () => {
  handleContainerSwitch(paceBtn, paceContainer);
  calculateHeading.textContent = "Calculate Your Pace";
});

timeBtn.addEventListener("click", () => {
  handleContainerSwitch(timeBtn, timeContainer);
  calculateHeading.textContent = "Calculate Your Time";
});

distanceBtn.addEventListener("click", () => {
  handleContainerSwitch(distanceBtn, distanceContainer);
  calculateHeading.textContent = "Calculate Your Distance";
});

// Initial setup - display pace container by default
handleContainerSwitch(paceBtn, paceContainer);

//----------UPDATE DISTANCE INPUT FROM DROPDOWN:----------

const selectPaceEvent = document.querySelector("#paceEvent");
const selectTimeEvent = document.querySelector("#timeEvent");
const paceDistanceInput = document.querySelector("#paceDistance");
const timeDistanceInput = document.querySelector("#timeDistance");

// Function to update distance input for pace
function updateDistanceInputPace() {
  updateDistanceInput(selectPaceEvent, paceDistanceInput);
}

// Function to update distance input for time
function updateDistanceInputTime() {
  updateDistanceInput(selectTimeEvent, timeDistanceInput);
}

// Function to update distance input based on selected event
function updateDistanceInput(selectElement, distanceInput) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const selectedValue = selectedOption.value;
  distanceInput.value = selectedValue;
}

// Event listeners for dropdown menu changes
selectPaceEvent.addEventListener("change", updateDistanceInputPace);
selectTimeEvent.addEventListener("change", updateDistanceInputTime);

//----------PACE CONTAINER - CALCULATE PACE----------

const paceForm = document.querySelector("#paceForm");
const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");
const secondsInput = document.querySelector("#seconds");
const results = document.querySelector("#result");

function calculatePace() {
  const hours = parseFloat(hoursInput.value) || 0;
  const minutes = parseFloat(minutesInput.value) || 0;
  const seconds = parseFloat(secondsInput.value) || 0;
  const distance = parseFloat(paceDistanceInput.value);

  // Calculate total time in seconds
  const totalTimeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;

  // Calculate pace per kilometer
  const kmPace = totalTimeInSeconds / distance;
  const minPerKm = Math.floor(kmPace / 60);
  let secPerKm = kmPace % 60;

  secPerKm = Number.isInteger(secPerKm)
    ? secPerKm.toFixed(0)
    : secPerKm.toFixed(2);

  // Clear previous results
  results.innerHTML = "";

  // Display pace result
  // const h3 = document.createElement("h3");
  // h3.innerHTML = "Results";
  // h3.classList.add("pace-results");
  // results.append(h3);

  // const p1 = document.createElement("p");
  // p1.innerHTML = `Your pace is <span>${minPerKm} minutes ${secPerKm} seconds</span> per kilometer.`;

  const p1 = document.createElement("p");
  p1.innerHTML = `Your pace: <span>${minPerKm} minutes ${secPerKm} seconds</span> per kilometer.`;

  p1.classList.add("paceParagraph");
  results.append(p1);

  const p2 = document.createElement("p");
  p2.innerText =
    "At this pace, the times required for other race distances are:";
  p2.classList.add("paceParagraph1");
  results.append(p2);

  // Create a table element
  const table = document.createElement("table");
  table.classList.add("pace-results-table");

  // Create a table header row
  const headerRow = document.createElement("tr");
  const distanceHeader = document.createElement("th");

  distanceHeader.innerText = "Distance (km)";
  distanceHeader.style.padding = "8px 12px";
  distanceHeader.style.textAlign = "left";
  headerRow.appendChild(distanceHeader);

  const timeHeader = document.createElement("th");
  timeHeader.innerText = "Time";
  timeHeader.style.padding = "8px 12px";
  timeHeader.style.textAlign = "left";
  headerRow.appendChild(timeHeader);
  table.appendChild(headerRow);

  // Populate table with results for common distances
  // const commonDistances = [
  //   1, 2, 3, 4, 5, 10, 15, 20, 21.1, 25, 30, 35, 40, 42.2,
  // ];

  // commonDistances.forEach((distance) => {
  //   const paceInSeconds = kmPace * distance;
  //   const totalMinutes = Math.floor(paceInSeconds / 60);
  //   const hour = Math.floor(totalMinutes / 60);
  //   const min = Math.floor(totalMinutes % 60)
  //     .toString()
  //     .padStart(2, "0")
  //     .padEnd(2, "0");
  //   const sec = Math.ceil(paceInSeconds % 60)
  //     .toString()
  //     .padStart(2, "0")
  //     .padEnd(2, "0");

  //   const distanceCell = document.createElement("td");
  //   distanceCell.innerText = `${distance}km`;

  //   const timeCell = document.createElement("td");
  //   timeCell.innerText = hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`;

  //   const row = document.createElement("tr");
  //   row.appendChild(distanceCell);
  //   row.appendChild(timeCell);

  //   table.appendChild(row);
  // });

  let maxSplit = distance;

  // Cap splits at 42.2km
  if (maxSplit > 42.2) maxSplit = 42.2;

  // Loop through whole kilometers
  for (let i = 1; i < Math.floor(maxSplit); i++) {
    addSplitRow(i);
  }

  // Always include the final distance (even if decimal like 21.1, 42.2, etc.)
  addSplitRow(maxSplit);

  // Helper function to create and append row
  function addSplitRow(dist) {
    const paceInSeconds = kmPace * dist;
    const totalMinutes = Math.floor(paceInSeconds / 60);
    const hour = Math.floor(totalMinutes / 60);
    const min = String(Math.floor(totalMinutes % 60)).padStart(2, "0");
    const sec = String(Math.ceil(paceInSeconds % 60)).padStart(2, "0");

    const distanceCell = document.createElement("td");
    distanceCell.innerText = `${dist}km`;

    const timeCell = document.createElement("td");
    timeCell.innerText = hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`;

    const row = document.createElement("tr");
    row.appendChild(distanceCell);
    row.appendChild(timeCell);

    table.appendChild(row);
  }

  // Append the new table to the results container
  results.appendChild(table);
}

//----------FORM SUBMISSION----------

paceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  results.innerHTML = "";
  note.style.display = "none";
  calculatePace();
});

//----------TIME CONTAINER - CALCULATE TIME----------

const timeForm = document.querySelector("#timeForm");
const timeMinutesInput = document.querySelector("#timeMinutes");
const timeSecondsInput = document.querySelector("#timeSeconds");

function calculateTime() {
  // Clear previous results
  results.innerHTML = "";

  const minutes = parseFloat(timeMinutesInput.value) || 0;
  const seconds = parseFloat(timeSecondsInput.value) || 0;
  const distance = parseFloat(timeDistanceInput.value);

  const totalTimeInSeconds = (minutes * 60 + seconds) * distance;
  const totalMinutes = totalTimeInSeconds / 60;
  const hour = Math.floor(totalMinutes / 60);
  const min = Math.floor(totalMinutes % 60);
  let sec = totalTimeInSeconds % 60;

  sec = Number.isInteger(sec) ? sec.toFixed(0) : sec.toFixed(2);

  // Display pace result
  // const h3 = document.createElement("h3");
  // h3.innerHTML = "Results";
  // h3.classList.add("pace-results");
  // results.append(h3);

  const p1 = document.createElement("p");

  p1.innerHTML =
    hour > 0
      ? `Your time: <span>${hour} hours ${min} minutes ${sec} seconds</span>.`
      : `Your time: <span>${min} minutes ${sec} seconds</span>.`;

  p1.classList.add("paceParagraph");
  results.appendChild(p1);

  const p2 = document.createElement("p");
  p2.innerText = "At this pace, your times for other race distances are:";
  p2.classList.add("paceParagraph1");
  results.appendChild(p2);

  // Create a table element
  const table = document.createElement("table");
  table.classList.add("pace-results-table");

  // Create a table header row
  const headerRow = document.createElement("tr");
  const distanceHeader = document.createElement("th");
  distanceHeader.innerText = "Distance (km)";
  distanceHeader.style.padding = "8px 12px";
  distanceHeader.style.textAlign = "left";

  headerRow.appendChild(distanceHeader);
  const timeHeader = document.createElement("th");
  timeHeader.innerText = "Time";
  timeHeader.style.padding = "8px 12px";
  timeHeader.style.textAlign = "left";
  headerRow.appendChild(timeHeader);
  table.appendChild(headerRow);

  // Populate table with results for common distances
  // const commonDistances = [
  //   1, 2, 3, 4, 5, 10, 15, 20, 21.1, 25, 30, 35, 40, 42.2,
  // ];

  // commonDistances.forEach((dist) => {
  //   const totalTimeInSeconds = (minutes * 60 + seconds) * dist;
  //   const totalMinutes = totalTimeInSeconds / 60;
  //   const hour = Math.floor(totalMinutes / 60);
  //   const min = Math.floor(totalMinutes % 60)
  //     .toString()
  //     .padStart(2, "0")
  //     .padEnd(2, "0");
  //   const sec = Math.ceil(totalTimeInSeconds % 60)
  //     .toString()
  //     .padStart(2, "0")
  //     .padEnd(2, "0");

  //   const distanceCell = document.createElement("td");
  //   distanceCell.innerText = `${dist}km`;

  //   const timeCell = document.createElement("td");
  //   timeCell.innerText = hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`;

  //   const row = document.createElement("tr");
  //   row.appendChild(distanceCell);
  //   row.appendChild(timeCell);

  //   table.appendChild(row);
  // });

  let maxSplit = parseFloat(timeDistanceInput.value);

  // Limit to marathon distance
  if (maxSplit > 42.2) maxSplit = 42.2;

  function addSplitRow(dist) {
    const totalTimeInSeconds = (minutes * 60 + seconds) * dist;
    const totalMinutes = totalTimeInSeconds / 60;
    const hour = Math.floor(totalMinutes / 60);
    const min = Math.floor(totalMinutes % 60)
      .toString()
      .padStart(2, "0")
      .padEnd(2, "0");
    const sec = Math.ceil(totalTimeInSeconds % 60)
      .toString()
      .padStart(2, "0")
      .padEnd(2, "0");

    const distanceCell = document.createElement("td");
    distanceCell.innerText = `${dist}km`;

    const timeCell = document.createElement("td");
    timeCell.innerText = hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`;

    const row = document.createElement("tr");
    row.appendChild(distanceCell);
    row.appendChild(timeCell);

    table.appendChild(row);
  }

  // Add all full km splits (e.g. 1km, 2km, ..., 20km)
  for (let i = 1; i < Math.floor(maxSplit); i++) {
    addSplitRow(i);
  }

  // Add final split (e.g. 21.1km, 5km, 10km)
  addSplitRow(maxSplit);

  results.appendChild(table);
}

timeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  results.innerHTML = "";
  note.style.display = "none";
  calculateTime();
});

//----------DISTANCE CONTAINER - CALCULATE DISTANCE----------
const distForm = document.querySelector("#distForm");
const distHoursInput = document.querySelector("#distHours");
const distMinutesInput = document.querySelector("#distMinutes");
const distSecondsInput = document.querySelector("#distSeconds");
const distPaceMinutes = document.querySelector("#distPaceMinutes");
const distPaceSeconds = document.querySelector("#distPaceSeconds");

function calculateDist() {
  const hours = parseFloat(distHoursInput.value) || 0;
  const minutes = parseFloat(distMinutesInput.value) || 0;
  const seconds = parseFloat(distSecondsInput.value) || 0;
  const paceMinutes = parseFloat(distPaceMinutes.value) || 0;
  const paceSeconds = parseFloat(distPaceSeconds.value) || 0;

  const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalPaceInSeconds = paceMinutes * 60 + paceSeconds;

  let distance = totalTimeInSeconds / totalPaceInSeconds;

  distance = Number.isInteger(distance)
    ? distance.toFixed(0)
    : distance.toFixed(3);

  // Display pace result
  // const h3 = document.createElement("h3");
  // h3.innerHTML = "Results";
  // h3.classList.add("pace-results");
  // results.append(h3);

  const p1 = document.createElement("p");

  // p1.innerHTML = `With the given time and pace, the distance traveled will be: <span>${distance}km</span>`;
  p1.innerHTML = `Your distance: <span>${distance}km</span>`;

  p1.classList.add("paceParagraph");
  results.appendChild(p1);

  const p2 = document.createElement("p");
  p2.innerText = "At this pace, your times for other race distances are:";
  p2.classList.add("paceParagraph1");
  results.appendChild(p2);

  // Create a table element
  const table = document.createElement("table");
  table.classList.add("pace-results-table");

  // Create a table header row
  const headerRow = document.createElement("tr");
  const distanceHeader = document.createElement("th");
  distanceHeader.innerText = "Distance (km)";
  distanceHeader.style.padding = "8px 12px";
  distanceHeader.style.textAlign = "left";

  headerRow.appendChild(distanceHeader);
  const timeHeader = document.createElement("th");
  timeHeader.innerText = "Time";
  timeHeader.style.padding = "8px 12px";
  timeHeader.style.textAlign = "left";
  headerRow.appendChild(timeHeader);
  table.appendChild(headerRow);

  // Populate table with results for common distances
  // const commonDistances = [
  //   1, 2, 3, 4, 5, 10, 15, 20, 21.1, 25, 30, 35, 40, 42.2,
  // ];

  // commonDistances.forEach((dist) => {
  //   const totalTime = totalPaceInSeconds * dist;
  //   const totalMinutes = totalTime / 60;
  //   const hour = Math.floor(totalMinutes / 60);
  //   const min = Math.floor(totalMinutes % 60)
  //     .toString()
  //     .padStart(2, "0")
  //     .padEnd(2, "0");
  //   const sec = Math.ceil(totalTime % 60)
  //     .toString()
  //     .padStart(2, "0")
  //     .padEnd(2, "0");

  //   const distanceCell = document.createElement("td");
  //   distanceCell.innerText = `${dist}km`;

  //   const timeCell = document.createElement("td");
  //   timeCell.innerText = hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`;

  //   const row = document.createElement("tr");
  //   row.appendChild(distanceCell);
  //   row.appendChild(timeCell);

  //   table.appendChild(row);
  // });
  let maxSplit = parseFloat(distance);

  // Limit to marathon distance
  if (maxSplit > 42.2) maxSplit = 42.2;

  function addSplitRow(dist) {
    const totalTime = totalPaceInSeconds * dist;
    const totalMinutes = totalTime / 60;
    const hour = Math.floor(totalMinutes / 60);
    const min = Math.floor(totalMinutes % 60)
      .toString()
      .padStart(2, "0")
      .padEnd(2, "0");
    const sec = Math.ceil(totalTime % 60)
      .toString()
      .padStart(2, "0")
      .padEnd(2, "0");

    const distanceCell = document.createElement("td");
    distanceCell.innerText = `${dist}km`;

    const timeCell = document.createElement("td");
    timeCell.innerText = hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`;

    const row = document.createElement("tr");
    row.appendChild(distanceCell);
    row.appendChild(timeCell);

    table.appendChild(row);
  }

  // Add full splits (e.g. 1km, 2km, 3km...)
  for (let i = 1; i < Math.floor(maxSplit); i++) {
    addSplitRow(i);
  }

  // Add the final distance row (e.g. 7.8km, 21.1km, etc.)
  addSplitRow(maxSplit);

  results.appendChild(table);
}

distForm.addEventListener("submit", (e) => {
  e.preventDefault();
  results.innerHTML = "";
  note.style.display = "none";
  calculateDist();
});

//----------RESET FUNCTION----------
const reset = document.querySelectorAll(".reset");

function resetField() {
  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
  paceDistanceInput.value = "";
  timeDistanceInput.value = "";
  results.innerHTML = "";
}

reset.forEach((r) => {
  r.addEventListener("click", resetField);
});
