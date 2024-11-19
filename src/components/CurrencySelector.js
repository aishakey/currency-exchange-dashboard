import React, { useEffect, useState } from "react";
import { getCurrencies } from "../services/api.js";

function CurrencySelector({ selectedCurrency, onCurrencyChange }) {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
    };
    fetchCurrencies();
  }, []);

  return (
    <select
      className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
      value={selectedCurrency}
      onChange={(e) => onCurrencyChange(e.target.value)}
    >
      <option value="">Select Currency</option>
      {currencies.map((currency) => (
        <option key={currency.id} value={currency.currency_code}>
          {currency.currency_name} ({currency.currency_code})
        </option>
      ))}
    </select>
  );
}

export default CurrencySelector;
