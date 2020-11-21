let current;
let slideIndex = 0;
let colors = ["red", "green", "blue"];

const GREEN = " #00a80e";
const PINK = "#db1753";

const imgURL = "https://flashgroupnews.com/wp-json/wp/v2/media/";
const URL = "/getposts?";
// const URL = "https://flashgroupnews.com/wp-json/wp/v2/posts?";
const coinsURL = "https://ticker-api.cointelegraph.com/rates/?full=true";

const currentPosts = new Set();

const BITCOIN = "bitcoin_news";
const BLOCKCHAIN = "blockchain_news";
const BUSINESS = "business_news";
const DEFI = "defi_news";
const ETHEREUM = "ethereum_news";
const NEWS = "news_news";
const LITECOIN = "litecoin_news";

let bitcoinFeed;
let litecoinFeed;
let ethereumFeed;
let businessFeed;
let defiFeed;
let newsFeed;
let blockchainFeed;
let coinsFeed;
let coinfeedNames = [
  "SHA256",
  "EtHash",
  "RPCA",
  "DBFT",
  "DPoS",
  "Scrypt",
  "Other",
  "PoS",
];
let SHA256Feed = [];
let EtHashFeed = [];
let RPCAFeed = [];
let DBFTFeed = [];
let DPoSFeed = [];
let ScryptFeed = [];
let OtherFeed = [];
let PoSFeed = [];
let currentHMcointype;
let isShowinAll = false;

const date = new Date().toString().split(" ", 4);
console.log(date);

let year = date[3];
let month = date[1];
let day = date[2];

document.querySelector("#date").innerHTML = year + " " + month + " " + day;

function generateURL(category) {
  console.log("generating URL: " + URL + "category=" + category);
  return URL + "category=" + category;
}

setData(coinsURL).then((val) => {
  coinsFeed = val;
  devidingfeed();
  currentHMcointype = "SHA256";
  nextHeatMap("SHA256");
  coinbtncoloring();

  document.getElementById("SHA256btn").style.display = "none";
  setInterval(function () {
    if (!isShowinAll) {
      nextHeatMap(currentHMcointype);
      coinbtncoloring();
    }
  }, 5000);
});

function devidingfeed() {
  SHA256Feed = [];
  EtHashFeed = [];
  RPCAFeed = [];
  DBFTFeed = [];
  DPoSFeed = [];
  ScryptFeed = [];
  OtherFeed = [];
  PoSFeed = [];
  SHA256Feed.push(coinsFeed["data"].BTC.USD);
  SHA256Feed.push(coinsFeed["data"].BCH.USD);
  SHA256Feed.push(coinsFeed["data"].BSV.USD);

  EtHashFeed.push(coinsFeed["data"].ETH.USD);
  EtHashFeed.push(coinsFeed["data"].ETC.USD);
  // EtHashFeed.push(coinsFeed['data'].WAN.USD);

  RPCAFeed.push(coinsFeed["data"].XRP.USD);

  DBFTFeed.push(coinsFeed["data"].BNB.USD);
  DBFTFeed.push(coinsFeed["data"].NEO.USD);
  DBFTFeed.push(coinsFeed["data"].ATOM.USD);

  DPoSFeed.push(coinsFeed["data"].EOS.USD);

  ScryptFeed.push(coinsFeed["data"].LTC.USD);
  ScryptFeed.push(coinsFeed["data"].DOGE.USD);

  OtherFeed.push(coinsFeed["data"].XEM.USD);
  OtherFeed.push(coinsFeed["data"].ONT.USD);

  PoSFeed.push(coinsFeed["data"].XTZ.USD);
  coinsFeed = [];
  coinsFeed.push(
    SHA256Feed,
    EtHashFeed,
    RPCAFeed,
    DBFTFeed,
    DPoSFeed,
    ScryptFeed,
    OtherFeed,
    PoSFeed
  );
}

function coinbtncoloring() {
  let count = 0;
  coinsFeed.forEach((feed) => {
    let ct = coinfeedNames[count];
    let btn = document.getElementById(ct + "btn");

    if (feed[0].day == 0) {
      btn.style.backgroundColor = "#fff";
      btn.style.color = "#000";
      btn.className = "ct";
    } else if (feed[0].day > 0) {
      btn.className = "green ct";
    } else {
      btn.className = "pink ct";
    }
    if (ct != currentHMcointype) {
      btn.className = btn.className + " d-flex";
    }

    count++;
  });
}

