import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const prisma = prisma;

async function fetchExchangeRates() {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`
    );
    const data = response.data;

    if (data.result !== "success") {
      throw new Error("Failed to fetch exchange rates");
    }

    const { conversion_rates } = data;

    const exchangeRates = [];

    for (const [baseCode, baseRate] of Object.entries(conversion_rates)) {
      for (const [targetCode, targetRate] of Object.entries(conversion_rates)) {
        if (baseCode !== targetCode) {
          const rate = targetRate / baseRate;
          exchangeRates.push({
            baseCurrencyCode: baseCode,
            targetCurrencyCode: targetCode,
            rate,
          });
        }
      }
    }

    await Promise.all(
      exchangeRates.map(
        async ({ baseCurrencyCode, targetCurrencyCode, rate }) => {
          const baseCurrency = await prisma.currency.findUnique({
            where: { currency_code: baseCurrencyCode },
          });
          const targetCurrency = await prisma.currency.findUnique({
            where: { currency_code: targetCode },
          });

          if (baseCurrency && targetCurrency) {
            await prisma.exchangeRate.upsert({
              where: {
                baseCurrencyId_targetCurrencyId: {
                  baseCurrencyId: baseCurrency.id,
                  targetCurrencyId: targetCurrency.id,
                },
              },
              update: { rate, rate_date: new Date() },
              create: {
                rate,
                rate_date: new Date(),
                baseCurrencyId: baseCurrency.id,
                targetCurrencyId: targetCurrency.id,
              },
            });
          }
        }
      )
    );

    console.log("Database updated with all currency pair exchange rates.");
  } catch (error) {
    console.error("Error updating the database:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fetchExchangeRates();
