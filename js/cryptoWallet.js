import { convertCurrencyStyle } from "./convertCurrency.js";
import { currentCryptoData } from "./cryptoCurrencies.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const cryptoWallet = document.querySelector(".container-crypto-wallet");
let isToggle = false;

async function displayCryptoWallet() {
  cryptoWallet.innerHTML = "";
  Object.entries(currentCryptoData).forEach((coin) => {
    if(wallet[currentCurrency][coin[0]]) {
      const totalPrice = wallet[currentCurrency][coin[0]].reduce((acc,mov)=>acc+=mov,0);
      const html = `
        <hr>
        <div class="crypto-item">
          <div class="flex">
            <img class="crypto-image" src="https://www.cryptocompare.com/${
              coin[1].image}" alt="">
            <div>
              <p class="crypto-name">${coin[1].name}</p>
              <p class="crypto-ticker">${coin[0]}</p>
            </div>
          </div>
            <p class="crypto-price crypto-price-${coin[0].toLowerCase()}">
              ${convertCurrencyStyle(totalPrice)}
            </p>
        </div>
      `;
      cryptoWallet.insertAdjacentHTML("afterbegin", html);
    }
  });
}

function toggleCryptoWallet() {
  isToggle = !isToggle;
  if(isToggle) {
    cryptoWallet.style.display = "none";
    document.querySelector('.select-crypto-wallet i').className = "bi bi-caret-right-fill"
    setTimeout(() => (cryptoWallet.style.opacity = 0), 50); 
  }else {
    cryptoWallet.style.display = "block";
    document.querySelector(".select-crypto-wallet i").className ="bi bi-caret-down-fill";
    setTimeout(() => (cryptoWallet.style.opacity = 1), 50); 
  }
}

export { displayCryptoWallet, toggleCryptoWallet };