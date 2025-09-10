export function updateStats(stats, player, pts, reb, ast) {
    if (player) {
        stats[player] = { pts, reb, ast };
        localStorage.setItem('stats', JSON.stringify(stats));
        return true;
    }
    return false;
}