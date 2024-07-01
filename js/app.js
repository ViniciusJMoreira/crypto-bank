import { displayBalance ,calcDisplaySummary } from "./home.js";
import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { displayFiatWalletTotal } from "./fiatWallet.js";
import { displayCryptoWallet, toggleCryptoWallet } from "./cryptoWallet.js";
import { backToHome, displayDeposit } from "./deposit.js";

////// Home section
// display crypto currencies
await displayCryptoCurrencies();
// display balance
displayBalance();
calcDisplaySummary();
//display home section
document.querySelector(".btn-home").addEventListener("click", (event) => {
  displayBalance();
  calcDisplaySummary();
  showHiddenSection(event);
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