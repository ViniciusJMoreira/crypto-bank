import { convertCurrency, convertCurrencyStyle } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const labelBalance = document.querySelector(".current-balance");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");

function displayBalance() {
  const totalFiatWallet = wallet[currentCurrency].movements.reduce((acc,mov) => acc += mov ,0);
  labelBalance.textContent = convertCurrency(totalFiatWallet);
}

function calcDisplaySummary() {
  const incomes = wallet[currentCurrency].movements.reduce((acc, mov) => {
    if (mov > 0) return (acc += mov);
    return acc;
  }, 0);
  const outcomes = wallet[currentCurrency].movements.reduce((acc, mov) => {
    if (mov < 0) return (acc += mov);
    return acc;
  }, 0);
  labelSumIn.textContent = convertCurrency(incomes);
  labelSumOut.textContent = convertCurrency(outcomes);
}

function backToHome() {
  // change icon from back arrow to menu
  document.querySelector(".icon-nav-menu").style.display = "block";
  document.querySelector(".icon-nav-back-home").style.display = "none";
  // hidden section deposit and crypto fincance
  document.querySelector(".section-deposit").style.display = "none";
  document.querySelector(".section-crypto-finance").style.display = "none";
  // hidden nav-portfolio and section balance
  document.querySelector(".nav-portfolio-icons").style.display = "flex";
  document.querySelector(".section-balance").style.display = "block";
  // show section crypto currencies
  document.querySelector(".section-crypto-currencies").style.display = "block";
}

displayBalance();
calcDisplaySummary();
export { displayBalance, calcDisplaySummary, backToHome };