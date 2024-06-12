import { currencies } from "./currencies.js";
import { currentCurrency } from "./currentCurrency.js";

function convertCurrencyStyle(movement) {
  return movement.toLocaleString(`${currencies[currentCurrency].localeCode}`, {
    style: "currency",
    currency: `${currencies[currentCurrency].currency}`,
  });
}
function convertCurrency(movement) {
  return movement.toLocaleString(`${currencies[currentCurrency].localeCode}`, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export { convertCurrencyStyle, convertCurrency };
