import { convertCurrency, convertCurrencyStyle } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const containerMovements = document.querySelector(".container-movements");
let isBoolean = false;

function displayMovements() {
  containerMovements.innerHTML = "";
  wallet[currentCurrency].movements.forEach((mov) => {
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
  isBoolean = !isBoolean;
  if(isBoolean) {
    // arrumar a questao dessa funcao(lugar errado)
    displayMovements();
    containerMovements.style.display = "block";
    document.querySelector('.col-movements i').className = "bi bi-caret-down-fill"
    setTimeout(() => (containerMovements.style.opacity = 1), 50); 
  }else {
    containerMovements.style.display = "none";
    document.querySelector(".col-movements i").className ="bi bi-caret-right-fill";
    setTimeout(() => (containerMovements.style.opacity = 0), 50); 
  }
}

export { displaySectionMovements };