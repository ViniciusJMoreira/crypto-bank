import { Accounts } from "./accounts.js";
import { Currencies } from "./currencies.js";

const accounts = Accounts; 
const currencies = Currencies;
let currentCurrency = 'Euro';
const containerMovements = document.querySelector('.movements');
const labelBalance = document.querySelector('.current-balance');

function convertCurrency (movement) {
  return movement.toLocaleString(`${currencies[currentCurrency].localeCode}`, {style: 'currency', currency: `${currencies[currentCurrency].currency}`});
}

function displayBalance(account) {
  const totalBalance = account.wallet[currentCurrency].reduce((acc,mov) => acc+=mov,0);
  labelBalance.textContent = totalBalance.toLocaleString(`${currencies[currentCurrency].localeCode}`, {minimumFractionDigits: 2,maximumFractionDigits: 2});
}

function displayMovements(account) {
  containerMovements.innerHTML = '';
  account.wallet[currentCurrency].forEach((mov) => {
    const type = mov > 0 ? "deposit" : "withdraw";
    const html = `
      <section class="section-movements">
        <div>
          <p class="movements-type">${type}</p>
          <p class="movements-description">Description</p>
        </div>
        <div class="right">
          <p class="movements-date">1 May</p>
          <p class="movements-value ${type}">${convertCurrency(mov)}</p>
        </div>
      </section>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function updateUI(account) {
  displayMovements(account);
  displayBalance(account);
}

updateUI(accounts[0]);