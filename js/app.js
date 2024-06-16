import { displayBalance ,calcDisplaySummary } from "./home.js";
import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { displayFiatWalletTotal } from "./fiatWallet.js";
import { displayCryptoWallet, toggleCryptoWallet } from "./cryptoWallet.js";
import { convertCurrency } from "./convertCurrency.js";

////// Home section
// display crypto currencies
await displayCryptoCurrencies();
// display balance
displayBalance();
calcDisplaySummary();

//display home section
document.querySelector(".btn-home").addEventListener("click", showHiddenSection);

////// Deposit section
let values = '';
document.querySelector('.btn-deposit').addEventListener("click", showHiddenSection);
document.querySelectorAll('.key').forEach((keys) => {
  keys.addEventListener('click', (event) => {
    const value = event.target.dataset.key;
    values += value;
    document.querySelector(".current-price").textContent = values;
  })
})

////// Wallet section
// display wallet section
document.querySelector(".btn-wallet").addEventListener("click", (event) => {
  // show fiat wallet
  displayFiatWalletTotal();
  // show crypto wallet
  displayCryptoWallet();
  // show and hidden wallet section
  showHiddenSection(event);
});
// show hidden crypto wallet
document.querySelector('.select-crypto-wallet').addEventListener("click", toggleCryptoWallet);

// show and hidden section event
function showHiddenSection(event) {
  document.querySelectorAll('.app section').forEach(section => section.style.display = 'none');
  const section = event.target.dataset.target;
  document.querySelector(`.${section}`).style.display = "block";
}