function setNewData() {
  setData(coinsURL).then((val) => {
    coinsFeed = val;
    devidingfeed();
    coinbtncoloring();
  });
}

function nextHeatMap(cointype) {

  if (isShowinAll) {
    document.getElementById('showall').className = "green-text";
    document.getElementById('prev').className = "d-none green-text ";
    document.getElementById('next').className = "d-none green-text ";
  }
  isShowinAll = false;
  setNewData();
  let feed;
  let coinName = [];
  if (currentHMcointype != cointype) {
    let removebtn = document.getElementById(cointype + "btn");
    removebtn.style.display = "none";
    removebtn.className = removebtn.className.split("d-flex");

    let newbtn = document.getElementById(currentHMcointype + "btn");
    newbtn.style.display = "block";
    newbtn.className = newbtn.className + " d-flex";
    currentHMcointype = cointype;
  }
  switch (cointype) {
    case "SHA256":
      feed = SHA256Feed;
      coinName.push("BTC", "BCH", "BSV");
      break;
    case "EtHash":
      feed = EtHashFeed;
      coinName.push("ETH", "ETC");
      break;
    case "RPCA":
      feed = RPCAFeed;
      coinName.push("XPR");
      break;
    case "DBFT":
      feed = DBFTFeed;
      coinName.push("BNB", "NEO", "ATOM");
      break;
    case "DPoS":
      feed = DPoSFeed;

      coinName.push("EOS");
      break;
    case "Scrypt":
      feed = ScryptFeed;
      coinName.push("LTC", "DOGE");
      break;
    case "Other":
      feed = OtherFeed;
      coinName.push("XEM", "ONT");
      break;
    case "PoS":
      feed = PoSFeed;
      coinName.push("XTZ");
      break;
  }

  document.getElementById("heatmapContent").innerHTML = "";
  let bigd = document.createElement("div");
  bigd.className = "row big_d";
  let smalldivs = document.createElement("div");
  for (let index = 0; index < feed.length; index++) {
    const item = feed[index];
    let price = new String(item.price);
    let formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    price = formatter.format(price);
    let rate = item.day;
    if (index == 0) {
      let btd = document.createElement("div");
      btd.className = "col-sm-12 pl-0";
      let btdd = document.createElement("div");
      btdd.className = "col-sm-2 p-0";
      let bttdd = document.createElement("div");
      bttdd.className = "sha p-3";
      let topich4 = document.createElement("h4");
      topich4.className = "text-center m-auto";
      topich4.innerText = cointype;

      let bcd = document.createElement("div");
      bcd.className = "col-sm-12 text-center my-5";
      let coinname = document.createElement("h1");
      coinname.className = "btc";
      coinname.innerText = coinName[index];
      let ratep = document.createElement("p");
      ratep.innerText = "$" + price;
      let presentage = document.createElement("p");

      let dominance = document.createElement("h4");
      dominance.className = "mt-5";
      dominance.innerText = rate + "%";

      let bbd = document.createElement("div");
      bbd.className = "col-sm-12 p-0";
      let bottom = document.createElement("div");
      if (rate == 0) {
        bottom.style.backgroundColor = "#fff";
        bottom.className = "bottom-line";
        presentage.style.color = "#fff";
        presentage.innerText = rate + "%";
      } else if (rate > 0) {
        bottom.className = "bottom-line line-green";
        presentage.className = "green-text";
        presentage.innerText = "+" + rate + "%";
      } else {
        bottom.className = "bottom-line line-pink";
        presentage.className = "pink-text";
        presentage.innerText = rate + "%";
      }
      bigd.appendChild(btd);
      btd.appendChild(btdd);
      btdd.appendChild(bttdd);
      bttdd.appendChild(topich4);
      bigd.appendChild(bcd);
      bcd.appendChild(coinname);
      bcd.appendChild(ratep);
      bcd.appendChild(presentage);
      bcd.appendChild(dominance);
      bigd.appendChild(bbd);
      bbd.appendChild(bottom);
    } else {
      let sd = document.createElement("div");
      sd.className = "row small-d  mt-4";

      let srd = document.createElement("div");
      srd.className = "col-sm-12 d-flex pt-3";

      let scnd = document.createElement("div");
      scnd.className = "col-sm-7";
      let coinnameh4 = document.createElement("h4");
      coinnameh4.className = "ftext";
      coinnameh4.innerText = coinName[index];

      let srrd = document.createElement("div");
      srrd.className = "col-sm-3";
      let ratep = document.createElement("p");
      ratep.innerText = "$" + price;

      let sprd = document.createElement("div");
      sprd.className = "col-sm-2";
      let prp = document.createElement("p");

      let bld = document.createElement("div");
      bld.className = "col-sm-12 p-0";
      let bl = document.createElement("div");
      bl.className = "bottom-line";

      if (rate == 0) {
        bl.style.backgroundColor = "#fff";
        prp.style.color = "#fff";
        prp.innerText = rate + "%";
        bl.className = "bottom-line ";
      } else if (rate > 0) {
        prp.className = "green-text";
        bl.className = "bottom-line line-green";
        prp.innerText = "+" + rate + "%";
      } else {
        prp.className = "pink-text";
        bl.className = "bottom-line line-pink";
        prp.innerText = rate + "%";
      }
      smalldivs.appendChild(sd);

      sd.appendChild(srd);
      srd.appendChild(scnd);
      srd.appendChild(srrd);
      srd.appendChild(sprd);
      scnd.appendChild(coinnameh4);
      srrd.appendChild(ratep);
      sprd.appendChild(prp);
      sd.appendChild(bld);
      bld.appendChild(bl);
    }
  }
  document.getElementById("heatmapContent").appendChild(bigd);
  document.getElementById("heatmapContent").appendChild(smalldivs);

}

