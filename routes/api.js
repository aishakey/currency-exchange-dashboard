const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

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

module.exports = router;
