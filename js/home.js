import { convertCurrency } from "./convertCurrency.js";
import { currentCryptoData } from "./cryptoCurrencies.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const labelBalance = document.querySelector(".current-balance");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");

function displayBalance() {
  const totalMovements = wallet[currentCurrency].movements.reduce((acc,mov) => acc += mov ,0);
  let totalCoin = 0;
  Object.entries(currentCryptoData).forEach((coin) => {
    if(wallet[currentCurrency][coin[0]]) {
      const sumCoin = wallet[currentCurrency][coin[0]].reduce((acc,value) => acc+=value,0);
      totalCoin += sumCoin * coin[1].price;
    }
  })
  const totalWallet = totalMovements + totalCoin;
  labelBalance.textContent = convertCurrency(totalWallet);
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

export { displayBalance, calcDisplaySummary, backToHome };