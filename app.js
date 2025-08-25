// Storage Key
const STORAGE_KEY = 'basketballScoresheet_v3';

// Data Model
let playersA = [
  { number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0, steals: 0, blocks: 0, turnovers: 0, fgMade: 0, fgAtt: 0, ftMade: 0, ftAtt: 0, threeMade: 0, threeAtt: 0, portrait: '', onCourt: false, timePlayed: 0 }
];
let playersB = [
  { number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0, steals: 0, blocks: 0, turnovers: 0, fgMade: 0, fgAtt: 0, ftMade: 0, ftAtt: 0, threeMade: 0, threeAtt: 0, portrait: '', onCourt: false, timePlayed: 0 }
];
let numPeriods = 4;
let periodNames = ["Q1", "Q2", "Q3", "Q4"];
let teamAPeriodStats = [];
let teamBPeriodStats = [];
let teamALogo = "";
let teamBLogo = "";

// Timer Model
let timerSeconds = 600; // default 10:00
let timerInterval = null;
let timerRunning = false;

// Game Info
let leagueName = "";
let venueName = "";
let gameDate = "";
let referees = "";

// Game Log
let gameLog = [];
let leadChanges = 0;
let lastLeader = null;

// Theme
let darkMode = false;

// Utility
function pad(n) { return n.toString().padStart(2, '0'); }
function formatTimer(secs) {
  const min = Math.floor(secs / 60);
  const sec = secs % 60;
  return `${pad(min)}:${pad(sec)}`;
}

