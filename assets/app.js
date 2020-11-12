let current;
let slideIndex = 0;
let colors = ['red', 'green', 'blue'];

const feedURL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fflashgroupnews.com%2Ffeed';
const connection = new XMLHttpRequest();
let jsonObject;

connection.open('GET', feedURL, true);
connection.send();

connection.onreadystatechange = (e) => {
    if (connection.readyState === 4) {
        jsonObject = JSON.parse(connection.responseText);
        console.log(jsonObject.items);
    }
}

function slide() {

    if (connection.readyState !== 4) {
        return;
    }

    let slider = document.querySelector('#slider');
    let slides = slider.querySelectorAll('.slide');
    current = slides[slideIndex];
    let behind = slides[slideIndex + 1];
    let last = slides[slideIndex + 2];

    current.style.animation = 'slide .6s ease-in-out forwards';
    behind.style.transform = 'translate3d(0, 0, 0)';
    last.style.transform = 'translate3d(70px, 0, -15px)';

    let newArticle = document.createElement('div');
    newArticle.className = 'slide';
    newArticle.style.transform = 'translate3d(140px, 0, -30px)';

    newArticle.style.background = 'url(' + jsonObject.items[slideIndex].thumbnail + ') no-repeat';
    newArticle.style.backgroundSize = 'cover';
    newArticle.style.backgroundPosition = 'center';

    slider.appendChild(newArticle);
    slideIndex++;
}