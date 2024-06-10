import { currencies } from "./currencies.js";

// questao pra resolver
let currentCurrency = "euro";

const API_KEY = "19718a9ed4d37246d63a91247ad10cebf2209c712f7d279a08b679612d895b8a";
const sectionCryptoCurrencies = document.querySelector('.section-crypto-currencies');
const dataCrypto = await dataCryptoCurrencies();

async function fetchCryptoCurrencies() {
  try {
    const data = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,MANA,ADA,AVAX&tsyms=USD,EUR&api_key={${API_KEY}}`
    ).then(res => res.json());
    return data.DISPLAY;
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
  const dataCrypto = cryptoCurrencies.reduce((acc,coin) => {
    const name = allCryptoNames.Data[coin[0]].FullName.split(' ')[0];
    const price = Number(coin[1][currencies[currentCurrency].currency].PRICE.split(' ')[1].replace(',',''));
    acc[coin[0]] = {price, name};
    return acc;
  },{});

  return dataCrypto;
}



async function displayCryptoCurrencies() {
  sectionCryptoCurrencies.innerHTML = "";
  Object.entries(dataCrypto).forEach((coin) => {
    const html = `
        <div class="container-movements">
          <div>
            <p class="movements-type">${coin[1].name}</p>
            <p class="movements-description">${coin[0]}</p>
          </div>
          <div class="right">
          <p class="movements-value deposit">${
            coin[1].price
          }</p>
            <p class="movements-date">1 May</p>
          </div>
        </div>
    `;
    sectionCryptoCurrencies.insertAdjacentHTML("afterbegin", html);
  });
}

export { displayCryptoCurrencies, dataCrypto };