function allHeatMap(start, end) {
  isShowinAll = true;
  let coinName = [];
  let topic;
  document.getElementById("heatmapContent").innerHTML = "";
  for (let j = start; j < end; j++) {
    let bigd = document.createElement("div");
    bigd.className = "row big_d mt-5";
    let smalldivs = document.createElement("div");
    const feed = coinsFeed[j];
    switch (j) {
      case 0:
        topic = "SHA256";
        coinName.push("BTC", "BCH", "BSV");
        break;
      case 1:
        topic = "EtHash";
        coinName.push("ETH", "ETC");
        break;
      case 2:
        topic = "RPCA";
        coinName.push("XPR");
        break;
      case 3:
        topic = "DBFT";
        coinName.push("BNB", "NEO", "ATOM");
        break;
      case 4:
        topic = "DPoS";
        coinName.push("EOS");
        break;
      case 5:
        topic = "Scrypt";
        coinName.push("LTC", "DOGE");
        break;
      case 6:
        topic = "Other";
        coinName.push("XEM", "ONT");
        break;
      case 7:
        topic = "PoS";
        coinName.push("XTZ");
        break;
    }
    for (let index = 0; index < feed.length; index++) {
      const item = feed[index];
      let price = new String(item.price);
      let formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      price = formatter.format(price);
      let rate = item.day;
      if (index == 0) {
        let btd = document.createElement("div");
        btd.className = "col-sm-12 pl-0";
        let btdd = document.createElement("div");
        btdd.className = "col-sm-2 p-0";
        let bttdd = document.createElement("div");
        bttdd.className = "sha p-3";
        let topich4 = document.createElement("h4");
        topich4.className = "text-center m-auto";
        topich4.innerText = topic;

        let bcd = document.createElement("div");
        bcd.className = "col-sm-12 text-center my-5";
        let coinname = document.createElement("h1");
        coinname.className = "btc";
        coinname.innerText = coinName[index];
        let ratep = document.createElement("p");
        ratep.innerText = "$" + price;
        let presentage = document.createElement("p");

        let dominance = document.createElement("h4");
        dominance.className = "mt-5";
        dominance.innerText = rate + "%";

        let bbd = document.createElement("div");
        bbd.className = "col-sm-12 p-0";
        let bottom = document.createElement("div");
        if (rate == 0) {
          bottom.style.backgroundColor = "#fff";
          presentage.style.color = "#fff";
          presentage.innerText = rate + "%";
          bottom.className = "bottom-line";
        } else if (rate > 0) {
          bottom.className = "bottom-line line-green";
          presentage.className = "green-text";
          presentage.innerText = "+" + rate + "%";
        } else {
          bottom.className = "bottom-line line-pink";
          presentage.className = "pink-text";
          presentage.innerText = rate + "%";
        }
        bigd.appendChild(btd);
        btd.appendChild(btdd);
        btdd.appendChild(bttdd);
        bttdd.appendChild(topich4);
        bigd.appendChild(bcd);
        bcd.appendChild(coinname);
        bcd.appendChild(ratep);
        bcd.appendChild(presentage);
        bcd.appendChild(dominance);
        bigd.appendChild(bbd);
        bbd.appendChild(bottom);
      } else {
        let sd = document.createElement("div");
        sd.className = "row small-d  mt-4";

        let srd = document.createElement("div");
        srd.className = "col-sm-12 d-flex pt-3";

        let scnd = document.createElement("div");
        scnd.className = "col-sm-7";
        let coinnameh4 = document.createElement("h4");
        coinnameh4.className = "ftext";
        coinnameh4.innerText = coinName[index];

        let srrd = document.createElement("div");
        srrd.className = "col-sm-3";
        let ratep = document.createElement("p");
        ratep.innerText = "$" + price;

        let sprd = document.createElement("div");
        sprd.className = "col-sm-2";
        let prp = document.createElement("p");

        let bld = document.createElement("div");
        bld.className = "col-sm-12 p-0";
        let bl = document.createElement("div");
        bl.className = "bottom-line";

        if (rate == 0) {
          bl.style.backgroundColor = "#fff";
          prp.style.color = "#fff";
          prp.innerText = rate + "%";
          bl.className = "bottom-line ";
        } else if (rate > 0) {
          prp.className = "green-text";
          bl.className = "bottom-line line-green";
          prp.innerText = "+" + rate + "%";
        } else {
          prp.className = "pink-text";
          bl.className = "bottom-line line-pink";
          prp.innerText = rate + "%";
        }
        smalldivs.appendChild(sd);

        sd.appendChild(srd);
        srd.appendChild(scnd);
        srd.appendChild(srrd);
        srd.appendChild(sprd);
        scnd.appendChild(coinnameh4);
        srrd.appendChild(ratep);
        sprd.appendChild(prp);
        sd.appendChild(bld);
        bld.appendChild(bl);
      }
    }
    coinName = [];
    document.getElementById("heatmapContent").appendChild(bigd);
    document.getElementById("heatmapContent").appendChild(smalldivs);
  }
  if (start == 0) {
    document.getElementById("showall").className = "d-none green-text ";
    document.getElementById("prev").className = "d-none green-text ";
    document.getElementById("next").className = " green-text ";
  } else if (start == 4) {
    document.getElementById("showall").className = "d-none green-text ";
    document.getElementById("next").className = "d-none green-text ";
    document.getElementById("prev").className = "green-text ";
  }
  smoothscroll('#sec-2');
}