// ========== TIMER ==========
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
      updateTimePlayed();
      saveToStorage();
    } else {
      pauseTimer();
      logEvent('Game timer ended');
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

// ========== PLAYER TABLES ==========
function addPlayer(team) {
  const list = team === 'A' ? playersA : playersB;
  list.push({ number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0, steals: 0, blocks: 0, turnovers: 0, fgMade: 0, fgAtt: 0, ftMade: 0, ftAtt: 0, threeMade: 0, threeAtt: 0, portrait: '', onCourt: false, timePlayed: 0 });
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
    <th>On Court</th>
    <th>#</th>
    <th>Portrait</th>
    <th>Name</th>
    <th>Pts</th>
    <th>Reb</th>
    <th>Ast</th>
    <th>Fouls</th>
    <th>Stl</th>
    <th>Blk</th>
    <th>Time Played</th>
    <th>Remove</th>
  </tr>`;
  list.forEach((p, i) => {
    html += `<tr>
      <td><input value="${p.number}" onchange="updatePlayer('${team}',${i},'number',this.value)" style="width:40px"/></td>
      <td>
        ${p.portrait ? `<img src="${p.portrait}" style="width:32px;height:32px;border-radius:50%"/>` : ''}
        <input type="file" accept="image/*" style="width:34px" onchange="uploadPortrait('${team}',${i},this)">
      </td>
      <td><input value="${p.name}" onchange="updatePlayer('${team}',${i},'name',this.value)"/></td>
      <td><input type="checkbox" ${p.onCourt ? 'checked' : ''} onchange="toggleOnCourt('${team}',${i},this.checked)"/></td>
      <td>
  <span>${p.points}</span>
  <button onclick="addPoints('${team}',${i},1)">+1</button>
  <button onclick="addPoints('${team}',${i},2)">+2</button>
  <button onclick="addPoints('${team}',${i},3)">+3</button>
</td>
      <td><input type="number" value="${p.rebounds}" onchange="updatePlayer('${team}',${i},'rebounds',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.assists}" onchange="updatePlayer('${team}',${i},'assists',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.fouls}" onchange="updatePlayer('${team}',${i},'fouls',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.steals}" onchange="updatePlayer('${team}',${i},'steals',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.blocks}" onchange="updatePlayer('${team}',${i},'blocks',this.value)" style="width:40px"/></td>
      <td>${formatTimer(Math.round(p.timePlayed))}</td>
      <td><button onclick="removePlayer('${team}',${i})">-</button></td>
    </tr>`;
  });
  table.innerHTML = html;
  renderTeamSummary(team);
  renderSubs(team);
}

function updatePlayer(team, idx, field, value) {
  const list = team === 'A' ? playersA : playersB;
  if (['points','rebounds','assists','fouls','steals','blocks','turnovers','fgMade','fgAtt','ftMade','ftAtt','threeMade','threeAtt'].includes(field)) value = parseInt(value)||0;
  list[idx][field] = value;
  saveToStorage();
  renderTeamSummary(team);
  updateTotalPointsDisplay();
}

function addPoints(team, idx, amount) {
  const list = team === 'A' ? playersA : playersB;
  list[idx].points = (list[idx].points || 0) + amount;
  saveToStorage();
  renderPlayerTable(team);
  renderTeamSummary(team);
  updateTotalPointsDisplay();
}

function uploadPortrait(team, idx, input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      if (team === 'A') playersA[idx].portrait = e.target.result;
      else playersB[idx].portrait = e.target.result;
      renderPlayerTable(team);
      saveToStorage();
    };
    reader.readAsDataURL(file);
  }
}

function toggleOnCourt(team, idx, checked) {
  const list = team === 'A' ? playersA : playersB;
  list[idx].onCourt = checked;
  logEvent(`Player ${list[idx].name || '(unnamed)'} (${team}) ${checked ? 'entered' : 'left'} the court`);
  saveToStorage();
  renderSubs(team);
}

// ========== PERIODS ==========
function setPeriodStats() {
  if (!window._periodStatsLoaded) {
    teamAPeriodStats = Array(numPeriods).fill().map(() => ({ score: 0, timeouts: 0, teamFouls: 0 }));
    teamBPeriodStats = Array(numPeriods).fill().map(() => ({ score: 0, timeouts: 0, teamFouls: 0 }));
  }
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
    let periodLabel = periodNames[i] || `P${i+1}`;
    html += `<tr>
      <td><input value="${periodLabel}" onchange="updatePeriodName(${i},this.value)"/></td>
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
  if (field === 'score') updateLeadChanges();
  saveToStorage();
  renderTeamSummary(team);
}

function updatePeriodName(idx, value) {
  periodNames[idx] = value;
  renderPeriodTables();
  saveToStorage();
}

// ========== TEAM SUMMARY ==========
function renderTeamSummary(team) {
  const list = team === 'A' ? playersA : playersB;
  const stats = team === 'A' ? teamAPeriodStats : teamBPeriodStats;
  const summaryId = team === 'A' ? 'teamASummary' : 'teamBSummary';
  let total = {
    points: 0, rebounds: 0, assists: 0, fouls: 0, steals: 0, blocks: 0, turnovers: 0,
    fgMade: 0, fgAtt: 0, ftMade: 0, ftAtt: 0, threeMade: 0, threeAtt: 0
  };
  list.forEach(p => {
    total.points += p.points;
    total.rebounds += p.rebounds;
    total.assists += p.assists;
    total.fouls += p.fouls;
    total.steals += p.steals;
    total.blocks += p.blocks;
    total.turnovers += p.turnovers;
    total.fgMade += p.fgMade;
    total.fgAtt += p.fgAtt;
    total.ftMade += p.ftMade;
    total.ftAtt += p.ftAtt;
    total.threeMade += p.threeMade;
    total.threeAtt += p.threeAtt;
  })
function updateTotalPointsDisplay() {
  const totalA = playersA.reduce((sum, p) => sum + (p.points || 0), 0);
  const totalB = playersB.reduce((sum, p) => sum + (p.points || 0), 0);
  document.getElementById('totalPointsDisplay').textContent = `Total Points: A ${totalA} - B ${totalB}`;
  };
  // Percentages
  let fgPct = total.fgAtt ? ((total.fgMade / total.fgAtt) * 100).toFixed(1) : '-';
  let ftPct = total.ftAtt ? ((total.ftMade / total.ftAtt) * 100).toFixed(1) : '-';
  let threePct = total.threeAtt ? ((total.threeMade / total.threeAtt) * 100).toFixed(1) : '-';
  // Score
  let runningScore = stats.map(p => p.score).reduce((a,b)=>a+b,0);
  // Lead change
  let leadText = '';
  if (team === 'A') {
    let scoreA = teamAPeriodStats.map(p=>p.score).reduce((a,b)=>a+b,0);
    let scoreB = teamBPeriodStats.map(p=>p.score).reduce((a,b)=>a+b,0);
    leadText = scoreA > scoreB ? 'Leading' : (scoreA < scoreB ? 'Trailing' : 'Tied');
  }
  document.getElementById(summaryId).innerHTML = `
    <b>Total:</b> Pts: ${total.points} | Reb: ${total.rebounds} | Ast: ${total.assists} | Fouls: ${total.fouls} |<br>
    Stl: ${total.steals} | Blk: ${total.blocks} | TO: ${total.turnovers}<br>
    FG: ${total.fgMade}/${total.fgAtt} (${fgPct}%) | FT: ${total.ftMade}/${total.ftAtt} (${ftPct}%) | 3PT: ${total.threeMade}/${total.threeAtt} (${threePct}%)<br>
    <b>Running Score:</b> ${runningScore} | <span>${leadText}</span>
  `;
}

// ========== SUBSTITUTION TRACKER ==========
function renderSubs(team) {
  const list = team === 'A' ? playersA : playersB;
  const subsId = team === 'A' ? 'teamASubs' : 'teamBSubs';
  let html = `<table style="width:100%"><tr><th>#</th><th>Name</th><th>On Court</th><th>Time Played</th></tr>`;
  list.forEach((p, i) => {
    html += `<tr>
      <td>${p.number}</td>
      <td>${p.name}</td>
      <td>${p.onCourt ? '✔️' : ''}</td>
      <td>${formatTimer(Math.round(p.timePlayed))}</td>
    </tr>`;
  });
  html += `</table>`;
  document.getElementById(subsId).innerHTML = html;
}

function updateTimePlayed() {
  [playersA, playersB].forEach(list => {
    list.forEach(p => {
      if (p.onCourt) p.timePlayed = (p.timePlayed || 0) + 1;
    });
  });
  renderSubs('A');
  renderSubs('B');
  renderPlayerTable('A');
  renderPlayerTable('B');
  saveToStorage();
}

// ========== GAME LOG ==========
function logEvent(msg) {
  const now = new Date();
  gameLog.unshift({
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    msg
  });
  renderGameLog();
  saveToStorage();
}

function renderGameLog() {
  const ul = document.getElementById('gameLog');
  ul.innerHTML = gameLog.map(e => `<li><b>[${e.time}]</b> ${e.msg}</li>`).join('');
}

function exportLogCSV() {
  let csv = "Time,Event\n" + gameLog.map(e => `"${e.time}","${e.msg.replace(/"/g,'""')}"`).join('\n');
  downloadCSV(csv, 'game_log.csv');
}

// ========== LEAD CHANGE ==========
function updateLeadChanges() {
  let scoreA = teamAPeriodStats.map(p=>p.score).reduce((a,b)=>a+b,0);
  let scoreB = teamBPeriodStats.map(p=>p.score).reduce((a,b)=>a+b,0);
  let leader = scoreA > scoreB ? 'A' : (scoreB > scoreA ? 'B' : 'Tied');
  if (lastLeader !== null && leader !== lastLeader && leader !== 'Tied') {
    leadChanges++;
    logEvent(`Lead changed to Team ${leader} (${scoreA} - ${scoreB})`);
  }
  lastLeader = leader;
}

// ========== EXPORT CSV/EXCEL ==========
function exportCSV() {
  let csv = '';
  // Game info
  csv += `League,Tournament,Venue,Date,Referees\n"${leagueName}","${venueName}","${gameDate}","${referees}"\n\n`;
  // Team stats
  ['A','B'].forEach(team => {
    const list = team === 'A' ? playersA : playersB;
    csv += `Team ${team},Number,Name,Points,Reb,Ast,Fouls,Stl,Blk,TO,FG Made,FG Att,FT Made,FT Att,3PT Made,3PT Att,Time Played\n`;
    list.forEach(p => {
      csv += `,${p.number},"${p.name}",${p.points},${p.rebounds},${p.assists},${p.fouls},${p.steals},${p.blocks},${p.turnovers},${p.fgMade},${p.fgAtt},${p.ftMade},${p.ftAtt},${p.threeMade},${p.threeAtt},${Math.round(p.timePlayed)}\n`;
    });
    csv += '\n';
  });
  // Period stats
  csv += 'Period,TeamA Score,TeamA Timeouts,TeamA Fouls,TeamB Score,TeamB Timeouts,TeamB Fouls\n';
  for (let i=0; i<numPeriods; ++i) {
    csv += `${periodNames[i]||`P${i+1}`},${teamAPeriodStats[i]?.score||''},${teamAPeriodStats[i]?.timeouts||''},${teamAPeriodStats[i]?.teamFouls||''},${teamBPeriodStats[i]?.score||''},${teamBPeriodStats[i]?.timeouts||''},${teamBPeriodStats[i]?.teamFouls||''}\n`;
  }
  downloadCSV(csv, 'scoresheet.csv');
}

function downloadCSV(csv, name) {
  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Placeholder for Google Drive
function addToDrive() {
  alert('Google Drive sync is not enabled. (Demo placeholder)');
}

// ========== LOGO UPLOAD ==========
function logoUpload(team, input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      if (team === 'A') {
        teamALogo = e.target.result;
        document.getElementById('teamALogoPreview').src = teamALogo;
        document.getElementById('teamALogoPreview').style.display = 'inline';
      } else {
        teamBLogo = e.target.result;
        document.getElementById('teamBLogoPreview').src = teamBLogo;
        document.getElementById('teamBLogoPreview').style.display = 'inline';
      }
      saveToStorage();
    };
    reader.readAsDataURL(file);
  }
}

