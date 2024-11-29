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
  const { base, limit = 10, offset = 0, search } = req.query;

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

export default router;
