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
    <div className="bg-white shadow-lg rounded-lg p-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">Exchange Rate</h2>
      {exchangeRate ? (
        <p className="text-xl text-gray-600 mt-2">
          1 {baseCurrency} = {exchangeRate} {targetCurrency}
        </p>
      ) : (
        <p className="text-gray-500">
          Select currencies to see the exchange rate
        </p>
      )}
    </div>
  );
}

export default ExchangeRateDisplay;
