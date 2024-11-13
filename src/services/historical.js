const axios = require("axios");

const API_URL = "https://api.exchangeratesapi.io/v1";
const API_KEY = process.env.HISTORICAL_RATE_API;

// Function to fetch historical exchange rates from the external API
const getHistoricalExchangeRates = async (base, target) => {
  try {
    const startDate = "2000-01-01"; // Fixed start date
    const endDate = new Date().toISOString().split("T")[0]; // Today's date as the end date

    const historicalData = [];

    // Loop through each date from startDate to endDate
    for (
      let date = new Date(startDate);
      date <= new Date(endDate);
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = date.toISOString().split("T")[0];

      // Call the API for each specific date
      const response = await axios.get(`${API_URL}/${formattedDate}`, {
        params: {
          access_key: API_KEY,
          base: base,
          symbols: target,
        },
      });

      // Check if data is available for the specified date
      if (response.data && response.data.rates && response.data.rates[target]) {
        historicalData.push({
          date: formattedDate,
          rate: response.data.rates[target],
        });
      }
    }

    return historicalData;
  } catch (error) {
    console.error(
      "Error fetching historical data from Exchange Rates API:",
      error
    );
    return null; // Return null to indicate an error
  }
};

module.exports = {
  getHistoricalExchangeRates,
};