setData(generateURL(BITCOIN)).then((val) => {
  bitcoinFeed = val;
  nextArticle("bitcoin");
});
setData(generateURL(LITECOIN)).then((val) => {
  litecoinFeed = val;
  nextArticle("litecoin");
});
setData(generateURL(ETHEREUM)).then((val) => {
  ethereumFeed = val;
  nextArticle("ethereum");
});
setData(generateURL(BUSINESS)).then((val) => {
  businessFeed = val;
  nextArticle("hotbusinessnews");
});
setData(generateURL(DEFI)).then((val) => {
  defiFeed = val;
  nextArticle("defi");
});
setData(generateURL(NEWS)).then((val) => {
  newsFeed = val;
  nextArticle("news");
});
setData(generateURL(BLOCKCHAIN)).then((val) => {
  blockchainFeed = val;
  nextArticle("blockchain");
});

const COIN_RATES_URL = "https://ticker-api.cointelegraph.com/rates/?full=true";

let MARKET;
let selectedBTC = "USD";
let selectedETH = "USD";
let selectedLTC = "USD";

let currencySymbolBTC = "$";
let currencySymbolETH = "$";
let currencySymbolLTC = "$";

setData(COIN_RATES_URL).then((val) => {
  MARKET = val;
  setMarketData("BTC", selectedBTC, currencySymbolBTC);
  setMarketData("ETH", selectedETH, currencySymbolETH);
  setMarketData("LTC", selectedLTC, currencySymbolLTC);
});

