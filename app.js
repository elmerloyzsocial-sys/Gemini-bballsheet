// Data Model
let playersA = [
  { number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0 }
];
let playersB = [
  { number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0 }
];
let numPeriods = 4;
let teamAPeriodStats = [];
let teamBPeriodStats = [];

// Init
function init() {
  document.getElementById('numPeriods').addEventListener('change', e => {
    numPeriods = parseInt(e.target.value);
    setPeriodStats();
    renderPeriodTables();
  });

  setPeriodStats();
  renderPlayerTable('A');
  renderPlayerTable('B');
  renderPeriodTables();
}
function setPeriodStats() {
  teamAPeriodStats = Array(numPeriods).fill().map(() => ({ score: 0, timeouts: 0, teamFouls: 0 }));
  teamBPeriodStats = Array(numPeriods).fill().map(() => ({ score: 0, timeouts: 0, teamFouls: 0 }));
}

function addPlayer(team) {
  const list = team === 'A' ? playersA : playersB;
  list.push({ number: "", name: "", points: 0, rebounds: 0, assists: 0, fouls: 0 });
  renderPlayerTable(team);
}

function removePlayer(team, idx) {
  const list = team === 'A' ? playersA : playersB;
  list.splice(idx, 1);
  renderPlayerTable(team);
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
}

// Expose functions for inline event handlers
window.addPlayer = addPlayer;
window.removePlayer = removePlayer;
window.updatePlayer = updatePlayer;
window.updatePeriodStat = updatePeriodStat;

// Init on load
window.onload = init;