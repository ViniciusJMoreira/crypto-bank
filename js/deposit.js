import { convertCurrency } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const sectionDeposit = document.querySelector(".section-deposit");
const labelCurrentPrice = document.querySelector(".section-deposit .current-price");
const labelCurrentBalance = document.querySelector(".deposit-current-balance");
let values = "";

export function displayDeposit() {
  // show deposit and hidden header and all section
  document.querySelectorAll('.app section').forEach(section => section.style.display = 'none');
  // change icon from menu to back arrow
  document.querySelector(".icon-nav-menu").style.display = "none";
  document.querySelector(".icon-nav-back-home").style.display = "block";
  // hidden nav-portfolio and section balance
  document.querySelector(".nav-portfolio-icons").style.display = "none";
  document.querySelector(".section-balance").style.display = "none";
  sectionDeposit.style.display = "grid";
  // show total balance
  const currentBalance = wallet[currentCurrency].movements.reduce((acc,mov) => acc+=mov,0);
  labelCurrentBalance.innerHTML = `&#8776; ${convertCurrency(currentBalance)}`;
}

export function resetDepositValues() {
  values = "";
  labelCurrentPrice.textContent = "0,00";
}

  // Display target key value
document.querySelectorAll(".section-deposit .key").forEach((keys) => {
  keys.addEventListener("click", (event) => {
    const value = event.target.dataset.key;
    if (value === "backspace" && values.length > 0) {
      if (values.charAt(values.length - 2) === ".") {
        const result = values.slice(0, -2);
        values = result;
        labelCurrentPrice.textContent = convertCurrency(Number(values));
      } else {
        const result = values.slice(0, -1);
        values = result;
        labelCurrentPrice.textContent = convertCurrency(
          Number(values)
        );
      }
    }
    if (value !== "backspace" && !values.endsWith(",")) {
      values += value;
      labelCurrentPrice.textContent = convertCurrency(Number(values));
    }
  })
});

  // Select currency
// document.querySelector(".select-currency").addEventListener("click", () => {
//   document.querySelectorAll(".select-currency li:not(.select)").forEach(li => {
//     if ((li.style.display === "block")) li.style.display = "none";
//     else li.style.display = "block";
//   });
// });

  // Deposit cash to wallet
document.querySelector(".btn-deposit-wallet").addEventListener("click", () => {
  if (values > 0) {
    wallet[currentCurrency].movements.push(Number(values));
    labelCurrentPrice.textContent = "0,00";
    values = "";
    const currentBalance = wallet[currentCurrency].movements.reduce((acc,mov) => acc+=mov,0);
    labelCurrentBalance.innerHTML = `&#8776; ${convertCurrency(currentBalance)}`;
  }
});