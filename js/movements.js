import { currencies } from "./currencies.js";

// questao pra resolver
let currentCurrency = "euro";

const sectionMovements = document.querySelector('.section-movements');
const labelBalance = document.querySelector('.current-balance');
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");

function convertCurrencyStyle (movement) {
  return movement.toLocaleString(`${currencies[currentCurrency].localeCode}`, {style: 'currency', currency: `${currencies[currentCurrency].currency}`});
}
function convertCurrency (movement) {
  return movement.toLocaleString(`${currencies[currentCurrency].localeCode}`, {minimumFractionDigits: 2,maximumFractionDigits: 2});
}

function displayBalance(account) {
  const totalBalance = account.wallet[currentCurrency].reduce((acc,mov) => acc+=mov,0);
  labelBalance.textContent = convertCurrency(totalBalance);
}

function displayMovements(account) {
  sectionMovements.innerHTML = "";
  account.wallet[currentCurrency].forEach((mov) => {
    const type = mov > 0 ? "deposit" : "withdraw";
    const html = `
        <div class="container-movements">
          <div>
            <p class="movements-type">${type}</p>
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

function calcDisplaySummary(account) {
  const incomes = account.wallet[currentCurrency].reduce((acc,mov) => {
    if(mov > 0) return acc+=mov; return acc
  },0);
  const outcomes = account.wallet[currentCurrency].reduce((acc,mov) => {
    if(mov < 0) return acc+=mov; return acc;
  },0);
  labelSumIn.textContent = convertCurrency(incomes);
  labelSumOut.textContent = convertCurrency(outcomes);
}

function updateUI(account) {
  displayMovements(account);
  displayBalance(account);
  calcDisplaySummary(account);
}

export { updateUI };