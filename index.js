const currencySelect = document.getElementById("currency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");
const loader = document.getElementById("loader");

const apiURL = "https://api.nbp.pl/api/exchangerates/rates/a/";

convertBtn.addEventListener("click", () => {
  const currency = currencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Proszę wprowadzić poprawną kwotę.");
    return;
  }

  resultDiv.innerHTML = "";
  loader.classList.remove("hidden");

  fetch(`${apiURL}${currency}/?format=json`)
    .then((response) => {
      if (!response.ok) {
        alert("Nie udało się pobrać danych.");
      }
      return response.json();
    })
    .then((data) => {
      const rate = data.rates[0].mid;
      const result = (amount * rate).toFixed(2);
      loader.classList.add("hidden");
      resultDiv.innerHTML = `to ${result} PLN.`;
      resultDiv.style.color = "black";
    })
    .catch((error) => {
      loader.classList.add("hidden");
      resultDiv.innerHTML = "Wystąpił błąd: " + error.message;
      resultDiv.style.color = "red";
    });
});
