import { displayCryptoCurrencies,dataCryptoCurrencies } from "./cryptoCurrencies.js";
import { accounts } from "./accounts.js";
import { updateUI } from "./movements.js";
import { convertCurrencyStyle } from "./convertCurrency.js";

// display movements account
updateUI(accounts[0]);
// first data crypto currencies
let currentCryptoData = await dataCryptoCurrencies();
// display crypto currencies
await displayCryptoCurrencies(currentCryptoData);

//
function fadeIncrease(element) {
  element.classList.add("increase");
  setTimeout(() => {
    element.classList.remove("increase");
  }, 2000);
}
function fadeDecrease(element) {
  element.classList.add("decrease");
  setTimeout(() => {
    element.classList.remove("decrease");
  }, 2000);
}
async function updateCryptoPrice() {
  const newCryptoData = await dataCryptoCurrencies();
  Object.entries(newCryptoData).forEach((el) => {
    let { price } = currentCryptoData[el[0]]
    const atualPrice = el[1].price;
    const elPrice = document.querySelector(`.crypto-price-${el[0].toLowerCase()}`);
    const elPercentage = document.querySelector(`.crypto-percentage-${el[0].toLowerCase()}`)
    price = Math.round(price * 100) / 100;
    if (price > atualPrice) {
      fadeDecrease(elPrice);
    } 
    else if(price < atualPrice) {
      fadeIncrease(elPrice);
    }
    elPrice.textContent = convertCurrencyStyle(atualPrice);

  if (el[1].percentage > 0 && elPercentage.classList.contains("decrease")) {
      elPercentage.classList.remove("decrease");
      elPercentage.classList.add("increase");
    } else if (el[1].percentage < 0 && elPercentage.classList.contains("increase")) {
      elPercentage.classList.remove("increase");
      elPercentage.classList.add("decrease");
    }
  })
}
// updateCryptoPrice()
setInterval(updateCryptoPrice, 1000 * 10);