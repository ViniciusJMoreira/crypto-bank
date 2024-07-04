import { convertCurrency } from "./convertCurrency.js";
import { currentCryptoData } from "./cryptoCurrencies.js";
import { currentCurrency } from "./currentCurrency.js";
import { wallet } from "./wallet.js";
const sectionCryptoFinance = document.querySelector(".section-crypto-finance");
const labelCurrentPrice = document.querySelector(".section-crypto-finance .current-price");
const labelCurrentBalance = document.querySelector(".crypto-total-value");
let values = "";
let cryptoName;

export function displayCryptoFinances(el) {
  el.addEventListener("click", (event) => {
    // change icon from menu to back arrow
    document.querySelector(".icon-nav-menu").style.display = "none";
    document.querySelector(".icon-nav-back-home").style.display = "block";
    cryptoName = event.target.dataset.cryptoTicker;
    // console.log(currentCryptoData[cryptoTicker]);
    document.querySelector(".section-crypto-currencies").style.display = "none";
    sectionCryptoFinance.style.display = "block";
    // hidden nav-portfolio and section balance
    document.querySelector(".nav-portfolio-icons").style.display = "none";
    document.querySelector(".section-balance").style.display = "none";
    document.querySelector(".section-crypto-finance .flag-crypto").
    src = `https://www.cryptocompare.com/${currentCryptoData[cryptoName].image}`;
    const amountCrypto = 0 / currentCryptoData[cryptoName].price;
    labelCurrentBalance.innerHTML = `&#8776; ${cryptoName} ${amountCrypto.toFixed(9)}`;
  });
}

export function resetCryptoValues() {
  values = "";
  labelCurrentPrice.textContent = "0,00";
}

  // Display target key value
document.querySelectorAll(".section-crypto-finance .key").forEach((keys) => {
  keys.addEventListener("click", (event) => {
    const value = event.target.dataset.key;
    if (value === "backspace" && values.length > 0) {
      if (values.charAt(values.length - 2) === ".") {
        const result = values.slice(0, -2);
        values = result;
        const amountCrypto = values / currentCryptoData[cryptoName].price;
        labelCurrentBalance.innerHTML = `&#8776; ${cryptoName} ${Number(amountCrypto).toFixed(9)}`;
        labelCurrentPrice.textContent = convertCurrency(Number(values));
      } else {
        const result = values.slice(0, -1);
        values = result;
        const amountCrypto = values / currentCryptoData[cryptoName].price;
        labelCurrentBalance.innerHTML = `&#8776; ${cryptoName} ${Number(amountCrypto).toFixed(9)}`;
        labelCurrentPrice.textContent = convertCurrency(Number(values));
      }
    }
    if (value !== "backspace" && !values.endsWith(",")) {
      values += value;
      const amountCrypto = values / currentCryptoData[cryptoName].price;
      labelCurrentBalance.innerHTML = `&#8776; ${cryptoName} ${Number(amountCrypto).toFixed(9)}`;
      labelCurrentPrice.textContent = convertCurrency(Number(values));
    }
  });
});

document.querySelector(".btn-crypto-finance").addEventListener("click", () => {
  const currentBalance = wallet[currentCurrency].movements.reduce((acc,mov) => acc+=mov,0);
  if(currentBalance >= Number(values)) {
    let amountCrypto = values / currentCryptoData[cryptoName].price;
    wallet[currentCurrency][cryptoName] ?
      wallet[currentCurrency][cryptoName].push(Number(amountCrypto)) :
      wallet[currentCurrency][cryptoName] = [Number(amountCrypto)];
    wallet[currentCurrency].movements.push(- Number(values));
    currentCryptoData[cryptoName].initPrice.push(currentCryptoData[cryptoName].price);
    values = "";
    amountCrypto = 0 / currentCryptoData[cryptoName].price;
    labelCurrentBalance.innerHTML = `&#8776; ${cryptoName} ${amountCrypto.toFixed(9)}`;
    labelCurrentPrice.textContent = "0,00";
  }
});