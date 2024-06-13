import { updateBalance } from "./home.js";
import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { displayWalletMovements, displaySectionMovements } from "./movements.js";

// display crypto currencies
await displayCryptoCurrencies();

//display home section
document.querySelector('.btn-home').addEventListener('click', displayCryptoCurrencies)

// display wallet section
document.querySelector('.btn-wallet').addEventListener("click", displaySectionMovements);

// display movements account
updateBalance();
document.querySelector('.col-movements').addEventListener("click", displayWalletMovements);