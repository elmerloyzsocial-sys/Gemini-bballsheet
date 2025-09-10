export function renderNewsSection(news) {
    let newsFeed = document.getElementById('news-feed');
    newsFeed.innerHTML = '';
    news.forEach(item => {
        let p = document.createElement('p');
        p.textContent = item;
        newsFeed.appendChild(p);
    });
}