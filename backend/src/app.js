const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweet.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Sweets API is running" });
});

module.exports = app;
