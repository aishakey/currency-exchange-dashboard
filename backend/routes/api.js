import express from "express";
import prisma from "../utils/prismaClient.js";

const router = express.Router();

//Get all currencies
router.get("/currencies", async (req, res) => {
  try {
    const currencies = await prisma.currency.findMany({
      select: {
        currency_code: true,
        currency_name: true,
      },
    });
    res.json(currencies);
  } catch (error) {
    console.error("Error fetching currencies:", error);
    res.status(500).json({ error: "Error fetching currencies" });
  }
});

//Get exchange rate for a pair
router.get("/exchange-rate", async (req, res) => {
  const { base, target } = req.query;

  try {
    const exchangeRate = await prisma.exchangeRate.findFirst({
      where: {
        baseCurrency: { currency_code: base },
        targetCurrency: { currency_code: target },
      },
    });

    if (exchangeRate) {
      res.json(exchangeRate);
    } else {
      res.status(404).json({ error: "Exchange rate could not be found" });
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    res.status(500).json({ error: "Error fetching exchange rate" });
  }
});

//Fetch exchange rates for a base currency
router.get("/comparison-table", async (req, res) => {
  const { base, limit = 5, offset = 0, search } = req.query;

  try {
    const baseCurrency = await prisma.currency.findUnique({
      where: { currency_code: base },
    });

    if (!baseCurrency) {
      return res.status(404).json({ error: "Base currency not found" });
    }

    const exchangeRates = await prisma.exchangeRate.findMany({
      where: {
        baseCurrencyId: baseCurrency.id,
        ...(search && {
          targetCurrency: {
            currency_name: { contains: search, mode: "insensitive" },
          },
        }),
      },
      include: {
        targetCurrency: true,
      },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    const results = exchangeRates.map((rate) => ({
      target: rate.targetCurrency.currency_code,
      targetName: rate.targetCurrency.currency_name,
      rate: rate.rate,
    }));

    res.json(results);
  } catch (error) {
    console.error("Error fetching comparison table:", error.message);
    res.status(500).json({ error: "Error fetching comparison table" });
  }
});

//Fetch trending currencies
router.get("/trending-currencies", async (req, res) => {
  const { base, period = "24h", limit = 3 } = req.query;

  try {
    const baseCurrency = await prisma.currency.findUnique({
      where: { currency_code: base },
    });

    if (!baseCurrency) {
      return res.status(404).json({ error: "Base currency not found" });
    }

    const currentRates = await prisma.exchangeRate.findMany({
      where: { baseCurrencyId: baseCurrency.id },
      include: { targetCurrency: true },
    });

    const pastRates = await prisma.exchangeRate.findMany({
      where: {
        baseCurrencyId: baseCurrency.id,
        rate_date: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
      include: { targetCurrency: true },
    });

    const pastRateMap = pastRates.reduce((map, rate) => {
      map[rate.targetCurrency.currency_code] = rate.rate;
      return map;
    }, {});

    const trending = currentRates
      .map((currentRate) => {
        const pastRate = pastRateMap[currentRate.targetCurrency.currency_code];
        if (!pastRate) return null;

        const change = ((currentRate.rate - pastRate) / pastRate) * 100;
        return {
          currency: currentRate.targetCurrency.currency_code,
          name: currentRate.targetCurrency.currency_name,
          rate: currentRate.rate,
          change: change.toFixed(2),
        };
      })
      .filter(Boolean);

    trending.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));

    res.json(trending.slice(0, parseInt(limit)));
  } catch (error) {
    console.error("Error fetching trending currencies:", error.message);
    res.status(500).json({ error: "Error fetching trending currencies" });
  }
});

export default router;
