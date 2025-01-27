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

export const getComparisonTable = async (
  base,
  limit = 5,
  offset = 0,
  search = ""
) => {
  try {
    const response = await axios.get(`${API_URL}/comparison-table`, {
      params: { base, limit, offset, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comparison table:", error);
    return [];
  }
};

export const getTrendingCurrencies = async (base, period = "24h") => {
  try {
    const response = await axios.get(`${API_URL}/trending-currencies`, {
      params: { base, period },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending currencies:", error);
    return [];
  }
};

export const getMarketOverview = async (base) => {
  try {
    const response = await axios.get(`${API_URL}/market-overview`, {
      params: { base },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching market overview:", error);
    return null;
  }
};

export const getCurrencyNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/currency-news`);
    return response.data;
  } catch (error) {
    console.error("Error fetching currency news:", error.message);
    throw error;
  }
};
