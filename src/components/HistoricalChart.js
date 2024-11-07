import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getHistoricalExchangeRates } from "../services/api";

function HistoricalChart({ baseCurrency, targetCurrency }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (baseCurrency && targetCurrency) {
        const data = await getHistoricalExchangeRates(
          baseCurrency,
          targetCurrency
        );

        if (data && data.length > 0) {
          setChartData({
            labels: data.map((entry) => entry.date), // X-axis dates
            datasets: [
              {
                label: `Exchange Rate (${baseCurrency} to ${targetCurrency})`,
                data: data.map((entry) => entry.rate), // Y-axis rates
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.1, // Smooth curve for line
              },
            ],
          });
        }
      }
    };

    fetchHistoricalData();
  }, [baseCurrency, targetCurrency]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Exchange Rate",
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Historical Exchange Rate
      </h2>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-gray-500">
          Select currencies to view historical data.
        </p>
      )}
    </div>
  );
}

export default HistoricalChart;
