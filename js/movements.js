import { convertCurrency, convertCurrencyStyle } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { accounts } from "./accounts.js";

const sectionMovements = document.querySelector(".section-movements");
const containerMovements = document.querySelector(".container-movements");
const sectionCryptoCurrencies = document.querySelector('.section-crypto-currencies');
let isBoolean = false;

function displayMovements(account) {
  containerMovements.innerHTML = "";
  account.wallet[currentCurrency].forEach((mov) => {
    const type = mov > 0 ? "increase" : "decrease";
    const movement = mov > 0 ? 'Deposit' : 'Withdraw'
    const html = `
        <hr>
        <div class="movements-row">
          <div>
            <p class="movements-type">${movement}</p>
            <p class="movements-description">Description</p>
          </div>
          <div class="text-end">
            <p class="movements-value ${type}">${convertCurrencyStyle(mov)}</p>
            <p class="movements-date">1 May</p>
          </div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function displaySectionMovements() {
  sectionCryptoCurrencies.style.display = "none";
  sectionMovements.style.display = "block";
}

function displayWalletMovements() {
  isBoolean = !isBoolean;accounts;
  if(isBoolean) {
    // arrumar a questao dessa funcao(lugar errado)
    displayMovements(accounts[0]);
    containerMovements.style.display = "block";
    document.querySelector('.col-movements i').className = "bi bi-caret-down-fill"
    setTimeout(() => (containerMovements.style.opacity = 1), 50); 
  }else {
    containerMovements.style.display = "none";
    document.querySelector(".col-movements i").className ="bi bi-caret-right-fill";
    setTimeout(() => (containerMovements.style.opacity = 0), 50); 
  }
}

export { displayWalletMovements, displaySectionMovements };