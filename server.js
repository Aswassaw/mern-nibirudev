const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const connectToDB = require("./api/v1/config/db");
const { AUTHOR, PORT, URI } = require("./api/v1/config/default");

const app = express();

// Menghubungkan ke database MongoDB
connectToDB();

// Menjalankan middleware yang dibutuhkan
app.use(express.json({ extended: false }));
app.use(morgan("dev"));

// Root endpoint
app.get("/", (req, res) =>
  res.send("Selamat Datang di Backend dari NibiruDev")
);

// Mendefinisikan Routes (Versi 1)
app.use("/v1/auth", require("./api/v1/routes/auth"));
app.use("/v1/user", require("./api/v1/routes/user"));
app.use("/v1/profile", require("./api/v1/routes/profile"));
app.use("/v1/posts", require("./api/v1/routes/posts"));

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(chalk`Visit {rgb(128, 237, 153) ${URI}}`);
  console.log(chalk`Developed by {rgb(255, 92, 88) ${AUTHOR}}`);
});
