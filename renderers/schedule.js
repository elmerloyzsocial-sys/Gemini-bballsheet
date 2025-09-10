export function renderScheduleSection(games) {
    let scheduleBody = document.getElementById('schedule-table').querySelector('tbody');
    scheduleBody.innerHTML = '';
    games.forEach(game => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${game.date}</td><td>${game.opp}</td><td>${game.loc}</td><td>${game.res}</td>`;
        scheduleBody.appendChild(row);
    });
}