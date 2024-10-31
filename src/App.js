import React, { useState } from "react";
import CurrencySelector from "./components/CurrencySelector";
import ExchangeRateDisplay from "./components/ExchangeRateDisplay";
import ChartPlaceholder from "./components/ChartPlaceholder";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");

  return (
    <div>
      <h1>Currency Exchange Dashboard</h1>
      <div>
        <h2>Select Base Currency</h2>
        <CurrencySelector
          selectedCurrency={baseCurrency}
          onCurrencyChange={(currency) => setBaseCurrency(currency)}
        />
      </div>
      <div>
        <h2>Select Target Currency</h2>
        <CurrencySelector
          selectedCurrency={targetCurrency}
          onCurrencyChange={(currency) => setTargetCurrency(currency)}
        />
      </div>
      <ExchangeRateDisplay
        baseCurrency={baseCurrency}
        targetCurrency={targetCurrency}
      />
      <ChartPlaceholder />
    </div>
  );
}

export default App;
