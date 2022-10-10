const express = require("express");
const app = express();
const cors = require("cors");
const dataRoute = require("./routes/data.route");

// Middleware
app.use(express.json());
app.use(cors());

// Testing API
app.get("/", (req, res) => {
  res.send(`==== Your app is running successfully ====`);
});

// Data Route
app.use("/api/v1/data", dataRoute);

// Unknown API Handle
app.all("*", (req, res) => {
  res.send(`==== Requested Route Not Found ====`);
});

module.exports = app;