// ========== THEME SWITCHER ==========
function toggleTheme() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);
  document.getElementById('themeToggle').textContent = darkMode ? '☀️' : '🌙';
  saveToStorage();
}

// ========== PERSISTENCE ==========
function saveToStorage() {
  // Save all fields
  const teamAName = document.getElementById('teamAName').value;
  const coachAName = document.getElementById('coachAName').value;
  const teamBName = document.getElementById('teamBName').value;
  const coachBName = document.getElementById('coachBName').value;
  leagueName = document.getElementById('leagueName').value;
  venueName = document.getElementById('venueName').value;
  gameDate = document.getElementById('gameDate').value;
  referees = document.getElementById('referees').value;

  const data = {
    playersA, playersB,
    teamAPeriodStats, teamBPeriodStats,
    numPeriods, periodNames,
    timerSeconds,
    teamAName, coachAName, teamBName, coachBName,
    leagueName, venueName, gameDate, referees,
    teamALogo, teamBLogo, darkMode, gameLog, leadChanges, lastLeader
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

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
      periodNames = data.periodNames || periodNames;
      timerSeconds = typeof data.timerSeconds === "number" ? data.timerSeconds : timerSeconds;

      window._storedNames = {
        teamAName: data.teamAName || "Team A",
        coachAName: data.coachAName || "Coach A",
        teamBName: data.teamBName || "Team B",
        coachBName: data.coachBName || "Coach B"
      };
      leagueName = data.leagueName || '';
      venueName = data.venueName || '';
      gameDate = data.gameDate || '';
      referees = data.referees || '';

      teamALogo = data.teamALogo || '';
      teamBLogo = data.teamBLogo || '';
      darkMode = data.darkMode || false;
      gameLog = data.gameLog || [];
      leadChanges = data.leadChanges || 0;
      lastLeader = data.lastLeader || null;

      window._periodStatsLoaded = true;
    } catch (e) { /* ignore parse errors */ }
  }
}

