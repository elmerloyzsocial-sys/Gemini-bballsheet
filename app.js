// Data Model
const STORAGE_KEY = 'basketballScoresheet_v2';

let playersA = [
  { number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0 }
];
let playersB = [
  { number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0 }
];
let numPeriods = 4;
let teamAPeriodStats = [];
let teamBPeriodStats = [];

// Timer Model
let timerSeconds = 600; // default 10:00
let timerInterval = null;
let timerRunning = false;

function pad(n) {
  return n.toString().padStart(2, '0');
}

function formatTimer(secs) {
  const min = Math.floor(secs / 60);
  const sec = secs % 60;
  return `${pad(min)}:${pad(sec)}`;
}

function updateTimerDisplay() {
  document.getElementById('timerDisplay').textContent = formatTimer(timerSeconds);
  document.getElementById('timerMin').value = pad(Math.floor(timerSeconds / 60));
  document.getElementById('timerSec').value = pad(timerSeconds % 60);
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
      saveToStorage();
    } else {
      pauseTimer();
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  if (timerInterval) clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 60 * parseInt(document.getElementById('timerMin').value || 10) +
                 parseInt(document.getElementById('timerSec').value || 0);
  updateTimerDisplay();
  saveToStorage();
}

function editTimer() {
  pauseTimer();
  let min = parseInt(document.getElementById('timerMin').value) || 0;
  let sec = parseInt(document.getElementById('timerSec').value) || 0;
  if (min > 99) min = 99;
  if (sec > 59) sec = 59;
  timerSeconds = min * 60 + sec;
  updateTimerDisplay();
  saveToStorage();
}

function initTimer() {
  document.getElementById('timerMin').addEventListener('change', editTimer);
  document.getElementById('timerSec').addEventListener('change', editTimer);
  document.getElementById('startTimer').addEventListener('click', startTimer);
  document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
  document.getElementById('resetTimer').addEventListener('click', resetTimer);
  updateTimerDisplay();
}

// Scoresheet Model
function init() {
  document.getElementById('numPeriods').addEventListener('change', e => {
    numPeriods = parseInt(e.target.value);
    setPeriodStats();
    renderPeriodTables();
    saveToStorage();
  });

  // Team/Coach names persistence
  document.getElementById('teamAName').addEventListener('change', saveToStorage);
  document.getElementById('coachAName').addEventListener('change', saveToStorage);
  document.getElementById('teamBName').addEventListener('change', saveToStorage);
  document.getElementById('coachBName').addEventListener('change', saveToStorage);

  setPeriodStats();
  renderPlayerTable('A');
  renderPlayerTable('B');
  renderPeriodTables();
  initTimer();
  restoreNames();
}

function setPeriodStats() {
  // Only reset if not loaded from storage
  if (!window._periodStatsLoaded) {
    teamAPeriodStats = Array(numPeriods).fill().map(() => ({ score: 0, timeouts: 0, teamFouls: 0 }));
    teamBPeriodStats = Array(numPeriods).fill().map(() => ({ score: 0, timeouts: 0, teamFouls: 0 }));
  }
}

function addPlayer(team) {
  const list = team === 'A' ? playersA : playersB;
  list.push({ number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0 });
  renderPlayerTable(team);
  saveToStorage();
}

function removePlayer(team, idx) {
  const list = team === 'A' ? playersA : playersB;
  list.splice(idx, 1);
  renderPlayerTable(team);
  saveToStorage();
}

function renderPlayerTable(team) {
  const list = team === 'A' ? playersA : playersB;
  const tableId = team === 'A' ? 'teamATable' : 'teamBTable';
  const table = document.getElementById(tableId);

  let html = `<tr>
    <th>#</th><th>Name</th><th>Points</th><th>Reb</th><th>Ast</th><th>Fouls</th><th>Remove</th>
  </tr>`;
  list.forEach((p, i) => {
    html += `<tr>
      <td><input value="${p.number}" onchange="updatePlayer('${team}',${i},'number',this.value)" style="width:40px"/></td>
      <td><input value="${p.name}" onchange="updatePlayer('${team}',${i},'name',this.value)"/></td>
      <td><input type="number" value="${p.points}" onchange="updatePlayer('${team}',${i},'points',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.rebounds}" onchange="updatePlayer('${team}',${i},'rebounds',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.assists}" onchange="updatePlayer('${team}',${i},'assists',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.fouls}" onchange="updatePlayer('${team}',${i},'fouls',this.value)" style="width:60px"/></td>
      <td><button onclick="removePlayer('${team}',${i})">-</button></td>
    </tr>`;
  });
  table.innerHTML = html;
}

