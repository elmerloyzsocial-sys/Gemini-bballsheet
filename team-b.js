// ============ TEAM INFO & META ============
let teamBInfo = {
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
  {
    name: "Kevin Tran",
    points: 21,
    rebounds: 7,
    assists: 6,
    fouls: 3,
    steals: 2,
    blocks: 1,
    portrait: "",
    timePlayed: 31
  },
  {
    name: "Isaac Kim",
    points: 13,
    rebounds: 5,
    assists: 4,
    fouls: 2,
    steals: 0,
    blocks: 2,
    portrait: "",
    timePlayed: 28
  },
  {
    name: "Noah Davis",
    points: 18,
    rebounds: 6,
    assists: 3,
    fouls: 2,
    steals: 1,
    blocks: 0,
    portrait: "",
    timePlayed: 25
  },
  {
    name: "Ryan Young",
    points: 10,
    rebounds: 4,
    assists: 2,
    fouls: 1,
    steals: 1,
    blocks: 1,
    portrait: "",
    timePlayed: 17
  },
  {
    name: "Alex Wu",
    points: 7,
    rebounds: 3,
    assists: 5,
    fouls: 0,
    steals: 2,
    blocks: 0,
    portrait: "",
    timePlayed: 14
  }
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
  { time: "00:05", event: "Kevin Tran scored 2 points" },
  { time: "00:10", event: "Isaac Kim got a rebound" },
  { time: "00:15", event: "Noah Davis assisted Kevin Tran" },
  { time: "00:18", event: "Ryan Young stole the ball" },
  { time: "00:20", event: "Alex Wu blocked a shot" }
];

// ============ RENDER FUNCTIONS ============

function renderTeamInfo() {
  document.getElementById("teamBName").value = teamBInfo.name;
  document.getElementById("coachBName").value = teamBInfo.coach;
  document.getElementById("leagueNameB").value = teamBInfo.league;
  document.getElementById("venueNameB").value = teamBInfo.venue;
  document.getElementById("gameDateB").value = teamBInfo.date;
  document.getElementById("refereesB").value = teamBInfo.referees;
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

// ============ EVENT HANDLERS FOR EDITABLE FIELDS ============

document.addEventListener('DOMContentLoaded', () => {
  renderTeamInfo();
  renderPlayerTable();
  renderTeamSummary();
  renderPeriodStats();
  renderGameLog();
  renderTimer();

  document.getElementById("teamBName").onchange = e => { teamBInfo.name = e.target.value; };
  document.getElementById("coachBName").onchange = e => { teamBInfo.coach = e.target.value; };
  document.getElementById("leagueNameB").onchange = e => { teamBInfo.league = e.target.value; };
  document.getElementById("venueNameB").onchange = e => { teamBInfo.venue = e.target.value; };
  document.getElementById("gameDateB").onchange = e => { teamBInfo.date = e.target.value; };
  document.getElementById("refereesB").onchange = e => { teamBInfo.referees = e.target.value; };
  document.getElementById("teamBLogo").onchange = function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        teamBInfo.logo = e.target.result;
        document.getElementById("teamBLogoPreview").src = e.target.result;
        document.getElementById("teamBLogoPreview").style.display = "inline";
      };
      reader.readAsDataURL(file);
    }
  };
});