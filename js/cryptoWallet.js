import { currentCryptoData } from "./cryptoCurrencies.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const cryptoWallet = document.querySelector(".container-crypto-wallet");
let isToggle = false;

async function displayCryptoWallet() {
  cryptoWallet.innerHTML = "";
  Object.entries(currentCryptoData).forEach((coin) => {
    if(wallet[currentCurrency][coin[0]]) {
      let percentage = 0;
      currentCryptoData[coin[0]].initPrice.forEach(price => {
        percentage += Math.round((((currentCryptoData[coin[0]].price - price) / price) * 100) * 100) / 100;
      });
      const totalPrice = wallet[currentCurrency][coin[0]].reduce((acc,mov)=>acc+=mov,0);
      const amountCrypto = totalPrice / currentCryptoData[coin[0]].price;
      const type = percentage >= 0 ? "increase" : "decrease";
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
          <div>
            <p class="crypto-price crypto-price-${coin[0].toLowerCase()}">
              ${amountCrypto.toFixed(6)}
            </p>
            <p class="crypto-percentage ${type} text-end">${percentage}%</p>
          </div>
        </div>
      `;
      cryptoWallet.insertAdjacentHTML("afterbegin", html);
    }
  });
  setInterval(displayCryptoWallet, 1000 * 10);
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