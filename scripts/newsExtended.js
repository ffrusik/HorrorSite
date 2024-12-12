let news = document.getElementsByClassName('news');
let extendedNews = document.getElementsByClassName('news-extended');

for (let i = 0; i < news.length; i++) {
    news[i].addEventListener('click', () => {
        console.log("Hello");
        extendedNews[i].classList.add('active');
    });
}

document.addEventListener('click', (event) => {
    for (let i = 0; i < news.length; i++) {
        if (
            !extendedNews[i].contains(event.target) &&
            !news[i].contains(event.target)
        ) {
            extendedNews[i].classList.remove('active');
        }
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        for (let i = 0; i < news.length; i++) {
            extendedNews[i].classList.remove('active');
        }
    }
});
