import React, { useEffect, useState } from "react";
import { getExchangeRate } from "../services/api";

function ExchangeRateDisplay({ baseCurrency, targetCurrency }) {
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (baseCurrency && targetCurrency) {
        const data = await getExchangeRate(baseCurrency, targetCurrency);
        setExchangeRate(data ? data.rate : "Not available");
      }
    };
    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  return (
    <div>
      <h2>Exchange Rate</h2>
      {exchangeRate ? (
        <p>
          1 {baseCurrency} = {exchangeRate} {targetCurrency}
        </p>
      ) : (
        <p>Select currencies to see the exchange rate</p>
      )}
    </div>
  );
}

export default ExchangeRateDisplay;
