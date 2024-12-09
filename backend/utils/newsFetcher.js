import axios from "axios";
import cron from "node-cron";

let cachedNews = [];
let lastUpdated = null;

// Fetch Currency News Function
export const fetchCurrencyNews = async () => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: process.env.NEWS_API_KEY, // Store API key in .env
        category: "business",
        q: "currency OR forex OR finance",
        language: "en",
      },
    });

    // Format the news for frontend use
    cachedNews = response.data.results.map((article) => ({
      title: article.title,
      link: article.link,
      source: article.source_id,
      published: article.pubDate,
    }));
    lastUpdated = new Date();

    console.log("Currency news updated successfully!");
  } catch (error) {
    console.error("Error fetching currency news:", error.message);
  }
};

// Schedule Updates: Every 2 days at midnight
cron.schedule("0 0 */2 * *", fetchCurrencyNews);

// Fetch news immediately when the server starts
fetchCurrencyNews();

// Export cached data and last updated time
export const getCachedNews = () => ({
  lastUpdated,
  news: cachedNews,
});
