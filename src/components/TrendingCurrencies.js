import React, { useEffect, useState } from "react";
import { getTrendingCurrencies } from "../services/api.js";

function TrendingCurrencies({ baseCurrency }) {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrendingCurrencies(baseCurrency);
      setTrending(data);
    };

    fetchData();
  }, [baseCurrency]);

  const limitedTrending = trending.slice(0, 3);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Trending Currencies
      </h2>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Currency</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Rate</th>
            <th className="px-4 py-2 border">Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {limitedTrending.map((trend) => (
            <tr key={trend.currency}>
              <td className="px-4 py-2 border">{trend.currency}</td>
              <td className="px-4 py-2 border">{trend.name}</td>
              <td className="px-4 py-2 border">{trend.rate.toFixed(2)}</td>
              <td
                className={`px-4 py-2 border ${
                  trend.change > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.change}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrendingCurrencies;
