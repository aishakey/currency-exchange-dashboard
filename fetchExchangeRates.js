const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const BASE_CURRENCY = "USD";

async function fetchExchangeRates() {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${BASE_CURRENCY}`
    );
    const data = response.data;

    if (data.result !== "success") {
      throw new Error("Failed to fetch exchange rates");
    }

    console.log("Exchange rates fetched successfully:", data.conversion_rates);
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fetchExchangeRates();
