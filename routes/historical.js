import express from "express";
import { getYearlyExchangeRates } from "../src/services/api.js";

const router = express.Router();

router.get("/yearly-exchange-rate", async (req, res) => {
  const { base, target } = req.query;

  try {
    const yearlyData = await getYearlyExchangeRates(base, target);

    if (!yearlyData) {
      return res.status(500).json({ error: "Failed to retrieve yearly data." });
    }

    res.json(yearlyData);
  } catch (error) {
    console.error("Error fetching yearly exchange rates:", error);
    res.status(500).json({ error: "Failed to fetch yearly exchange rates." });
  }
});

export default router;
