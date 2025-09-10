export function renderStatsSection(stats) {
    let statsBody = document.getElementById('stats-table').querySelector('tbody');
    statsBody.innerHTML = '';
    for (let player in stats) {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${player}</td><td>${stats[player].pts}</td><td>${stats[player].reb}</td><td>${stats[player].ast}</td>`;
        statsBody.appendChild(row);
    }
}