import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";
import historicalRoutes from "./routes/historical.js";

const app = express();
const PORT = 5000;

app.use(cors());

app.use("/api", apiRoutes);
app.use("/api", historicalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
