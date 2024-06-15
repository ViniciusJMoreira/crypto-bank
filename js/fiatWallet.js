import { convertCurrencyStyle } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";

function displayFiatWalletTotal() {
  const total = wallet[currentCurrency].movements.reduce((acc,mov) => acc+=mov,0);
  document.querySelector('.fiat-wallet-total').textContent = convertCurrencyStyle(total);
}

export { displayFiatWalletTotal };