function restoreNames() {
  if (window._storedNames) {
    document.getElementById('teamAName').value = window._storedNames.teamAName;
    document.getElementById('coachAName').value = window._storedNames.coachAName;
    document.getElementById('teamBName').value = window._storedNames.teamBName;
    document.getElementById('coachBName').value = window._storedNames.coachBName;
  }
  document.getElementById('leagueName').value = leagueName;
  document.getElementById('venueName').value = venueName;
  document.getElementById('gameDate').value = gameDate;
  document.getElementById('referees').value = referees;
  if (teamALogo) {
    document.getElementById('teamALogoPreview').src = teamALogo;
    document.getElementById('teamALogoPreview').style.display = 'inline';
  }
  if (teamBLogo) {
    document.getElementById('teamBLogoPreview').src = teamBLogo;
    document.getElementById('teamBLogoPreview').style.display = 'inline';
  }
  document.body.classList.toggle('dark', darkMode);
  document.getElementById('themeToggle').textContent = darkMode ? '☀️' : '🌙';
}

// ========== RESET ==========
function resetScoresheet() {
  if (confirm('Clear all data and reset scoresheet?')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}
window.resetScoresheet = resetScoresheet;

// ========== INIT ==========
window.addPlayer = addPlayer;
window.removePlayer = removePlayer;
window.updatePlayer = updatePlayer;
window.updatePeriodStat = updatePeriodStat;
window.updatePeriodName = updatePeriodName;
window.toggleOnCourt = toggleOnCourt;
window.uploadPortrait = uploadPortrait;
window.logoUpload = logoUpload;

window.onload = function() {
  loadFromStorage();

  // Team/coach names, league, venue, date, referees persistence
  document.getElementById('teamAName').addEventListener('change', saveToStorage);
  document.getElementById('coachAName').addEventListener('change', saveToStorage);
  document.getElementById('teamBName').addEventListener('change', saveToStorage);
  document.getElementById('coachBName').addEventListener('change', saveToStorage);
  document.getElementById('leagueName').addEventListener('change', saveToStorage);
  document.getElementById('venueName').addEventListener('change', saveToStorage);
  document.getElementById('gameDate').addEventListener('change', saveToStorage);
  document.getElementById('referees').addEventListener('change', saveToStorage);

  document.getElementById('numPeriods').addEventListener('change', e => {
    const val = e.target.value;
    if (val === "OT") {
      let n = prompt("Number of periods (for O.T.)?", "5");
      numPeriods = Math.max(1, parseInt(n)||5);
      periodNames = Array(numPeriods).fill().map((_,i)=>i<4?`Q${i+1}`:`OT${i-3}`);
    } else {
      numPeriods = parseInt(val);
      periodNames = Array(numPeriods).fill().map((_,i)=>val==="2"?`H${i+1}`:`Q${i+1}`);
    }
    setPeriodStats();
    renderPeriodTables();
    saveToStorage();
  });

  document.getElementById('teamALogo').addEventListener('change', function(){logoUpload('A',this)});
  document.getElementById('teamBLogo').addEventListener('change', function(){logoUpload('B',this)});
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  setPeriodStats();
  restoreNames();
  renderPlayerTable('A');
  renderPlayerTable('B');
  renderPeriodTables();
  renderSubs('A');
  renderSubs('B');
  initTimer();
  renderGameLog();
  updateTotalPointsDisplay();
};
window.exportCSV = exportCSV;
window.exportLogCSV = exportLogCSV;
window.addToDrive = addToDrive;
window.addPoints = addPoints;
