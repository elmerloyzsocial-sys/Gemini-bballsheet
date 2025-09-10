import { addNews } from './js/admin/newsAdmin.js';
import { addPlayer } from './js/admin/rosterAdmin.js';
import { addGame } from './js/admin/scheduleAdmin.js';
import { updateStats } from './js/admin/statsAdmin.js';
import { addImage } from './js/admin/galleryAdmin.js';
// import renderer functions as needed

let news = JSON.parse(localStorage.getItem('news')) || [];
let players = JSON.parse(localStorage.getItem('players')) || [];
let games = JSON.parse(localStorage.getItem('games')) || [];
let stats = JSON.parse(localStorage.getItem('stats')) || {};
let gallery = JSON.parse(localStorage.getItem('gallery')) || [];

function handleAddNews() {
    const text = document.getElementById('news-text').value;
    if (addNews(news, text)) {
        // call renderNewsSection(news);
        document.getElementById('news-text').value = '';
    }
}

function handleAddPlayer() {
    const name = document.getElementById('player-name').value;
    const pos = document.getElementById('player-pos').value;
    const bio = document.getElementById('player-bio').value;
    const img = document.getElementById('player-img').value;
    if (addPlayer(players, name, pos, bio, img)) {
        // call renderRosterSection(players);
        document.getElementById('player-name').value = '';
        document.getElementById('player-pos').value = '';
        document.getElementById('player-bio').value = '';
        document.getElementById('player-img').value = '';
    }
}

function handleAddGame() {
    const date = document.getElementById('game-date').value;
    const opp = document.getElementById('game-opp').value;
    const loc = document.getElementById('game-loc').value;
    const res = document.getElementById('game-res').value;
    if (addGame(games, date, opp, loc, res)) {
        // call renderScheduleSection(games);
        document.getElementById('game-date').value = '';
        document.getElementById('game-opp').value = '';
        document.getElementById('game-loc').value = '';
        document.getElementById('game-res').value = '';
    }
}

function handleUpdateStats() {
    const player = document.getElementById('stats-player').value;
    const pts = document.getElementById('stats-pts').value;
    const reb = document.getElementById('stats-reb').value;
    const ast = document.getElementById('stats-ast').value;
    if (updateStats(stats, player, pts, reb, ast)) {
        // call renderStatsSection(stats);
        document.getElementById('stats-player').value = '';
        document.getElementById('stats-pts').value = '';
        document.getElementById('stats-reb').value = '';
        document.getElementById('stats-ast').value = '';
    }
}

function handleAddImage() {
    const img = document.getElementById('gallery-img').value;
    if (addImage(gallery, img)) {
        // call renderGallerySection(gallery);
        document.getElementById('gallery-img').value = '';
    }
}

// Attach these functions to your button onclicks in index.html:
// <button onclick="handleAddNews()">Add</button>
// <button onclick="handleAddPlayer()">Add</button>
// <button onclick="handleAddGame()">Add</button>
// <button onclick="handleUpdateStats()">Update</button>
// <button onclick="handleAddImage()">Add</button>