function updatePlayer(team, idx, field, value) {
  const list = team === 'A' ? playersA : playersB;
  if (['points','rebounds','assists','fouls'].includes(field)) value = parseInt(value)||0;
  list[idx][field] = value;
  saveToStorage();
}

function renderPeriodTables() {
  renderPeriodTable('A');
  renderPeriodTable('B');
}

function renderPeriodTable(team) {
  const stats = team === 'A' ? teamAPeriodStats : teamBPeriodStats;
  const tableId = team === 'A' ? 'teamAPeriods' : 'teamBPeriods';
  const table = document.getElementById(tableId);

  let html = `<tr>
    <th>Period</th><th>Score</th><th>Timeouts</th><th>Team Fouls</th>
  </tr>`;
  stats.forEach((p, i) => {
    html += `<tr>
      <td>${i+1}</td>
      <td><input type="number" value="${p.score}" onchange="updatePeriodStat('${team}',${i},'score',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.timeouts}" onchange="updatePeriodStat('${team}',${i},'timeouts',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.teamFouls}" onchange="updatePeriodStat('${team}',${i},'teamFouls',this.value)" style="width:60px"/></td>
    </tr>`;
  });
  table.innerHTML = html;
}

function updatePeriodStat(team, idx, field, value) {
  const stats = team === 'A' ? teamAPeriodStats : teamBPeriodStats;
  stats[idx][field] = parseInt(value) || 0;
  saveToStorage();
}

// Persistence: Save
function saveToStorage() {
  // Save input values for team/coach names as well
  const teamAName = document.getElementById('teamAName').value;
  const coachAName = document.getElementById('coachAName').value;
  const teamBName = document.getElementById('teamBName').value;
  const coachBName = document.getElementById('coachBName').value;

  const data = {
    playersA, playersB,
    teamAPeriodStats, teamBPeriodStats,
    numPeriods,
    timerSeconds,
    teamAName, coachAName, teamBName, coachBName
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Persistence: Load
function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      playersA = data.playersA || playersA;
      playersB = data.playersB || playersB;
      teamAPeriodStats = data.teamAPeriodStats || teamAPeriodStats;
      teamBPeriodStats = data.teamBPeriodStats || teamBPeriodStats;
      numPeriods = data.numPeriods || numPeriods;
      timerSeconds = typeof data.timerSeconds === "number" ? data.timerSeconds : timerSeconds;

      // Team/coach names
      window._storedNames = {
        teamAName: data.teamAName || "Team A",
        coachAName: data.coachAName || "Coach A",
        teamBName: data.teamBName || "Team B",
        coachBName: data.coachBName || "Coach B"
      };

      // Mark that period stats loaded so setPeriodStats won't overwrite them
      window._periodStatsLoaded = true;
    } catch (e) { /* ignore parse errors */ }
  }
}

// Restore team/coach names input values after rendering
function restoreNames() {
  if (window._storedNames) {
    document.getElementById('teamAName').value = window._storedNames.teamAName;
    document.getElementById('coachAName').value = window._storedNames.coachAName;
    document.getElementById('teamBName').value = window._storedNames.teamBName;
    document.getElementById('coachBName').value = window._storedNames.coachBName;
  }
}

// Add a reset function/button
function resetScoresheet() {
  if (confirm('Clear all data and reset scoresheet?')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}
window.resetScoresheet = resetScoresheet;

// Expose functions for inline event handlers
window.addPlayer = addPlayer;
window.removePlayer = removePlayer;
window.updatePlayer = updatePlayer;
window.updatePeriodStat = updatePeriodStat;

// Load data before init
window.onload = function() {
  loadFromStorage();
  init();
};