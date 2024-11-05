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
    const { conversion_rates } = data;

    const currencies = Object.keys(conversion_rates).map((code) => ({
      currency_code: code,
      currency_name: code,
    }));

    const exchangeRates = Object.entries(conversion_rates).map(
      ([code, rate]) => ({
        baseCurrencyCode: BASE_CURRENCY,
        targetCurrencyCode: code,
        rate: rate,
      })
    );

    console.log("Currencies:", currencies);
    console.log("Exchange Rates:", exchangeRates);
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fetchExchangeRates();
