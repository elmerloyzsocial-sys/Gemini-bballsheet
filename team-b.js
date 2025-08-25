// Static display only for Team B

// ============ TEAM INFO & META ============
const teamBInfo = {
  name: "Team B",
  coach: "Coach B",
  logo: "team-b-logo.png",
  league: "Sample League",
  venue: "Arena Stadium",
  date: "2025-08-25",
  referees: "Referee 1, Referee 2"
};

// ============ ROSTER ============
const teamBPlayers = [
  { name: "Player 1", points: 10, rebounds: 5, assists: 3, fouls: 2, steals: 1, blocks: 1, portrait: "", timePlayed: 25 },
  { name: "Player 2", points: 7, rebounds: 3, assists: 5, fouls: 1, steals: 2, blocks: 0, portrait: "", timePlayed: 20 },
  { name: "Player 3", points: 15, rebounds: 7, assists: 2, fouls: 3, steals: 0, blocks: 2, portrait: "", timePlayed: 30 },
];

// ============ PERIODS ============
const periods = ["Q1", "Q2", "Q3", "Q4"];
const periodStats = [
  { points: 20, rebounds: 10, assists: 8 },
  { points: 18, rebounds: 9, assists: 7 },
  { points: 22, rebounds: 11, assists: 9 },
  { points: 21, rebounds: 12, assists: 10 }
];

// ============ GAME LOG ============
const gameLog = [
  { time: "00:05", event: "Player 1 scored 2 points" },
  { time: "00:10", event: "Player 2 got a rebound" },
  { time: "00:15", event: "Player 3 assisted Player 1" },
  { time: "00:18", event: "Player 2 stole the ball" },
  { time: "00:20", event: "Player 3 blocked a shot" }
];

// ============ RENDER FUNCTIONS ============

function renderTeamInfo() {
  document.getElementById("teamBName").textContent = teamBInfo.name;
  document.getElementById("coachBName").textContent = teamBInfo.coach;
  document.getElementById("leagueName").textContent = teamBInfo.league;
  document.getElementById("venueName").textContent = teamBInfo.venue;
  document.getElementById("gameDate").textContent = teamBInfo.date;
  document.getElementById("referees").textContent = teamBInfo.referees;
  document.getElementById("teamBLogoPreview").src = teamBInfo.logo;
}

function renderPlayerTable() {
  const table = document.getElementById('teamBTable');
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
  </tr>`;
  teamBPlayers.forEach(p => {
    html += `<tr>
      <td>${p.portrait ? `<img src="${p.portrait}" style="width:34px;border-radius:50%;">` : ""}</td>
      <td>${p.name}</td>
      <td>${p.points}</td>
      <td>${p.rebounds}</td>
      <td>${p.assists}</td>
      <td>${p.fouls}</td>
      <td>${p.steals}</td>
      <td>${p.blocks}</td>
      <td>${formatTimer(p.timePlayed)}</td>
    </tr>`;
  });
  table.innerHTML = html;
}

function renderTeamSummary() {
  const summary = document.getElementById('teamBSummary');
  const totalPoints = teamBPlayers.reduce((a, b) => a + b.points, 0);
  const totalRebounds = teamBPlayers.reduce((a, b) => a + b.rebounds, 0);
  const totalAssists = teamBPlayers.reduce((a, b) => a + b.assists, 0);
  summary.innerHTML = `Total Points: ${totalPoints} | Total Rebounds: ${totalRebounds} | Total Assists: ${totalAssists}`;
  document.getElementById('totalPointsDisplayB').textContent = `Total Points: ${totalPoints}`;
}

function renderPeriodStats() {
  const table = document.getElementById('teamBPeriods');
  let html = `<tr><th>Period</th><th>Points</th><th>Rebounds</th><th>Assists</th></tr>`;
  periodStats.forEach((p, i) => {
    html += `<tr>
      <td>${periods[i]}</td>
      <td>${p.points}</td>
      <td>${p.rebounds}</td>
      <td>${p.assists}</td>
    </tr>`;
  });
  table.innerHTML = html;
}

function renderGameLog() {
  const list = document.getElementById('gameLogList');
  let html = "<ul>";
  gameLog.forEach(ev => {
    html += `<li><b>${ev.time}</b> - ${ev.event}</li>`;
  });
  html += "</ul>";
  list.innerHTML = html;
}

// Timer Display (static example)
function renderTimer() {
  document.getElementById('timerDisplayB').textContent = "10:00";
}

// ============ EXPORT FUNCTIONS ============

function exportCSVTeamB() {
  let csv = "Name,Points,Rebounds,Assists,Fouls,Steals,Blocks,Time Played\n";
  teamBPlayers.forEach(p => {
    csv += `${p.name},${p.points},${p.rebounds},${p.assists},${p.fouls},${p.steals},${p.blocks},${formatTimer(p.timePlayed)}\n`;
  });
  downloadCSV(csv, "team-b-roster.csv");
}

function exportPeriodCSVTeamB() {
  let csv = "Period,Points,Rebounds,Assists\n";
  periodStats.forEach((p, i) => {
    csv += `${periods[i]},${p.points},${p.rebounds},${p.assists}\n`;
  });
  downloadCSV(csv, "team-b-periods.csv");
}

function exportGameLogCSVTeamB() {
  let csv = "Time,Event\n";
  gameLog.forEach(ev => {
    csv += `${ev.time},${ev.event}\n`;
  });
  downloadCSV(csv, "team-b-gamelog.csv");
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

// ============ ONLOAD ============
window.onload = function() {
  renderTeamInfo();
  renderPlayerTable();
  renderTeamSummary();
  renderPeriodStats();
  renderGameLog();
  renderTimer();
};