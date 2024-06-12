import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { displayWallet } from "./movements.js";

// display crypto currencies
await displayCryptoCurrencies();
// display movements account
displayWallet();

const btnWallet = document.querySelector('.btn-wallet');
const sectionMovements = document.querySelector(".section-movements");
const sectionCryptoCurrencies = document.querySelector('.section-crypto-currencies');
btnWallet.addEventListener("click", () => {
  sectionCryptoCurrencies.style.display = 'none';
  sectionMovements.style.display = 'block';
  setTimeout(() => (sectionMovements.style.opacity = 1), 100);
});