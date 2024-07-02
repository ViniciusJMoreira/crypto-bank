import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";

export function totalBalance() {
  return Object.entries(wallet[currentCurrency])
  .flatMap(mov => mov[1])
  .reduce((acc, mov) => (acc += mov),0);
};