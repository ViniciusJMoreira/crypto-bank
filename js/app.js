import { updateBalance } from "./home.js";
import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { displaySectionMovements } from "./movements.js";

// display crypto currencies
await displayCryptoCurrencies();

// show and hidden section event
function showHiddenSection(event) {
  document.querySelectorAll('.app section').forEach(section => section.style.display = 'none');
  const section = event.target.dataset.target;
  document.querySelector(`.${section}`).style.display = "block";
}

//display home section
document.querySelector(".btn-home").addEventListener("click", showHiddenSection);

// display wallet section
document.querySelector(".btn-wallet").addEventListener("click", showHiddenSection);

// display movements account
updateBalance();
document.querySelector('.col-movements').addEventListener("click", displaySectionMovements);