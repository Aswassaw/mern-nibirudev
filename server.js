const express = require("express");
const connectDB = require("./config/db");
const config = require("config");

const app = express();

// Connecting Database
connectDB();

app.use("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
  console.log(`Developed by ${config.get("author")}`);
});