setInterval(() => {
  setData(COIN_RATES_URL).then((val) => {
    MARKET = val;
    setMarketData("BTC", selectedBTC, currencySymbolBTC);
    setMarketData("ETH", selectedETH, currencySymbolETH);
    setMarketData("LTC", selectedLTC, currencySymbolLTC);
  });
}, 5000);

function setMarketData(crypto, currency, cs) {
  if (crypto === "BTC") {
    document.getElementById(crypto + selectedBTC).className = "currency-btn ";
    selectedBTC = currency;
    currencySymbolBTC = cs;
  } else if (crypto === "ETH") {
    document.getElementById(crypto + selectedETH).className = "currency-btn ";
    selectedETH = currency;
    currencySymbolETH = cs;
  } else {
    document.getElementById(crypto + selectedLTC).className = "currency-btn ";
    selectedLTC = currency;
    currencySymbolLTC = cs;
  }
  document.getElementById(crypto + currency).className =
    "currency-btn selected-btn";
  if (MARKET !== undefined) {
    let values = MARKET.data[crypto][currency];
    let parent = document.getElementById(crypto + "-market-overview");
    if (parent !== null) {
      let price = parent.querySelector(".price");

      let formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      price.innerHTML = cs + formatter.format(values.price);

      let day = parent.querySelector(".day");
      if (values.day > 0) {
        day.innerHTML = "+" + values.day + "%";
        day.style.color = GREEN;
      } else if (values.day < 0) {
        day.innerHTML = values.day + "%";
        day.style.color = PINK;
      } else {
        day.innerHTML = values.day;
        day.style.color = "#000";
      }

      let week = parent.querySelector(".week");
      if (values.week > 0) {
        week.innerHTML = "+" + values.week + "%";
        week.style.color = GREEN;
      } else {
        week.innerHTML = values.week + "%";
        week.style.color = PINK;
      }

      let month = parent.querySelector(".month");
      if (values.month > 0) {
        month.innerHTML = "+" + values.month + "%";
        month.style.color = GREEN;
      } else {
        month.innerHTML = values.month + "%";
        month.style.color = PINK;
      }

      let open = parent.querySelector(".open");
      open.innerHTML = cs + formatter.format(values.open);

      let high = parent.querySelector(".high");
      high.innerHTML = cs + formatter.format(values.high);

      let low = parent.querySelector(".low");
      low.innerHTML = cs + formatter.format(values.low);

      let last_price = parent.querySelector(".last-price");
      last_price.innerHTML = cs + formatter.format(values.price);

      let total = parent.querySelector(".total");
      let moneyFormat_total = getMoneyFormat(values.emitted);
      total.innerHTML =
        crypto +
        " " +
        parseFloat(moneyFormat_total).toFixed(2) +
        moneyFormat_total.replace(/N?[^T|B|M|K]/g, "");

      let mkt_cap = parent.querySelector(".mkt-cap");
      let moneyFormat_mkt_cap = getMoneyFormat(values.cap);
      mkt_cap.innerHTML =
        cs +
        parseFloat(moneyFormat_mkt_cap).toFixed(2) +
        moneyFormat_mkt_cap.replace(/N?[^T|B|M|K]/g, "");

      let vol = parent.querySelector(".vol");
      let moneyFormat_vol = getMoneyFormat(values.volume);
      vol.innerHTML =
        crypto +
        " " +
        parseFloat(moneyFormat_vol).toFixed(2) +
        moneyFormat_vol.replace(/N?[^T|B|M|K]/g, "");

      let vol_dot = parent.querySelector(".vol-dot");
      let moneyFormat_vol_dot = getMoneyFormat(values.volumeCurrency);
      vol_dot.innerHTML =
        cs +
        parseFloat(moneyFormat_vol_dot).toFixed(2) +
        moneyFormat_vol_dot.replace(/N?[^T|B|M|K]/g, "");
    }
  }
}

