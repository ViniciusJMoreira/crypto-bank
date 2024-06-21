import { convertCurrency } from "./convertCurrency.js";
const sectionDeposit = document.querySelector(".section-deposit");
let values = "";
export function displayDeposit() {
  // show deposit and hidden header and all section
  document.querySelectorAll('.app section').forEach(section => section.style.display = 'none');
  sectionDeposit.style.display = "grid";
  document.querySelector(".header").style.display = "none";
  // display and convert values
  document.querySelectorAll(".key").forEach((keys) => {
    keys.addEventListener("click", (event) => {
      const value = event.target.dataset.key;
      if (value === "backspace" && values.length > 0) {
        if (values.charAt(values.length - 2) === ".") {
          const result = values.slice(0, -2);
          values = result;
          document.querySelector(".current-price").textContent =
            convertCurrency(Number(values));
        } else {
          const result = values.slice(0, -1);
          values = result;
          document.querySelector(".current-price").textContent =
            convertCurrency(Number(values));
        }
      }
      if (value !== "backspace" && !values.endsWith(",")) {
        values += value;
        document.querySelector(".current-price").textContent = convertCurrency(
          Number(values)
        );
      }
    });
  });
  // back to home
  document.querySelector(".icon-back-page").addEventListener("click", () => {
    sectionDeposit.style.display = "none";
    document.querySelector(".header").style.display = "block";
    document.querySelector(".section-crypto-currencies").style.display = "block";
    values = "";
    document.querySelector(".current-price").textContent = "0,00";
  });
  // show 
  document.querySelector(".select-currency").addEventListener("click", () => {
    document.querySelectorAll(".select-currency li:not(.select)").forEach(li => {
      if ((li.style.display === "block")) li.style.display = "none";
      else li.style.display = "block";
    });
    // if ((document.querySelector(".select-currency li").style.display === "block"))
    //   document.querySelector(".select-currency li").style.display = "none";
    // else document.querySelector(".select-currency li").style.display = "block";
  })
}
