import axios from "axios";

const API_URL = "http://localhost:5000/api";
const EXTERNAL_API_URL = "https://api.exchangeratesapi.io/v1";
const HISTORICAL_API_KEY = process.env.HISTORICAL_RATE_API;

export const getCurrencies = async () => {
  try {
    const response = await axios.get(`${API_URL}/currencies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return [];
  }
};

export const getExchangeRate = async (base, target) => {
  try {
    const response = await axios.get(`${API_URL}/exchange-rate`, {
      params: { base, target },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
};

export const getYearlyExchangeRates = async (base, target) => {
  try {
    const startYear = 2000;
    const currentYear = new Date().getFullYear();

    const yearlyData = [];

    console.log(`Fetching yearly data for ${base} to ${target}...`);

    for (let year = startYear; year <= currentYear; year++) {
      const formattedDate = `${year}-01-01`; // First day of each year
      const url = `${EXTERNAL_API_URL}/${formattedDate}`;

      // Fetch data for the specific year
      const response = await axios.get(url, {
        params: {
          access_key: HISTORICAL_API_KEY, // Use the historical API key
          base: base,
          symbols: target,
        },
      });

      // Check and process response
      if (response.data && response.data.rates && response.data.rates[target]) {
        yearlyData.push({
          date: formattedDate,
          rate: response.data.rates[target],
        });
      } else {
        console.log(`No rate data found for ${formattedDate}`);
      }
    }

    console.log("Yearly data fetched successfully:", yearlyData);
    return yearlyData;
  } catch (error) {
    console.error("Error fetching yearly exchange rates from API:", error);
    return null; // Return null if an error occurs
  }
};
