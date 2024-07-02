import { displayBalance ,calcDisplaySummary } from "./home.js";
import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { displayFiatWalletTotal } from "./fiatWallet.js";
import { displayCryptoWallet, toggleCryptoWallet } from "./cryptoWallet.js";
import { backToHome, displayDeposit } from "./deposit.js";

////// Home section
// Display home section
await displayCryptoCurrencies();
    console.log(document.querySelector(".container-crypto"));
document.querySelector(".btn-home").addEventListener("click", (event) => {
  displayBalance();
  calcDisplaySummary();
  showHiddenSection(event);
});
document.querySelectorAll(".container-crypto-currencies").forEach(el => {
  el.addEventListener("click", () => {
    document.querySelectorAll('.container-crypto-currencies').forEach(section => section.style.display = 'none');
    document.querySelector(".header").style.display = "none";
    const html = `
      <main class="flex">
        <img src="./media/europe.png" class="flag-currency" alt="">
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
        <button class="btn-deposit-wallet"><i class="bi bi-paypal"></i> PAYPAL</button>
      </main>
    `;
    document.querySelector(".section-crypto-finance").insertAdjacentHTML("afterbegin", html);
  })
});

////// Deposit section
document.querySelector('.btn-deposit').addEventListener("click", () => {
  // Display deposit section
  displayDeposit();
  //Back to home
  document.querySelector(".icon-back-page").addEventListener("click", () => {
    backToHome();
    displayBalance();
    calcDisplaySummary();
  });
});

////// Wallet section
// Display wallet section
document.querySelector(".btn-wallet").addEventListener("click", (event) => {
  // show fiat wallet
  displayFiatWalletTotal();
  // show crypto wallet
  displayCryptoWallet();
  // show and hidden wallet section
  showHiddenSection(event);
});
// Show hidden crypto wallet
document.querySelector('.select-crypto-wallet').addEventListener("click", toggleCryptoWallet);

// Show and hidden section event
function showHiddenSection(event) {
  document.querySelectorAll('.app section').forEach(section => section.style.display = 'none');
  const section = event.target.dataset.target;
  document.querySelector(`.${section}`).style.display = "block";
}