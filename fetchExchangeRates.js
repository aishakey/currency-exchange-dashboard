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
      currency_name: code, //Placeholder
    }));

    await Promise.all(
      currencies.map(async (currency) => {
        await prisma.currency.upsert({
          where: { currency_code: currency.currency_code },
          update: {},
          create: {
            currency_code: currency.currency_code,
            currency_name: currency.currency_name,
          },
        });
      })
    );

    const exchangeRates = Object.entries(conversion_rates).map(
      ([code, rate]) => ({
        baseCurrencyCode: BASE_CURRENCY,
        targetCurrencyCode: code,
        rate: rate,
      })
    );

    await Promise.all(
      exchangeRates.map(
        async ({ baseCurrencyCode, targetCurrencyCode, rate }) => {
          const baseCurrency = await prisma.currency.findUnique({
            where: { currency_code: baseCurrencyCode },
          });
          const targetCurrency = await prisma.currency.findUnique({
            where: { currency_code: targetCurrencyCode },
          });

          await prisma.exchangeRate.upsert({
            where: {
              baseCurrencyId_targetCurrencyId: {
                baseCurrencyId: baseCurrency.id,
                targetCurrencyId: targetCurrency.id,
              },
            },
            update: { rate: rate, rate_date: new Date() },
            create: {
              rate: rate,
              rate_date: new Date(),
              baseCurrencyId: baseCurrency.id,
              targetCurrencyId: targetCurrency.id,
            },
          });
        }
      )
    );

    console.log("Database updated with latest exchange rates.");
  } catch (error) {
    console.error("Error updating the database:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fetchExchangeRates();
