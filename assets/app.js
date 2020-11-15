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

let bitcoinFeed;
let ethereumFeed;
let businessFeed;
let defiFeed;
let newsFeed;
let blockchainFeed;

function generateURL(category) {
    return URL + "categories=" + category;
}

setData(generateURL(BITCOIN)).then((val) => {
    bitcoinFeed = JSON.parse(val);
    nextArticle("bitcoin");
});
setData(generateURL(ETHEREUM)).then((val) => {
    ethereumFeed = JSON.parse(val);
    nextArticle("ethereum");
});
setData(generateURL(BUSINESS)).then((val) => {
    businessFeed = JSON.parse(val);
    nextArticle("hotbusinessnews");
});
setData(generateURL(DEFI)).then((val) => {
    defiFeed = JSON.parse(val);
    nextArticle("defi");
});
setData(generateURL(NEWS)).then((val) => {
    newsFeed = JSON.parse(val);
    nextArticle("news");
});
setData(generateURL(BLOCKCHAIN)).then((val) => {
    blockchainFeed = JSON.parse(val);
    nextArticle("blockchain");
});
let bs = true;
let es = true;

function nextArticle(topic) {
    let feed;
    switch (topic) {
        case "bitcoin":
            feed = bitcoinFeed;
            break;

        case "ethereum":
            feed = ethereumFeed;
            break;

        case "defi":
            feed = defiFeed;
            break;

        case "hotbusinessnews":
            feed = businessFeed;
            break;

        case "news":
            feed = newsFeed;
            break;

        case "blockchain":
            feed = blockchainFeed;
            break;
    }

    let counter = document.getElementById(topic + "-counter").value;
    if (counter >= feed.length) {
        counter = 0;
        for (let index = 0; index < feed.length; index++) {
            let element = feed[index].id;
            currentPosts.delete(element);

        }
    }

    if (feed.length > 1 && currentPosts.has(feed[counter].id)) {
        let id = feed[counter].id;
        counter++;
        document.getElementById(topic + "-counter").value = counter;
        nextArticle(topic);
        currentPosts.delete(id);
        switch (topic) {
            case "bitcoin":
                bitcoinFeed.remove(feed[counter]);
                break;

            case "ethereum":
                ethereumFeed.remove(feed[counter]);
                break;

            case "defi":
                defiFeed.remove(feed[counter]);
                break;

            case "hotbusinessnews":
                businessFeed.remove(feed[counter]);
                break;

            case "news":
                newsFeed.remove(feed[counter]);
                break;

            case "blockchain":
                blockchainFeed.remove(feed[counter]);
                break;
        }
        return;
    } else {
        currentPosts.add(feed[counter].id);
    }



    let titleElem = document.getElementById(topic + "-title");
    let descElem = document.getElementById(topic + "-desc");
    let slider = document.getElementById(topic + "-desc");

    let title;
    let desc;
    let img;
    title = feed[counter].title.rendered;
    desc = feed[counter].excerpt.rendered;
    switch (topic) {
        case "bitcoin":
            document.getElementById(topic + "-counter").value = counter;
            if (bs) {
                let si = counter;
                for (let index = 0; index < 3; index++) {
                    if (feed[si] == undefined) {
                        si = 0
                    }
                    let slide = document.createElement('div');
                    slide.className = "slide";
                    slide.id = si;
                    setData(imgURL + feed[si].featured_media).then((val) => {
                        if (JSON.parse(val).media_type == "image") {
                            let imageSrc = JSON.parse(val).media_details.sizes.large;
                            if (imageSrc === undefined) {
                                imageSrc = JSON.parse(val).media_details.sizes.medium;
                            }
                            if (imageSrc === undefined) {
                                imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                            }
                            slide.style.background = "url('" + imageSrc.source_url + "') no-repeat";
                            slide.style.backgroundSize = 'cover';
                            slide.style.backgroundPosition = 'center';
                        }
                    });
                    document.getElementById('bitcoin-slider').appendChild(slide);
                    si++;
                }
                bs = false;
                let div = document.getElementById("bitcoin-slider")
                div.removeChild(div.childNodes[0]);
            } else {

                let div = document.getElementById("bitcoin-slider")
                div.removeChild(div.childNodes[0]);
                let si = counter;

                let slide = document.createElement('div');
                slide.className = "slide";
                si++;
                if (feed.length > 3) {
                    si++;
                    if (si == 11) {
                        si = 1;
                    }
                }


                if (feed[si] == undefined) {
                    si = 0;
                }

                slide.id = si;
                setData(imgURL + feed[si].featured_media).then((val) => {
                    if (JSON.parse(val).media_type == "image") {
                        let imageSrc = JSON.parse(val).media_details.sizes.large;
                        if (imageSrc === undefined) {
                            imageSrc = JSON.parse(val).media_details.sizes.medium;
                        }
                        if (imageSrc === undefined) {
                            imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                        }
                        slide.style.background = "url('" + imageSrc.source_url + "') no-repeat";
                        slide.style.backgroundSize = 'cover';
                        slide.style.backgroundPosition = 'center';
                    }
                });
                div.appendChild(slide);

            }

            break;
        case "ethereum":
            document.getElementById(topic + "-counter").value = counter;
            if (es) {
                let si = counter;
                let max = 3;
                if (feed.length < 3) {
                    max = feed.length;
                }
                for (let index = 0; index < max; index++) {
                    if (feed[si] == undefined) {
                        si = 0
                    }
                    let slide = document.createElement('div');
                    slide.className = "slide";
                    slide.id = si;
                    setData(imgURL + feed[si].featured_media).then((val) => {
                        if (JSON.parse(val).media_type == "image") {
                            let imageSrc = JSON.parse(val).media_details.sizes.large;
                            if (imageSrc === undefined) {
                                imageSrc = JSON.parse(val).media_details.sizes.medium;
                            }
                            if (imageSrc === undefined) {
                                imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                            }
                            slide.style.background = "url('" + imageSrc.source_url + "') no-repeat";
                            slide.style.backgroundSize = 'cover';
                            slide.style.backgroundPosition = 'center';
                        }
                    });
                    document.getElementById('ethereum-slider').appendChild(slide);
                    si++;
                }
                es = false;
                let div = document.getElementById("ethereum-slider")
                div.removeChild(div.childNodes[0]);
            } else {

                let div = document.getElementById("ethereum-slider")
                div.removeChild(div.childNodes[0]);
                let si = counter;

                let slide = document.createElement('div');
                slide.className = "slide";
                si++;
                if (feed.length > 3) {
                    si++;
                    if (si == 11) {
                        si = 1;
                    }
                }
                if (feed[si] === undefined) {
                    si = 0;
                }

                slide.id = si;
                setData(imgURL + feed[si].featured_media).then((val) => {
                    if (JSON.parse(val).media_type == "image") {
                        let imageSrc = JSON.parse(val).media_details.sizes.large;
                        if (imageSrc === undefined) {
                            imageSrc = JSON.parse(val).media_details.sizes.medium;
                        }
                        if (imageSrc === undefined) {
                            imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                        }
                        slide.style.background = "url('" + imageSrc.source_url + "') no-repeat";
                        slide.style.backgroundSize = 'cover';
                        slide.style.backgroundPosition = 'center';
                    }
                });
                div.appendChild(slide);

            }
            break;
        case "litecoin":
            document.getElementById(topic + "-counter").value = counter;
            break;
        case "defi":

            setData(imgURL + feed[counter].featured_media).then((val) => {
                if (JSON.parse(val).media_type == "image") {
                    let imageSrc = JSON.parse(val).media_details.sizes.large;
                    if (imageSrc === undefined) {
                        imageSrc = JSON.parse(val).media_details.sizes.medium;
                    }
                    if (imageSrc === undefined) {
                        imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                    }
                    document.getElementById(topic + "-img").src = imageSrc.source_url;
                } else {
                    document.getElementById(topic + "-imgdiv").className = 'd-none';
                    document.getElementById(topic + "-contentdiv").className = 'col-sm-12 p-0';
                }


            });
            counter++;
            if (feed[counter] !== undefined) {
                currentPosts.add(feed[counter].id);
                document.getElementById(topic + "-title0").innerHTML =
                    feed[counter].title.rendered;
                document.getElementById(topic + "-desc0").innerHTML =
                    feed[counter].excerpt.rendered;
            } else {
                document.getElementById("defi0").innerHTML = "";
            }
            break;
        case "blockchain":
            setData(imgURL + feed[counter].featured_media).then((val) => {
                if (JSON.parse(val).media_type == "image") {
                    let imageSrc = JSON.parse(val).media_details.sizes.large;
                    if (imageSrc === undefined) {
                        imageSrc = JSON.parse(val).media_details.sizes.medium;
                    }
                    if (imageSrc === undefined) {
                        imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                    }
                    document.getElementById(topic + "-img").src = imageSrc.source_url;
                }
            });

            break;
        case "hotbusinessnews":
            img = feed[counter].featured_media;
            setData(imgURL + img).then((val) => {
                if (JSON.parse(val).media_type == "image") {
                    let imageSrc = JSON.parse(val).media_details.sizes.large;
                    if (imageSrc === undefined) {
                        imageSrc = JSON.parse(val).media_details.sizes.medium;
                    }
                    if (imageSrc === undefined) {
                        imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                    }
                    document.getElementById(topic + "-img").src = imageSrc.source_url;
                } else {
                    document.getElementById(topic + "-imgdiv").className = 'd-none';
                    document.getElementById(topic + "-contentdiv").className = 'col-sm-12 p-0';
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
                        let imageSrc = JSON.parse(val).media_details.sizes.large;
                        if (imageSrc === undefined) {
                            imageSrc = JSON.parse(val).media_details.sizes.medium;
                        }
                        if (imageSrc === undefined) {
                            imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                        }
                        document.getElementById(topic + "-img0").src = imageSrc.source_url;
                    } else {
                        document.getElementById(topic + "0-imgdiv").className = 'd-none';
                        document.getElementById(topic + "0-contentdiv").className = 'col-sm-12 p-0';
                    }
                });
                counter++;
            } else {
                document.getElementById("hotbusinessnews0").innerHTML = "";
            }

            if (feed[counter] !== undefined) {
                currentPosts.add(feed[counter].id);
                document.getElementById(topic + "-title1").innerHTML = feed[counter].title.rendered;
                document.getElementById(topic + "-desc1").innerHTML = feed[counter].excerpt.rendered;
                setData(imgURL + feed[counter].featured_media).then((val) => {
                    if (JSON.parse(val).media_type == "image") {
                        let imageSrc = JSON.parse(val).media_details.sizes.large;
                        if (imageSrc === undefined) {
                            imageSrc = JSON.parse(val).media_details.sizes.medium;
                        }
                        if (imageSrc === undefined) {
                            imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                        }
                        document.getElementById(topic + "-img1").src = imageSrc.source_url;
                    } else {
                        document.getElementById(topic + "1-imgdiv").className = 'd-none';
                        document.getElementById(topic + "1-contentdiv").className = 'col-sm-12 p-0';
                    }
                });
            } else {
                document.getElementById("hotbusinessnews1").innerHTML = "";
            }

            break;
        case "news":

            setData(imgURL + feed[counter].featured_media).then((val) => {
                if (JSON.parse(val).media_type == "image") {
                    let imageSrc = JSON.parse(val).media_details.sizes.large;
                    if (imageSrc === undefined) {
                        imageSrc = JSON.parse(val).media_details.sizes.medium;
                    }
                    if (imageSrc === undefined) {
                        imageSrc = JSON.parse(val).media_details.sizes.thumbnail;
                    }
                    document.getElementById(topic + "-img").src = imageSrc.source_url;
                }
            });

            break;
    }
    titleElem.innerHTML = title;
    descElem.innerHTML = desc;
    counter++;
    document.getElementById(topic + "-counter").value = counter;
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

function slide(topic) {
    let slider = document.getElementById(topic + "slider");
    let slides = slider.querySelectorAll(".slide");
    current = slides[slideIndex];
    let behind = slides[slideIndex + 1];
    let last = slides[slideIndex + 2];

    current.style.animation = "slide .6s ease-in-out forwards";
    behind.style.transform = "translate3d(0, 0, 0)";
    last.style.transform = "translate3d(70px, 0, -15px)";
}
