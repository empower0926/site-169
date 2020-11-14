let current;
let slideIndex = 0;
let colors = ["red", "green", "blue"];

const imgURL = "https://flashgroupnews.com/wp-json/wp/v2/media/";
const URL = "https://flashgroupnews.com/wp-json/wp/v2/posts?";

const currentPosts = new Set();

const BITCOIN = 2;
const BLOCKCHAIN = 3;
const BUSINESS = 131;
const DEFI = 30;
const ETHEREUM = 4;
const NEWS = 7;

function generateURL(category) {
    return URL + "categories=" + category;
}

setData(generateURL(BITCOIN)).then((val) => {
    let bitcoinFeed = JSON.parse(val);
    nextArticle("bitcoin", bitcoinFeed);
});
setData(generateURL(ETHEREUM)).then((val) => {
    let ethereumFeed = JSON.parse(val);
    nextArticle("ethereum", ethereumFeed);
});
setData(generateURL(BUSINESS)).then((val) => {
    let businessFeed = JSON.parse(val);
    nextArticle("hotbusinessnews", businessFeed);
});
setData(generateURL(DEFI)).then((val) => {
    let defiFeed = JSON.parse(val);
    nextArticle("defi", defiFeed);
});
setData(generateURL(NEWS)).then((val) => {
    let newsFeed = JSON.parse(val);
    nextArticle("news", newsFeed);
});
setData(generateURL(BLOCKCHAIN)).then((val) => {
    let blockchainFeed = JSON.parse(val);
    nextArticle("blockchain", blockchainFeed);
});

function nextArticle(topic, feed) {
    let counter = document.getElementById(topic + "-counter").value;
    console.log("feed"+feed);
    if (counter >= feed.length) {
          console.log('counter: '+counter);
        counter = 0;
    }

    if (currentPosts.has(feed[counter].id)) {
        counter++;
        document.getElementById(topic + "-counter").value = counter;
        nextArticle(topic, feed);
        return;
    }

    currentPosts.add(feed[counter].id);

    let titleElem = document.getElementById(topic + "-title");
    let descElem = document.getElementById(topic + "-desc");
    let title;
    let desc;
    let img;
    title = feed[counter].title.rendered;
    desc = feed[counter].excerpt.rendered;
    switch (topic) {
        case "bitcoin":
            document.getElementById(topic + "-counter").value = counter;
            break;
        case "ethereum":
            document.getElementById(topic + "-counter").value = counter;
            break;
        case "litecoin":
            document.getElementById(topic + "-counter").value = counter;
            break;
        case "defi":
            setData(imgURL + feed[counter].featured_media).then((val) => {
                if (JSON.parse(val).media_type == "image") {
                    document.getElementById(topic + "-img").src = JSON.parse(
                        val
                    ).media_details.sizes.medium.source_url;
                }
            });
            counter++;
            if (feed[counter] !== undefined) {
                currentPosts.add(feed[counter].id);
                document.getElementById(topic + "-title0").innerHTML =
                    feed[counter].title.rendered;
                document.getElementById(topic + "-desc0").innerHTML =
                    feed[counter].excerpt.rendered;
            }
            break;
        case "blockchain":
            setData(imgURL + feed[counter].featured_media).then((val) => {
                if (JSON.parse(val).media_type == "image") {
                    document.getElementById(topic + "-img").src = JSON.parse(
                        val
                    ).media_details.sizes.medium.source_url;
                }
            });

            break;
        case "hotbusinessnews":
            img = feed[counter].featured_media;
            setData(imgURL + img).then((val) => {
                if (JSON.parse(val).media_type == "image") {
                    document.getElementById(topic + "-img").src = JSON.parse(
                        val
                    ).media_details.sizes.medium.source_url;
                }
            });

            counter++;
            if (feed[counter] !== undefined) {
                currentPosts.add(feed[counter].id);
                document.getElementById(topic + "-title0").innerHTML =
                    feed[counter].title.rendered;
                document.getElementById(topic + "-desc0").innerHTML =
                    feed[counter].excerpt.rendered;
                setData(imgURL + feed[counter].featured_media).then((val) => {
                    if (JSON.parse(val).media_type == "image") {
                        document.getElementById(topic + "-img0").src = JSON.parse(
                            val
                        ).media_details.sizes.medium.source_url;
                    }
                });
                counter++;
            }

            if (feed[counter] !== undefined) {
                currentPosts.add(feed[counter].id);
                document.getElementById(topic + "-title1").innerHTML =
                    feed[counter].title.rendered;
                document.getElementById(topic + "-desc1").innerHTML =
                    feed[counter].excerpt.rendered;
                setData(imgURL + feed[counter].featured_media).then((val) => {
                    if (JSON.parse(val).media_type == "image") {
                        document.getElementById(topic + "-img1").src = JSON.parse(
                            val
                        ).media_details.sizes.medium.source_url;
                    }
                });
            }

            break;
        case "news":
            setData(imgURL + feed[counter].featured_media).then((val) => {
                if (JSON.parse(val).media_type == "image") {
                    document.getElementById(topic + "-img").src = JSON.parse(
                        val
                    ).media_details.sizes.medium.source_url;
                }
            });

            break;
    }
    titleElem.innerHTML = title;
    descElem.innerHTML = desc;
    counter++;
}

async function setData(url) {
    try {
        let data = await getFeed(url);
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function getFeed(url) {
    let connection = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        connection.onreadystatechange = function () {
            if (connection.readyState === 4) {
                if (connection.status >= 300) {
                    reject("error: " + status.code);
                } else {
                    resolve(connection.responseText);
                }
            }
        };
        connection.open("GET", url, true);
        connection.send();
    });
}

function slide() {
    if (connection.readyState !== 4) {
        return;
    }

    let slider = document.querySelector("#slider");
    let slides = slider.querySelectorAll(".slide");
    current = slides[slideIndex];
    let behind = slides[slideIndex + 1];
    let last = slides[slideIndex + 2];

    current.style.animation = "slide .6s ease-in-out forwards";
    behind.style.transform = "translate3d(0, 0, 0)";
    last.style.transform = "translate3d(70px, 0, -15px)";

    let newArticle = document.createElement("div");
    newArticle.className = "slide";
    newArticle.style.transform = "translate3d(140px, 0, -30px)";

    newArticle.style.background =
        "url(" + jsonObject.items[slideIndex].thumbnail + ") no-repeat";
    newArticle.style.backgroundSize = "cover";
    newArticle.style.backgroundPosition = "center";

    slider.appendChild(newArticle);
    slideIndex++;
}