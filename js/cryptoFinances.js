import { currentCryptoData } from "./cryptoCurrencies.js";
const sectionCryptoFinance = document.querySelector(".section-crypto-finance");
const labelCurrentPrice = document.querySelector(".section-crypto-finance .current-price");
let values = "";

export function displayCryptoFinances(el) {
  el.addEventListener("click", (event) => {
    // change icon from menu to back arrow
    document.querySelector(".icon-nav-menu").style.display = "none";
    document.querySelector(".icon-nav-back-home").style.display = "block";
    const cryptoTicker = event.target.dataset.cryptoTicker;
    // console.log(currentCryptoData[cryptoTicker]);
    document.querySelector(".section-crypto-currencies").style.display = "none";
    sectionCryptoFinance.style.display = "block";
    // hidden nav-portfolio and section balance
    document.querySelector(".nav-portfolio-icons").style.display = "none";
    document.querySelector(".section-balance").style.display = "none";
    const html = `
      <main class="flex">
        <img src="https://www.cryptocompare.com/${currentCryptoData[cryptoTicker].image}" class="flag-currency" alt="">
        <div class="output-price">
          <span class="current-price">0,00</span>
          <span class="current-currency">EUR</span>
          <span class="deposit-current-balance"></span>
        </div>
        <div class="keyboard">
          <div class="key" data-key="9">9</div>
          <div class="key" data-key="8">8</div>
          <div class="key" data-key="7">7</div>
          <div class="key" data-key="6">6</div>
          <div class="key" data-key="5">5</div>
          <div class="key" data-key="4">4</div>
          <div class="key" data-key="3">3</div>
          <div class="key" data-key="2">2</div>
          <div class="key" data-key="1">1</div>
          <div class="key" data-key=".">.</div>
          <div class="key" data-key="0">0</div>
          <div class="key"><i class="bi bi-backspace" data-key="backspace"></i></div>
        </div>
        <button class="btn-crypto-finance"><i class="bi bi-wallet"></i> PAY</button>
      </main>
    `;
    sectionCryptoFinance.insertAdjacentHTML("afterbegin", html);
  });
}

  // Display target key value
document.querySelectorAll(".section-crypto-finance .key").forEach((keys) => {
  keys.addEventListener("click", (event) => {
    const value = event.target.dataset.key;
    if (value === "backspace" && values.length > 0) {
      if (values.charAt(values.length - 2) === ".") {
        const result = values.slice(0, -2);
        values = result;
        labelCurrentPrice.textContent = convertCurrency(Number(values));
      } else {
        const result = values.slice(0, -1);
        values = result;
        labelCurrentPrice.textContent = convertCurrency(Number(values));
      }
    }
    if (value !== "backspace" && !values.endsWith(",")) {
      values += value;
      labelCurrentPrice.textContent = convertCurrency(Number(values));
    }
  });
});