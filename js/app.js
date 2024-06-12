import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { displayWallet } from "./movements.js";

// display crypto currencies
await displayCryptoCurrencies();
// display movements account
displayWallet();

const btnWallet = document.querySelector('.btn-wallet');
const sectionMovements = document.querySelector(".section-movements");
const latestMovements = document.querySelector(".col-movements");
const containerMovements = document.querySelector(".container-movements");
const sectionCryptoCurrencies = document.querySelector('.section-crypto-currencies');
let boo = false;
btnWallet.addEventListener("click", () => {
  sectionCryptoCurrencies.style.display = 'none';
  sectionMovements.style.display = "block";
});
latestMovements.addEventListener("click", () => {
  boo = !boo;

  if(boo) {
    containerMovements.style.display = "block";
    document.querySelector('.col-movements i').className = "bi bi-caret-down-fill"
    setTimeout(() => (containerMovements.style.opacity = 1), 50); 
  }else {
    containerMovements.style.display = "none";
    document.querySelector(".col-movements i").className ="bi bi-caret-right-fill";
    setTimeout(() => (containerMovements.style.opacity = 0), 50); 
  }
});