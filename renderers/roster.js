export function renderRosterSection(players) {
    let rosterList = document.getElementById('roster-list');
    rosterList.innerHTML = '';
    players.forEach(player => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${player.name}</h3>
                          <p>${player.pos}</p>
                          <img src="${player.img}" alt="${player.name}" style="width:100%;">
                          <p>${player.bio}</p>
                          <button onclick="shareLink('/player/${player.name.replace(/\s/g, '-')}')">Share Profile</button>`;
        rosterList.appendChild(card);
    });
}