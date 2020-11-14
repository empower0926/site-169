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
  nextArticle("bitcoin", bitcoinFeed);
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
  console.log(topic + " feed-" + feed);
  if (counter >= feed.length) {
    counter = 0;
  }

  if (currentPosts.has(feed[counter].id)) {
    let id = feed[counter].id;
    counter++;
    document.getElementById(topic + "-counter").value = counter;
    nextArticle(topic);
    currentPosts.delete(id);
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
          ).media_details.sizes.large.source_url;
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
          document.getElementById(topic + "-img").src = JSON.parse(
            val
          ).media_details.sizes.large.source_url;
        }
      });

      break;
    case "hotbusinessnews":
      img = feed[counter].featured_media;
      setData(imgURL + img).then((val) => {
        if (JSON.parse(val).media_type == "image") {
          document.getElementById(topic + "-img").src = JSON.parse(
            val
          ).media_details.sizes.large.source_url;
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
            ).media_details.sizes.large.source_url;
          }
        });
        counter++;
      } else {
        document.getElementById("hotbusinessnews0").innerHTML = "";
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
            ).media_details.sizes.large.source_url;
          }
        });
      } else {
        document.getElementById("hotbusinessnews1").innerHTML = "";
      }

      break;
    case "news":
      alert(feed[counter].featured_media);
      setData(imgURL + feed[counter].featured_media).then((val) => {
        if (JSON.parse(val).media_type == "image") {
          document.getElementById(topic + "-img").src = JSON.parse(
            val
          ).media_details.sizes.large.source_url;
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