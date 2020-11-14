let current;
let slideIndex = 0;
let colors = ["red", "green", "blue"];

const images = "https://flashgroupnews.com/wp-json/wp/v2/media/";
const feedURL = "https://flashgroupnews.com/wp-json/wp/v2/posts?per_page=100";


let feed;
let bitcoinFeed;
let ethereumFeed;
let litecoinFeed;
let difiFeed;
let blockchainFeed;
let newsFeed;

setData(feedURL).then((val) => {
  newsFeed = JSON.parse(val);
  let bitcointemp=[];
  let ethereumtemp = [];
  let litecointemp = [];
  let difitemp = [];
  let blockchaintemp = [];

  for (let i = 0; i < newsFeed.length; i++) {
    const item = newsFeed[i];
    const newsFeedCategories = item.categories;
    for (let j = 0; j < newsFeedCategories.length; j++) {
      const category = newsFeedCategories[j];
      if (category == "4") {
        ethereumtemp.push(item);
      }
      if (category == "3") {
        bitcointemp.push(item);
      }
      if (category == "94") {
        litecointemp.push(item);
      }
      if (category == "3") {
        blockchaintemp.push(item);
      }
      if (category == "30") {
        difitemp.push(item);
      }
    }
  }
  bitcoinFeed=bitcointemp;
  ethereumFeed = ethereumtemp;
  litecoinFeed = litecointemp;
  difiFeed = difitemp;
  blockchainFeed = blockchaintemp;
  nextArticle("bitcoin");
  nextArticle("ethereum");
  nextArticle("litecoin");
  nextArticle("difi");
  nextArticle("blockchain");
  nextArticle("hotbusinessnews");
});

setData(feedURL).then((val) => {
  feed = JSON.parse(val).items;
});

function nextArticle(topic) {
  let counter = document.getElementById(topic + "-counter").value;

  let titleElem = document.getElementById(topic + "-title");
  let descElem = document.getElementById(topic + "-desc");

  let title;
  let desc;
  let img;
  switch (topic) {
    case "bitcoin":
      if (counter >= bitcoinFeed.length) {
        counter = 0;
      }
      title = bitcoinFeed[counter].title.rendered;
      desc = bitcoinFeed[counter].excerpt.rendered;
      break;
    case "ethereum":
      if (counter >= ethereumFeed.length) {
        counter = 0;
      }

      title = ethereumFeed[counter].title.rendered;
      desc = ethereumFeed[counter].excerpt.rendered;
      break;
    case "litecoin":
      if (counter >= litecoinFeed.length) {
        counter = 0;
      }

      title = litecoinFeed[counter].title.rendered;
      desc = litecoinFeed[counter].excerpt.rendered;
      break;
    case "difi":
      document.getElementById(topic + "-title0").innerHTML =
        difiFeed[0].title.rendered;
      document.getElementById(topic + "-desc0").innerHTML =
        difiFeed[0].excerpt.rendered;
      title = difiFeed[1].title.rendered;
      desc = difiFeed[1].excerpt.rendered;
      setData(images+difiFeed[1].featured_media).then((val) => {
        if (JSON.parse(val).media_type == "image") {
          document.getElementById(topic + "-img").src = JSON.parse(
            val
          ).media_details.sizes.medium.source_url;
        }
      });

      break;
    case "blockchain":
      title = blockchainFeed[0].title.rendered;
      desc = blockchainFeed[0].excerpt.rendered;
      setData(images+blockchainFeed[0].featured_media).then((val) => {
        if (JSON.parse(val).media_type == "image") {
          document.getElementById(topic + "-img").src = JSON.parse(
            val
          ).media_details.sizes.medium.source_url;
        }
      });

      break;
    case "hotbusinessnews":
      document.getElementById(topic + "-title0").innerHTML =
        newsFeed[0].title.rendered;
      document.getElementById(topic + "-desc0").innerHTML =
        newsFeed[0].excerpt.rendered;
      setData(images+newsFeed[0].featured_media).then((val) => {
        if (JSON.parse(val).media_type == "image") {
          document.getElementById(topic + "-img0").src = JSON.parse(
            val
          ).media_details.sizes.medium.source_url;
        }
      });
      document.getElementById(topic + "-title1").innerHTML =
        newsFeed[1].title.rendered;
      document.getElementById(topic + "-desc1").innerHTML =
        newsFeed[1].excerpt.rendered;
      setData(images+newsFeed[1].featured_media).then((val) => {
        if (JSON.parse(val).media_type == "image") {
          document.getElementById(topic + "-img1").src = JSON.parse(
            val
          ).media_details.sizes.medium.source_url;
        }
      });
      title = newsFeed[2].title.rendered;
      desc = newsFeed[2].excerpt.rendered;
      img = newsFeed[2].featured_media;
      setData(images+img).then((val) => {
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
