import { displayCryptoCurrencies } from "./cryptoCurrencies.js";
import { accounts } from "./accounts.js";
import { updateUI } from "./movements.js";

// display movements account
updateUI(accounts[0]);
// display crypto currencies
displayCryptoCurrencies();
// setInterval(() => displayCryptoCurrencies(), 1000 * 10);