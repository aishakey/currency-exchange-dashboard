import React, { useState, useEffect } from "react";
import { getExchangeRate } from "../services/api.js";

function CurrencyConverter({ baseCurrency, targetCurrency }) {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchConvertedAmount = async () => {
      if (baseCurrency && targetCurrency) {
        const rateData = await getExchangeRate(baseCurrency, targetCurrency);
        if (rateData && rateData.rate) {
          setConvertedAmount((amount * rateData.rate).toFixed(2));
        }
      }
    };
    fetchConvertedAmount();
  }, [amount, baseCurrency, targetCurrency]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Currency Converter
      </h2>
      <div className="mb-4">
        <label className="block text-gray-600">Amount in {baseCurrency}:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <p className="text-gray-600">
          {amount} {baseCurrency} = {convertedAmount || "..."} {targetCurrency}
        </p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
