//Separarte logic for graph-related code

const express = require("express");
const { getHistoricalExchangeRatesFromAPI } = require("../services/historical");

const router = express.Router();

router.get("/historical-exchange-rate", async (req, res) => {
  const { base, target } = req.query;

  try {
    const historicalData = await getHistoricalExchangeRatesFromAPI(
      base,
      target
    );

    if (!historicalData) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve historical data." });
    }

    res.json(historicalData);
  } catch (error) {
    console.error("Error fetching historical exchange rates:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch historical exchange rates." });
  }
});

module.exports = router;
