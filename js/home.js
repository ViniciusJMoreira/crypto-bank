import { convertCurrency, convertCurrencyStyle } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const labelBalance = document.querySelector(".current-balance");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");

function displayBalance() {
  const totalBalance = Object.entries(wallet[currentCurrency])
  .flatMap(mov => mov[1])
  .reduce((acc, mov) => (acc += mov),0);
  labelBalance.textContent = convertCurrency(totalBalance);
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

export { displayBalance, calcDisplaySummary };