export function addGame(games, date, opp, loc, res) {
    if (date && opp) {
        games.push({ date, opp, loc, res });
        localStorage.setItem('games', JSON.stringify(games));
        return true;
    }
    return false;
}