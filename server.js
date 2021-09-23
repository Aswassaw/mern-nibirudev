const express = require("express");
const connectDB = require("./config/db");
const config = require("config");

const app = express();

// Connecting Database
// connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Root endpoint
app.get("/", (req, res) => res.send("Hello World"));

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
  console.log(`Developed by ${config.get("author")}`);
});
