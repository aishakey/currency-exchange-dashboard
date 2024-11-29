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
  limit = 10,
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
