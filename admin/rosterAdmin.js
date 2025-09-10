export function addPlayer(players, name, pos, bio, img) {
    if (name && pos) {
        players.push({ name, pos, bio, img });
        localStorage.setItem('players', JSON.stringify(players));
        return true;
    }
    return false;
}