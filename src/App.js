import React, { useState } from "react";
import CurrencySelector from "./components/CurrencySelector";
import ExchangeRateDisplay from "./components/ExchangeRateDisplay";
import ChartPlaceholder from "./components/ChartPlaceholder";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Currency Exchange Dashboard
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-start max-w-4xl w-full">
        {/* Base Currency Selector */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-700">
            Select Base Currency
          </h2>
          <CurrencySelector
            selectedCurrency={baseCurrency}
            onCurrencyChange={setBaseCurrency}
          />
        </div>

        {/* Target Currency Selector */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-700">
            Select Target Currency
          </h2>
          <CurrencySelector
            selectedCurrency={targetCurrency}
            onCurrencyChange={setTargetCurrency}
          />
        </div>
      </div>

      {/* Exchange Rate Display */}
      <div className="my-6 w-full max-w-md">
        <ExchangeRateDisplay
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrency}
        />
      </div>

      {/* Chart Placeholder */}
      <div className="w-full max-w-2xl">
        <ChartPlaceholder />
      </div>
    </div>
  );
}

export default App;
