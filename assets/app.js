let current;
let slideIndex = 0;
let colors = ['red', 'green', 'blue'];

const feedURL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fflashgroupnews.com%2Ffeed';
const bitcoinURL = 'https://flashgroupnews.com/wp-json/wp/v2/posts?categories=2&per_page=100';

let bitcoinPosts;
let newsFeed;

setData(bitcoinURL).then((val) => {
    bitcoinPosts = JSON.parse(val);
    nextArticle('bitcoin');
});

setData(feedURL).then((val) => {
    newsFeed = JSON.parse(val).items;
});

let counter = 0;
function nextArticle(topic){
    if(counter >= bitcoinPosts.length){
        counter = 0;
    }

    let titleId = topic+ '-title';
    let descId  = topic+ '-desc';
    // let imgId  = topic+ '-img';

    let titleElem = document.getElementById(titleId);
    let descElem = document.getElementById(descId);

    titleElem.innerHTML = bitcoinPosts[counter].title.rendered;
    descElem.innerHTML = bitcoinPosts[counter].excerpt.rendered;
    console.log(bitcoinPosts);

    counter++;
}

async function setData(url) {
    try{
        let data = await getFeed(url);
        return data;
    }catch(err){
        console.log(err);
    }
}

async function getFeed(url) {
    let connection = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        connection.onreadystatechange = function () {
            if (connection.readyState === 4) {
                if (connection.status >= 300) {
                    reject('error: ' + status.code);
                } else {
                    resolve(connection.responseText);
                }
            }
        }
        connection.open('GET', url, true);
        connection.send();
    });
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