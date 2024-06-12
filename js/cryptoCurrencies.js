import { currencies } from "./currencies.js";
import { convertCurrencyStyle } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";

let currentCryptoData = {};
const API_KEY = "19718a9ed4d37246d63a91247ad10cebf2209c712f7d279a08b679612d895b8a";
const sectionCryptoCurrencies = document.querySelector('.section-crypto-currencies');

async function fetchCryptoNames() {
  try {
    const allCryptoNames = await fetch(
      `https://min-api.cryptocompare.com/data/all/coinlist`
    ).then((res) => res.json()).then(res => res.Data);
    return allCryptoNames;
  } catch (err) {
    console.error("Erro ao buscar a lista de criptomoedas.");
  }
}

async function fetchCryptoCurrencies() {
  try {
    const allCryptoData = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=MATIC,CRO,MATIC,AVAX,ADA,MANA,XRP,ETH,BTC&tsyms=USD,EUR&api_key={${API_KEY}}`
    ).then(res => res.json()).then(res => res.RAW);
    return allCryptoData;
  } catch (err) {
    console.error("Erro ao buscar a lista de criptomoedas.");
  }
}

async function dataCryptoCurrencies() {
  const allCryptoNames = await fetchCryptoNames();
  const cryptoCurrencies = Object.entries(await fetchCryptoCurrencies());
  const dataCrypto = cryptoCurrencies.reduce((acc,coin) => {
    const name = allCryptoNames[coin[0]].FullName.split(' ')[0];
    const price = coin[1][currencies[currentCurrency].currency].PRICE;
    const open24Hour = coin[1][currencies[currentCurrency].currency].OPEN24HOUR;
    const percentage = Math.round((((price - open24Hour) / open24Hour) * 100) * 100) / 100;
    acc[coin[0]] = { price, name, percentage };
    return acc;
  },{});
  // console.log(dataCrypto);
  return dataCrypto;
}

async function dataCryptoNames(currentCryptoData) {
  const allCryptoNames = await fetchCryptoNames();
  const dataCrypto = Object.entries(currentCryptoData).map((coin) => {
    const name = allCryptoNames[coin[0]].FullName.split(" ")[0];
    const imageUrl = allCryptoNames[coin[0]].ImageUrl;
    console.log(imageUrl);
    return [name, imageUrl];
  });
  return dataCrypto;
}

async function updateCryptoData() {
  const newCryptoData = await dataCryptoCurrencies();
  Object.entries(newCryptoData).forEach((el) => {
    const { price: currentPrice } = currentCryptoData[el[0]];
    const newPrice = el[1].price;
    const elPrice = document.querySelector(
      `.crypto-price-${el[0].toLowerCase()}`
    );
    const elPercentage = document.querySelector(
      `.crypto-percentage-${el[0].toLowerCase()}`
    );
    if (currentPrice > newPrice) {
      fadeDecrease(elPrice, newPrice);
    } else if (currentPrice < newPrice) {
      fadeIncrease(elPrice, newPrice);
    }
    currentCryptoData[el[0]].price = newPrice;

    if (el[1].percentage > 0 && elPercentage.classList.contains("decrease")) {
      elPercentage.classList.remove("decrease");
      elPercentage.classList.add("increase");
    } else if (
      el[1].percentage < 0 &&
      elPercentage.classList.contains("increase")
    ) {
      elPercentage.classList.remove("increase");
      elPercentage.classList.add("decrease");
    }
    currentCryptoData[el[0]].percentage = el[1].percentage;
  });
}

async function displayCryptoCurrencies() {
  currentCryptoData = await dataCryptoCurrencies();
  const allCryptoNames = await dataCryptoNames(currentCryptoData);
  sectionCryptoCurrencies.innerHTML = "";
  Object.entries(currentCryptoData).forEach((coin,i) => {
    const type = coin[1].percentage > 0 ? "increase" : "decrease";
    const html = `
        <div class="container-crypto-currencies">
          <div class="flex">
            <img class="crypto-image" src="https://www.cryptocompare.com/${allCryptoNames[i][1]}" alt="">
            <div>
              <p class="crypto-name">${allCryptoNames[i][0]}</p>
              <p class="crypto-ticker">${coin[0]}</p>
            </div>
          </div>
          <div class="right">
            <p class="crypto-price crypto-price-${coin[0].toLowerCase()}">${convertCurrencyStyle(
      coin[1].price
    )}</p>
            <p class="crypto-percentage crypto-percentage-${coin[0].toLowerCase()} ${type}">${
      coin[1].percentage
    }%</p>
          </div>
        </div>
    `;
    sectionCryptoCurrencies.insertAdjacentHTML("afterbegin", html);
  });
  setInterval(updateCryptoData, 1000 * 20);
}

function fadeIncrease(element, price) {
  element.classList.add("increase");
  setTimeout(() => {
    element.textContent = convertCurrencyStyle(price);
    element.classList.remove("increase");
  }, 2000);
}
function fadeDecrease(element, price) {
  element.classList.add("decrease");
  setTimeout(() => {
    element.textContent = convertCurrencyStyle(price);
    element.classList.remove("decrease");
  }, 2000);
}

export { displayCryptoCurrencies };