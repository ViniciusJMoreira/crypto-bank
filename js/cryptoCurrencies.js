import { currencies } from "./currencies.js";
import { convertCurrencyStyle } from "./convertCurrency.js";

// questao pra resolver
let currentCurrency = "euro";
const API_KEY = "19718a9ed4d37246d63a91247ad10cebf2209c712f7d279a08b679612d895b8a";
const sectionCryptoCurrencies = document.querySelector('.section-crypto-currencies');

async function fetchCryptoCurrencies() {
  try {
    const data = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,MANA,ADA,AVAX&tsyms=USD,EUR&api_key={${API_KEY}}`
    ).then(res => res.json());
    return data.RAW;
  } catch (err) {
    console.error("Erro ao buscar a lista de criptomoedas.");
  }
}

async function fetchCryptoNames() {
  try {
    const allCryptoNames = await fetch(
      `https://min-api.cryptocompare.com/data/all/coinlist`
    ).then((res) => res.json());
    return allCryptoNames;
  } catch (err) {
    console.error("Erro ao buscar a lista de criptomoedas.");
  }
}

async function dataCryptoCurrencies() {
  const allCryptoNames = await fetchCryptoNames();
  const cryptoCurrencies = Object.entries(await fetchCryptoCurrencies());
  // console.log(cryptoCurrencies);
  const dataCrypto = cryptoCurrencies.reduce((acc,coin) => {
    const open24Hour = coin[1][currencies[currentCurrency].currency].OPEN24HOUR;
    const pricenow = coin[1][currencies[currentCurrency].currency].PRICE;
    const name = allCryptoNames.Data[coin[0]].FullName.split(' ')[0];
    const price = Math.round(coin[1][currencies[currentCurrency].currency].PRICE * 100) / 100;
    const percentage = Math.round((((pricenow - open24Hour) / open24Hour) * 100) * 100) / 100;
    acc[coin[0]] = { price, name, percentage };
    return acc;
  },{});
  // console.log(dataCrypto);
  return dataCrypto;
}



async function displayCryptoCurrencies(dataCrypto) {
  sectionCryptoCurrencies.innerHTML = "";
  Object.entries(dataCrypto).forEach((coin) => {
    const type = coin[1].percent > 0 ? "increase" : "decrease";
    const html = `
        <div class="container-crypto-currencies">
          <div>
            <p class="crypto-name">${coin[1].name}</p>
            <p class="crypto-ticker">${coin[0]}</p>
          </div>
          <div class="right">
          <p class="crypto-price crypto-price-${coin[0].toLowerCase()}">${convertCurrencyStyle(
      coin[1].price
    )}</p>
            <p class="crypto-percentage crypto-percentage-${coin[0].toLowerCase()} ${type}">${coin[1].percentage}%</p>
          </div>
        </div>
    `;
    sectionCryptoCurrencies.insertAdjacentHTML("afterbegin", html);
  });
}

export { dataCryptoCurrencies, displayCryptoCurrencies };