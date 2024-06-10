const API_KEY =
  "19718a9ed4d37246d63a91247ad10cebf2209c712f7d279a08b679612d895b8a";

async function fetchCryptoPrices() {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,MANA&tsyms=USD,EUR&api_key={${API_KEY}}`
    );
    const data = await response.json();
    // console.log(data);
    return data.DISPLAY;
  } catch (err) {
    console.error("Erro ao buscar a lista de criptomoedas.");
  }
}
export const cryptoCurrencies = Object.entries(await fetchCryptoPrices());