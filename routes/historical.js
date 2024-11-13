//Separarte logic for graph-related code

const express = require("express");
const { getHistoricalExchangeRates } = require("../src/services/historical");

const router = express.Router();

router.get("/historical-exchange-rate", async (req, res) => {
  const { base, target } = req.query;

  try {
    const historicalData = await getHistoricalExchangeRates(base, target);

    if (!historicalData) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve historical data." });
    }
    console.log("Historical data:", historicalData); // Log data for verification

    res.json(historicalData);
  } catch (error) {
    console.error("Error fetching historical exchange rates:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch historical exchange rates." });
  }
});

module.exports = router;
