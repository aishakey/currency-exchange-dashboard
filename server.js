const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const historicalRoutes = require("./routes/historical");

const app = express();
const PORT = 5000;

app.use(cors());

app.use("/api", apiRoutes);
app.use("/api", historicalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
