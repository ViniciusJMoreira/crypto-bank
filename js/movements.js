import { convertCurrency, convertCurrencyStyle } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { accounts } from "./accounts.js";
const sectionMovements = document.querySelector('.section-movements');
const labelBalance = document.querySelector('.current-balance');
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");

function displayBalance(account) {
  const totalBalance = account.wallet[currentCurrency].reduce((acc,mov) => acc+=mov,0);
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

function displayMovements(account) {
  sectionMovements.innerHTML = "";
  account.wallet[currentCurrency].forEach((mov) => {
    const type = mov > 0 ? "increase" : "decrease";
    const movement = mov > 0 ? 'Deposit' : 'Withdraw'
    const html = `
        <div class="container-movements">
          <div>
            <p class="movements-type">${movement}</p>
            <p class="movements-description">Description</p>
          </div>
          <div class="right">
          <p class="movements-value ${type}">${convertCurrencyStyle(mov)}</p>
            <p class="movements-date">1 May</p>
          </div>
        </div>
    `;
    sectionMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function displayWallet() {
  displayMovements(accounts[0]);
  displayBalance(accounts[0]);
  calcDisplaySummary(accounts[0]);
}

export { displayWallet };