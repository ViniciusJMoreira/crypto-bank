import { convertCurrency, convertCurrencyStyle } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { accounts } from "./accounts.js";
const labelBalance = document.querySelector(".current-balance");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");

function displayBalance(account) {
  const totalBalance = account.wallet[currentCurrency].reduce(
    (acc, mov) => (acc += mov),
    0
  );
  labelBalance.textContent = convertCurrency(totalBalance);
}

function calcDisplaySummary(account) {
  const incomes = account.wallet[currentCurrency].reduce((acc, mov) => {
    if (mov > 0) return (acc += mov);
    return acc;
  }, 0);
  const outcomes = account.wallet[currentCurrency].reduce((acc, mov) => {
    if (mov < 0) return (acc += mov);
    return acc;
  }, 0);
  labelSumIn.textContent = convertCurrency(incomes);
  labelSumOut.textContent = convertCurrency(outcomes);
}

export function updateBalance() {
  displayBalance(accounts[0]);
  calcDisplaySummary(accounts[0]);
}