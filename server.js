const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
