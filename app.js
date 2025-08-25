// ============ TEAM INFO & META ============
let teamAInfo = {
  name: "Team A",
  coach: "Coach A",
  logo: "",
  league: "Sample League",
  venue: "Arena Stadium",
  date: "2025-08-25",
  referees: "Referee 1, Referee 2"
};

// ============ ROSTER ============
let playersA = [
  { name: "Player 1", points: 10, rebounds: 5, assists: 3, fouls: 2, steals: 1, blocks: 1, portrait: "", timePlayed: 25 },
  { name: "Player 2", points: 7, rebounds: 3, assists: 5, fouls: 1, steals: 2, blocks: 0, portrait: "", timePlayed: 20 },
  { name: "Player 3", points: 15, rebounds: 7, assists: 2, fouls: 3, steals: 0, blocks: 2, portrait: "", timePlayed: 30 },
];

// ============ PERIODS ============
let periods = ["Q1", "Q2", "Q3", "Q4"];
let periodStatsA = [
  { points: 20, rebounds: 10, assists: 8 },
  { points: 18, rebounds: 9, assists: 7 },
  { points: 22, rebounds: 11, assists: 9 },
  { points: 21, rebounds: 12, assists: 10 }
];

// ============ GAME LOG ============
let gameLogA = [
  { time: "00:05", event: "Player 1 scored 2 points" },
  { time: "00:10", event: "Player 2 got a rebound" },
  { time: "00:15", event: "Player 3 assisted Player 1" },
  { time: "00:18", event: "Player 2 stole the ball" },
  { time: "00:20", event: "Player 3 blocked a shot" }
];

// ============ RENDER FUNCTIONS ============

function renderTeamInfo() {
  document.getElementById("teamAName").value = teamAInfo.name;
  document.getElementById("coachAName").value = teamAInfo.coach;
  document.getElementById("leagueName").value = teamAInfo.league;
  document.getElementById("venueName").value = teamAInfo.venue;
  document.getElementById("gameDate").value = teamAInfo.date;
  document.getElementById("referees").value = teamAInfo.referees;
  if (teamAInfo.logo) {
    document.getElementById("teamALogoPreview").src = teamAInfo.logo;
    document.getElementById("teamALogoPreview").style.display = "inline";
  }
}

function renderPlayerTable() {
  const table = document.getElementById('teamATable');
  let html = `<tr>
    <th>Portrait</th>
    <th>Name</th>
    <th>Points</th>
    <th>Rebounds</th>
    <th>Assists</th>
    <th>Fouls</th>
    <th>Steals</th>
    <th>Blocks</th>
    <th>Time Played</th>
    <th>Remove</th>
  </tr>`;
  playersA.forEach((p, i) => {
    html += `<tr>
      <td>${p.portrait ? `<img src="${p.portrait}" style="width:34px;border-radius:50%;">` : `<input type="file" accept="image/*" style="width:34px" onchange="uploadPortrait(${i},this)">`}</td>
      <td><input value="${p.name}" onchange="updatePlayer(${i},'name',this.value)"/></td>
      <td>
        <span>${p.points}</span>
        <button onclick="addPoints(${i},1)">+1</button>
        <button onclick="addPoints(${i},2)">+2</button>
        <button onclick="addPoints(${i},3)">+3</button>
      </td>
      <td><input type="number" value="${p.rebounds}" onchange="updatePlayer(${i},'rebounds',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.assists}" onchange="updatePlayer(${i},'assists',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.fouls}" onchange="updatePlayer(${i},'fouls',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.steals}" onchange="updatePlayer(${i},'steals',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.blocks}" onchange="updatePlayer(${i},'blocks',this.value)" style="width:40px"/></td>
      <td>${formatTimer(Math.round(p.timePlayed))}</td>
      <td><button onclick="removePlayer(${i})">-</button></td>
    </tr>`;
  });
  table.innerHTML = html;
  renderTeamSummary();
}

function addPlayer() {
  playersA.push({ name: "", points: 0, rebounds: 0, assists: 0, fouls: 0, steals: 0, blocks: 0, portrait: "", timePlayed: 0 });
  renderPlayerTable();
}

function removePlayer(idx) {
  playersA.splice(idx, 1);
  renderPlayerTable();
}

function updatePlayer(idx, field, value) {
  if (['points','rebounds','assists','fouls','steals','blocks','timePlayed'].includes(field)) value = parseInt(value)||0;
  playersA[idx][field] = value;
  renderPlayerTable();
}

function addPoints(idx, amount) {
  playersA[idx].points = (playersA[idx].points || 0) + amount;
  renderPlayerTable();
}

function uploadPortrait(idx, input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      playersA[idx].portrait = e.target.result;
      renderPlayerTable();
    };
    reader.readAsDataURL(file);
  }
}