function getMoneyFormat(priceValue) {
  const TRILLION = 1.0e12;
  const BILLION = 1.0e9;
  const MILLION = 1.0e6;
  const KILO = 1.0e3;
  return priceValue >= TRILLION ?
    priceValue / TRILLION + "T" :
    priceValue >= BILLION ?
    priceValue / BILLION + "B" :
    priceValue >= MILLION ?
    priceValue / MILLION + "M" :
    priceValue >= KILO ?
    priceValue / KILO + "K" :
    priceValue + "N";
}

let bs = true;
let es = true;
let ls = true;

function nextArticle(topic) {
  let feed;
  switch (topic) {
    case "bitcoin":
      feed = bitcoinFeed;
      break;
    case "litecoin":
      feed = litecoinFeed;
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

  if (feed.length == 0) {
    return;
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
        bitcoinFeed.splice(feed[counter], bitcoinFeed.indexOf(feed[counter]));

        break;
      case "litecoin":
        litecoinFeed.splice(feed[counter], litecoinFeed.indexOf(feed[counter]));

        break;

      case "ethereum":
        ethereumFeed.splice(feed[counter], ethereumFeed.indexOf(feed[counter]));

        break;

      case "defi":
        defiFeed.splice(feed[counter], defiFeed.indexOf(feed[counter]));

        break;

      case "hotbusinessnews":
        businessFeed.splice(feed[counter], businessFeed.indexOf(feed[counter]));

        break;

      case "news":
        newsFeed.splice(feed[counter], newsFeed.indexOf(feed[counter]));

        break;

      case "blockchain":
        blockchainFeed.splice(
          feed[counter],
          blockchainFeed.indexOf(feed[counter])
        );

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

  let post = JSON.parse(feed[counter].post);
  title = post.title.rendered;
  desc =
    new String(post.excerpt.rendered).split("[&hellip;]") +
    "<a href='" +
    post.link +
    "'  target=',blank'><p>Read more</p></a>";
  switch (topic) {
    case "bitcoin":
      document.getElementById(topic + "-counter").value = counter;
      if (bs) {
        let si = counter;
        for (let index = 0; index < 3; index++) {
          if (feed[si] == undefined) {
            si = 0;
          }
          let slide = document.createElement("div");
          slide.className = "slide";
          slide.id = si;
          slide.style.backgroundImage = "url('" + feed[si].limg + "')";
          document.getElementById("bitcoin-slider").appendChild(slide);
          si++;
        }
        bs = false;
        let div = document.getElementById("bitcoin-slider");
        div.removeChild(div.childNodes[0]);
      } else {
        let div = document.getElementById("bitcoin-slider");
        div.removeChild(div.childNodes[0]);
        let si = counter;

        let slide = document.createElement("div");
        slide.className = "slide";
        si++;

        if (feed.length > 3) {
          si++;

          let feedplus = feed.length;
          feedplus++;
          if (si == feedplus) {
            si = 1;
          }
        }

        if (feed[si] == undefined) {
          si = 0;
        }

        slide.id = si;
        slide.style.backgroundImage = "url('" + feed[si].limg + "')";
        div.appendChild(slide);
      }
      break;
    case "ethereum":
      document.getElementById(topic + "-counter").value = counter;
      if (es) {
        let si = counter;
        for (let index = 0; index < 3; index++) {
          if (feed[si] == undefined) {
            si = 0;
          }
          let slide = document.createElement("div");
          slide.className = "slide";
          slide.id = si;
          slide.style.backgroundImage = "url('" + feed[si].limg + "')";
          document.getElementById("ethereum-slider").appendChild(slide);
          si++;
<<<<<<< HEAD
        }
        es = false;
        let div = document.getElementById("ethereum-slider");
        div.removeChild(div.childNodes[0]);
      } else {
        let div = document.getElementById("ethereum-slider");
        div.removeChild(div.childNodes[0]);
        let si = counter;

        let slide = document.createElement("div");
        slide.className = "slide";
        si++;

        if (feed.length > 3) {
          si++;

          let feedplus = feed.length;
          feedplus++;
          if (si == feedplus) {
            si = 1;
          }
        }

        if (feed[si] == undefined) {
          si = 0;
        }
=======
        }
        es = false;
        let div = document.getElementById("ethereum-slider");
        div.removeChild(div.childNodes[0]);
      } else {
        let div = document.getElementById("ethereum-slider");
        div.removeChild(div.childNodes[0]);
        let si = counter;

        let slide = document.createElement("div");
        slide.className = "slide";
        si++;

        if (feed.length > 3) {
          si++;

          let feedplus = feed.length;
          feedplus++;
          if (si == feedplus) {
            si = 1;
          }
        }

        if (feed[si] == undefined) {
          si = 0;
        }
>>>>>>> 24ddb48dc36c13057b71d125a2191faf03269c46

        slide.id = si;
        slide.style.backgroundImage = "url('" + feed[si].limg + "')";
        div.appendChild(slide);
      }
      break;

    case "litecoin":
      document.getElementById(topic + "-counter").value = counter;
      if (ls) {
        let si = counter;
        for (let index = 0; index < 3; index++) {
          if (feed[si] == undefined) {
            si = 0;
          }
          let slide = document.createElement("div");
          slide.className = "slide";
          slide.id = si;
          slide.style.backgroundImage = "url('" + feed[si].limg + "')";
          document.getElementById("litecoin-slider").appendChild(slide);
          si++;
        }
        ls = false;
        let div = document.getElementById("litecoin-slider");
        div.removeChild(div.childNodes[0]);
      } else {
        let div = document.getElementById("litecoin-slider");
        div.removeChild(div.childNodes[0]);
        let si = counter;

        let slide = document.createElement("div");
        slide.className = "slide";
        si++;

        if (feed.length > 3) {
          si++;

          let feedplus = feed.length;
          feedplus++;
          if (si == feedplus) {
            si = 1;
          }
        }

        if (feed[si] == undefined) {
          si = 0;
        }

        slide.id = si;
        slide.style.backgroundImage = "url('" + feed[si].limg + "')";
        div.appendChild(slide);
      }
      break;
    case "defi":
      document.getElementById(topic + "-img").src = feed[counter].limg;

      counter++;
      if (feed[counter] !== undefined) {
        currentPosts.add(feed[counter].id);
        document.getElementById(topic + "-title0").innerHTML =
          post.title.rendered;
        document.getElementById(topic + "-desc0").innerHTML =
          new String(post.excerpt.rendered).split("[&hellip;]") +
          "<a href='" +
          feed[counter].link +
          "'  target=',blank'><p>Read more</p></a>";
      } else {
        document.getElementById("defi0").innerHTML = "";
      }
      break;
    case "blockchain":
      document.getElementById(topic + "-img").src = feed[counter].limg;

      break;
    case "hotbusinessnews":
      document.getElementById(topic + "-img").src = feed[counter].limg;

      counter++;
      if (feed[counter] !== undefined) {
        currentPosts.add(feed[counter].id);
        document.getElementById(topic + "-title0").innerHTML =
          post.title.rendered;
        document.getElementById(topic + "-desc0").innerHTML =
          new String(post.excerpt.rendered).split("[&hellip;]") +
          "<a href='" +
          feed[counter].link +
          "'  target=',blank'><p>Read more</p></a>";

        document.getElementById(topic + "-img0").src = feed[counter].limg;

        counter++;
      } else {
        document.getElementById("hotbusinessnews0").innerHTML = "";
      }

      if (feed[counter] !== undefined) {
        currentPosts.add(feed[counter].id);
        document.getElementById(topic + "-title1").innerHTML =
          post.title.rendered;
        document.getElementById(topic + "-desc1").innerHTML =
          new String(post.excerpt.rendered).split("[&hellip;]") +
          "<a href='" +
          feed[counter].link +
          "'  target=',blank'><p>Read more</p></a>";

        document.getElementById(topic + "-img1").src = feed[counter].limg;
      } else {
        document.getElementById("hotbusinessnews1").innerHTML = "";
      }

      break;
    case "news":
      document.getElementById(topic + "-img").src = feed[counter].limg;

      break;
  }
  titleElem.innerHTML = title;
  descElem.innerHTML = desc;
  counter++;
  document.getElementById(topic + "-counter").value = counter;
}

async function setData(url) {
  let data = await fetch(url);
  return await data.json();
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

function smoothscroll(hash, topic) {
  if (topic != undefined) {
    nextHeatMap(topic);
  }

  $("html, body").animate({
      scrollTop: $(hash).offset().top,
    },
    800,
    function () {
      window.location.hash = hash;
    }
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 24ddb48dc36c13057b71d125a2191faf03269c46
