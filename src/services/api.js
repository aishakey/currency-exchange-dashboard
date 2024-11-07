import axios from "axios";

const API_URL = "http://localhost:5000/api";

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

export const getHistoricalExchangeRates = async (base, target) => {
  try {
    const response = await axios.get(`${API_URL}/historical-exchange-rate`, {
      params: { base, target },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching historical exchange rates:", error);
    return [];
  }
};
