import { convertCurrency } from "./convertCurrency.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const sectionDeposit = document.querySelector(".section-deposit");
const textCurrentPrice = document.querySelector(".current-price");
let values = "";

export function displayDeposit() {
  // show deposit and hidden header and all section
  document.querySelectorAll('.app section').forEach(section => section.style.display = 'none');
  document.querySelector(".header").style.display = "none";
  sectionDeposit.style.display = "grid";
}

export function backToHome() {
  sectionDeposit.style.display = "none";
  document.querySelector(".header").style.display = "block";
  document.querySelector(".section-crypto-currencies").style.display = "block";
  values = "";
  textCurrentPrice.textContent = "0,00";
}

  // Display target value
document.querySelectorAll(".key").forEach((keys) => {
  keys.addEventListener("click", (event) => {
  const value = event.target.dataset.key;
    if (value === "backspace" && values.length > 0) {
      if (values.charAt(values.length - 2) === ".") {
        const result = values.slice(0, -2);
        values = result;
        textCurrentPrice.textContent = convertCurrency(Number(values));
      } else {
        const result = values.slice(0, -1);
        values = result;
        textCurrentPrice.textContent = convertCurrency(
          Number(values)
        );
      }
    }
    if (value !== "backspace" && !values.endsWith(",")) {
      values += value;
      textCurrentPrice.textContent = convertCurrency(
        Number(values)
      );
    }
  })
});

  // Select currency
document.querySelector(".select-currency").addEventListener("click", () => {
  document.querySelectorAll(".select-currency li:not(.select)").forEach(li => {
    if ((li.style.display === "block")) li.style.display = "none";
    else li.style.display = "block";
  });
});

  // Deposit cash to wallet
document.querySelector(".btn-deposit-wallet").addEventListener("click", () => {
  if (values > 0) {
    wallet[currentCurrency].movements.push(Number(values));
    textCurrentPrice.textContent = "0,00";
  }
});