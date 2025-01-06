import React, { useEffect, useState } from "react";
import { getCurrencyNews } from "../services/api.js";

function CurrencyNews() {
  const [news, setNews] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getCurrencyNews();
        setNews(response.news);
        setLastUpdated(response.lastUpdated);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching currency news:", err.message);
        setError("Failed to load news. Please try again later.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Currency News
      </h2>
      <p className="text-gray-500 text-sm mb-2">
        Last Updated:{" "}
        {lastUpdated ? new Date(lastUpdated).toLocaleString() : "N/A"}
      </p>
      <ul>
        {news.map((article, index) => (
          <li key={index} className="mb-4">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:underline"
            >
              {article.title}
            </a>
            <p className="text-gray-600 text-sm">
              {article.source} -{" "}
              {new Date(article.published).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrencyNews;
