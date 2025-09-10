export function addNews(news, text) {
    if (text) {
        news.push(text);
        localStorage.setItem('news', JSON.stringify(news));
        return true;
    }
    return false;
}