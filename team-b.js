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
let teamBPlayers = [
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
let periods = ["Q1", "Q2", "Q3", "Q4"];
let periodStatsB = [
  { points: 20, rebounds: 10, assists: 8 },
  { points: 18, rebounds: 9, assists: 7 },
  { points: 22, rebounds: 11, assists: 9 },
  { points: 21, rebounds: 12, assists: 10 }
];

// ============ GAME LOG ============
let gameLogB = [
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
    <th>Remove</th>
  </tr>`;
  teamBPlayers.forEach((p, i) => {
    html += `<tr>
      <td>${p.portrait ? `<img src="${p.portrait}" style="width:34px;border-radius:50%;">` : `<input type="file" accept="image/*" style="width:34px" onchange="uploadPortraitB(${i},this)">`}</td>
      <td><input value="${p.name}" onchange="updatePlayerB(${i},'name',this.value)"/></td>
      <td>
        <span>${p.points}</span>
        <button onclick="addPointsB(${i},1)">+1</button>
        <button onclick="addPointsB(${i},2)">+2</button>
        <button onclick="addPointsB(${i},3)">+3</button>
      </td>
      <td><input type="number" value="${p.rebounds}" onchange="updatePlayerB(${i},'rebounds',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.assists}" onchange="updatePlayerB(${i},'assists',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.fouls}" onchange="updatePlayerB(${i},'fouls',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.steals}" onchange="updatePlayerB(${i},'steals',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.blocks}" onchange="updatePlayerB(${i},'blocks',this.value)" style="width:40px"/></td>
      <td><input type="number" value="${p.timePlayed}" onchange="updatePlayerB(${i},'timePlayed',this.value)" style="width:60px"/></td>
      <td><button onclick="removePlayerB(${i})">-</button></td>
    </tr>`;
  });
  table.innerHTML = html;
  renderTeamSummary();
}

function addPlayerB() {
  teamBPlayers.push({ name: "", points: 0, rebounds: 0, assists: 0, fouls: 0, steals: 0, blocks: 0, portrait: "", timePlayed: 0 });
  renderPlayerTable();
}

function removePlayerB(idx) {
  teamBPlayers.splice(idx, 1);
  renderPlayerTable();
}

function updatePlayerB(idx, field, value) {
  if (['points','rebounds','assists','fouls','steals','blocks','timePlayed'].includes(field)) value = parseInt(value)||0;
  teamBPlayers[idx][field] = value;
  renderPlayerTable();
}

function addPointsB(idx, amount) {
  teamBPlayers[idx].points = (teamBPlayers[idx].points || 0) + amount;
  renderPlayerTable();
}

function uploadPortraitB(idx, input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      teamBPlayers[idx].portrait = e.target.result;
      renderPlayerTable();
    };
    reader.readAsDataURL(file);
  }
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
  periodStatsB.forEach((p, i) => {
    html += `<tr>
      <td>${periods[i]}</td>
      <td><input type="number" value="${p.points}" onchange="updatePeriodStatB(${i},'points',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.rebounds}" onchange="updatePeriodStatB(${i},'rebounds',this.value)" style="width:60px"/></td>
      <td><input type="number" value="${p.assists}" onchange="updatePeriodStatB(${i},'assists',this.value)" style="width:60px"/></td>
    </tr>`;
  });
  table.innerHTML = html;
}

function updatePeriodStatB(idx, field, value) {
  periodStatsB[idx][field] = parseInt(value)||0;
  renderPeriodStats();
}

function renderGameLog() {
  const list = document.getElementById('gameLogList');
  let html = "<ul>";
  gameLogB.forEach(ev => {
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
  periodStatsB.forEach((p, i) => {
    csv += `${periods[i]},${p.points},${p.rebounds},${p.assists}\n`;
  });
  downloadCSV(csv, "team-b-periods.csv");
}

function exportGameLogCSVTeamB() {
  let csv = "Time,Event\n";
  gameLogB.forEach(ev => {
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

function resetScoresheetB() {
  if (confirm("Are you sure you want to reset all Team B data?")) {
    teamBPlayers = [];
    periodStatsB = periods.map(() => ({ points: 0, rebounds: 0, assists: 0 }));
    gameLogB = [];
    renderPlayerTable();
    renderPeriodStats();
    renderGameLog();
    renderTeamSummary();
  }
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