function renderTeamSummary() {
  const summary = document.getElementById('teamASummary');
  const totalPoints = playersA.reduce((a, b) => a + b.points, 0);
  const totalRebounds = playersA.reduce((a, b) => a + b.rebounds, 0);
  const totalAssists = playersA.reduce((a, b) => a + b.assists, 0);
  summary.innerHTML = `Total Points: ${totalPoints} | Total Rebounds: ${totalRebounds} | Total Assists: ${totalAssists}`;
  document.getElementById('totalPointsDisplay').textContent = `Total Points: ${totalPoints}`;
}

function renderPeriodStats() {
  const table = document.getElementById('teamAPeriods');
  let html = `<tr><th>Period</th><th>Points</th><th>Rebounds</th><th>Assists</th></tr>`;
  periodStatsA.forEach((p, i) => {
    html += `<tr>
      <td>${periods[i]}</td>
      <td><input type="number" value="${p.points}" onchange="updatePeriodStat(${i},'points',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.rebounds}" onchange="updatePeriodStat(${i},'rebounds',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.assists}" onchange="updatePeriodStat(${i},'assists',this.value)" style="width:60px"/></td>
    </tr>`;
  });
  table.innerHTML = html;
}

function updatePeriodStat(idx, field, value) {
  periodStatsA[idx][field] = parseInt(value)||0;
  renderPeriodStats();
}

function renderGameLog() {
  const list = document.getElementById('gameLogList');
  let html = "<ul>";
  gameLogA.forEach(ev => {
    html += `<li><b>${ev.time}</b> - ${ev.event}</li>`;
  });
  html += "</ul>";
  list.innerHTML = html;
}

function exportCSVTeamA() {
  let csv = "Name,Points,Rebounds,Assists,Fouls,Steals,Blocks,Time Played\n";
  playersA.forEach(p => {
    csv += `${p.name},${p.points},${p.rebounds},${p.assists},${p.fouls},${p.steals},${p.blocks},${formatTimer(p.timePlayed)}\n`;
  });
  downloadCSV(csv, "team-a-roster.csv");
}

function exportPeriodCSVTeamA() {
  let csv = "Period,Points,Rebounds,Assists\n";
  periodStatsA.forEach((p, i) => {
    csv += `${periods[i]},${p.points},${p.rebounds},${p.assists}\n`;
  });
  downloadCSV(csv, "team-a-periods.csv");
}

function exportGameLogCSVTeamA() {
  let csv = "Time,Event\n";
  gameLogA.forEach(ev => {
    csv += `${ev.time},${ev.event}\n`;
  });
  downloadCSV(csv, "team-a-gamelog.csv");
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function formatTimer(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function resetScoresheet() {
  if (confirm("Are you sure you want to reset all Team A data?")) {
    playersA = [];
    periodStatsA = periods.map(() => ({ points: 0, rebounds: 0, assists: 0 }));
    gameLogA = [];
    renderPlayerTable();
    renderPeriodStats();
    renderGameLog();
    renderTeamSummary();
  }
}

// Timer logic
let timerInterval = null;
let timerSeconds = 600;

function updateTimerDisplay() {
  const min = Math.floor(timerSeconds / 60);
  const sec = timerSeconds % 60;
  document.getElementById("timerDisplay").textContent = `${min}:${sec.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  timerSeconds = parseInt(document.getElementById("timerMin").value) * 60 + parseInt(document.getElementById("timerSec").value);
  updateTimerDisplay();
  pauseTimer();
}

document.getElementById("startTimer").onclick = startTimer;
document.getElementById("pauseTimer").onclick = pauseTimer;
document.getElementById("resetTimer").onclick = resetTimer;

document.getElementById("teamAName").onchange = e => { teamAInfo.name = e.target.value; };
document.getElementById("coachAName").onchange = e => { teamAInfo.coach = e.target.value; };
document.getElementById("leagueName").onchange = e => { teamAInfo.league = e.target.value; };
document.getElementById("venueName").onchange = e => { teamAInfo.venue = e.target.value; };
document.getElementById("gameDate").onchange = e => { teamAInfo.date = e.target.value; };
document.getElementById("referees").onchange = e => { teamAInfo.referees = e.target.value; };
document.getElementById("teamALogo").onchange = function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      teamAInfo.logo = e.target.result;
      document.getElementById("teamALogoPreview").src = e.target.result;
      document.getElementById("teamALogoPreview").style.display = "inline";
    };
    reader.readAsDataURL(file);
  }
};

window.onload = function() {
  renderTeamInfo();
  renderPlayerTable();
  renderPeriodStats();
  renderGameLog();
  renderTeamSummary();
  resetTimer();
};