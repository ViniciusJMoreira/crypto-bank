import { displayBalance, calcDisplaySummary, backToHome } from "./home.js";
import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { displayFiatWalletTotal } from "./fiatWallet.js";
import { displayCryptoWallet, toggleCryptoWallet } from "./cryptoWallet.js";
import { resetDepositValues, displayDeposit } from "./deposit.js";
import { resetCryptoValues, displayCryptoFinances } from "./cryptoFinances.js";

////// Home section
// Display home section
await displayCryptoCurrencies();
document.querySelector(".btn-home").addEventListener("click", (event) => {
  displayBalance();
  calcDisplaySummary();
  showHiddenSection(event);
});
document.querySelectorAll(".container-crypto-currencies").forEach(displayCryptoFinances);

////// Deposit section
document.querySelector('.btn-deposit').addEventListener("click", displayDeposit);
//Back to home
document.querySelector(".icon-nav-back-home").addEventListener("click", () => {
  backToHome();
  resetDepositValues();
  resetCryptoValues();
  displayBalance();
  calcDisplaySummary();
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