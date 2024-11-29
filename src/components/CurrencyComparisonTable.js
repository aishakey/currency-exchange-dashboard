import React, { useState, useEffect } from "react";
import { getComparisonTable } from "../services/api.js";

function CurrencyComparisonTable({ baseCurrency }) {
  const [rates, setRates] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getComparisonTable(baseCurrency, limit, 0, search);
      setRates(data);
    };

    fetchData();
  }, [baseCurrency, limit, search]);

  return (
    <div className="bg-white shadow-lg rounded-lg m-10 p-4 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Currency Comparison Table
      </h2>
      <input
        type="text"
        placeholder="Search currency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded"
      />
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Currency</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.target}>
              <td className="px-4 py-2 border">{rate.target}</td>
              <td className="px-4 py-2 border">{rate.targetName}</td>
              <td className="px-4 py-2 border">{rate.rate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rates.length === limit && (
        <button
          onClick={() => setLimit((prevLimit) => prevLimit + 10)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default CurrencyComparisonTable;
