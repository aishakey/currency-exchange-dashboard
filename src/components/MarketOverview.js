import React, { useEffect, useState } from "react";
import { getMarketOverview } from "../services/api.js";

function MarketOverview({ baseCurrency }) {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMarketOverview(baseCurrency);
      setOverview(data);
    };

    fetchData();
  }, [baseCurrency]);

  if (!overview) {
    return <p>Loading market overview...</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Market Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg font-semibold text-gray-700">
            Total Currencies
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {overview.totalCurrencies}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg font-semibold text-gray-700">
            Most Volatile Currency
          </p>
          <p className="text-2xl font-bold text-red-500">
            {overview.mostVolatile.currency} ({overview.mostVolatile.change}%)
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg font-semibold text-gray-700">
            Most Stable Currency
          </p>
          <p className="text-2xl font-bold text-green-500">
            {overview.mostStable.currency} ({overview.mostStable.change}%)
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg font-semibold text-gray-700">
            Average Rate Change
          </p>
          <p className="text-2xl font-bold text-blue-500">
            {overview.averageChange}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketOverview;
