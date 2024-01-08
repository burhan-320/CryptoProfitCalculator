const container = document.querySelector(".container"),
  fromCurrency = document.getElementById("from-currency"),
  amount = document.getElementById("amount"),
  price = document.getElementById("price"),
  entryFee = document.getElementById("entry-fee"),
  sellPrice = document.getElementById("sell-price"),
  marketPrice = document.getElementById("Market-price"),
  selectMarketPrice = document.getElementById("SelectMarket-price"),
  exitFee = document.getElementById("exit-fee"),
  calculate = document.getElementById("calculate"),
  cryptoCurrency = document.getElementById("crypto-select"),
  profit = document.getElementById("profit");

//   Change Bg color

cryptoCurrency.addEventListener("change", function () {
  switch (cryptoCurrency.value) {
    case "BTC":
      container.style.background = "var(--btc-color)";
      container.style.color = "var(--dark-color)";
      getPrice("btc");
      break;
    case "ETH":
      container.style.background = "var(--eth-color)";
      container.style.color = "var(--light-color)";
      getPrice("eth");
      break;
    case "LTC":
      container.style.background = "var(--ltc-color)";
      container.style.color = "var(--dark-color)";
      getPrice("ltc");
      break;
    case "XRP":
      container.style.background = "var(--xrp-color)";
      container.style.color = "var(--light-color)";
      getPrice("xrp");
      break;
    case "UNI":
      container.style.background = "var(--uni-color)";
      container.style.color = "var(--light-color)";
      getPrice("uni");
      break;

    default:
      container.style.background = "var(--secondary-color)";
      container.style.color = "var(--dark-color)";
  }
});

// get price using api

async function getPrice(cryptoCurrency) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
    );
    const data = await res.json();

    const cryptoElement = data.find((ele) => ele.symbol === cryptoCurrency);
    document.querySelector("#Market-price").value = cryptoElement.current_price;

    return cryptoElement.current_price;
    // console.log(cryptoElement);
  } catch (error) {
    console.log(error);
  }
}

// ca; proft
calculate.addEventListener("click", function (e) {
  e.preventDefault();
  getValues();

  //   calculate

  // cal inv with fee

  const investmentWithFee = (amountValue * entryFeeValue) / 100;
  const units = (amountValue - investmentWithFee) / priceValue;
  const soldCurrency = units * sellPriceValue;
  const feeOfTheExitValue = (soldCurrency * exitFeeValue) / 100;
  const exitValue = soldCurrency - feeOfTheExitValue - investmentWithFee;

  const profitValue = exitValue - amountValue;
  const profitPercentage = (profitValue / amountValue) * 100;

  let profitLoss;

  if (profitValue > 0) {
    profitLoss = "profit";
  } else {
    profitLoss = "loss";
  }

  if (isNaN(profitValue, profitPercentage)) {
    profit.innerHTML = `<h2 class= "loss" > Complete all fields !</h2>`;
  } else {
    profit.innerHTML = `<h2 class=${profitLoss}> ${
      profitLoss.charAt(0).toUpperCase() + profitLoss.slice(1)
    }</h2>

    <div class=${profitLoss}>${profitValue.toFixed(
      2
    )} $ (${profitPercentage.toFixed(2)}%)</div>

    <h4>Initial investment</h4>
  <div class="primary">${amountValue.toFixed(2)} $</div>

    <h4>Buy fee</h4>
  <div class="primary">${investmentWithFee.toFixed(2)} $</div>

        <h4>Investment after fee</h4>
  <div class="primary">${amountValue - investmentWithFee.toFixed(2)} $</div>


  <h4>Crypto currency units</h4>
  <div class="primary">${units} ${cryptoCurrencyValue}</div>


  <h4>Sell Fee</h4>
  <div class="primary">${feeOfTheExitValue.toFixed(2)}</div>


 <h4>Total Fees</h4>
  <div class="primary">${(feeOfTheExitValue + investmentWithFee).toFixed(
    2
  )}</div>


  <h4>Total Exit Amount</h4>
  <div class="${profitLoss}">${exitValue.toFixed(2)}</div>


    `;
  }

  //   fade inn results
  profit.classList.add("fadeIn")(
    //   clear filed
    function () {
      amount.value = "";
      price.value = "";
      entryFee.value = "";
      sellPrice.value = "";
      exitFee.value = "";
    }
  )();
});

// get all values
function getValues() {
  return (
    (amountValue = parseFloat(amount.value)),
    (priceValue = parseFloat(price.value)),
    (entryFeeValue = parseFloat(entryFee.value)),
    (sellPriceValue = selectMarketPrice.checked
      ? marketPrice.value
      : parseFloat(sellPrice.value)),
    (exitFeeValue = parseFloat(exitFee.value)),
    (cryptoCurrencyValue = cryptoCurrency.value)
  );
}

// check price section

selectMarketPrice.addEventListener("change", function () {
  if (selectMarketPrice.checked === true) {
    sellPrice.disabled = true;
  } else {
    sellPrice.disabled = false;
  }
});
