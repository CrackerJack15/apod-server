const express = require("express");
const mongoose = require("mongoose");
const app = express();
const helmet = require("helmet");
require("dotenv").config();

app.use(express.json());

// Temp
const cors = require("cors");
app.use(cors());

// Security
app.use(helmet());

// Routers
const dayRouter = require("./routes/days.router");

// API
app.use("/api/v1", dayRouter);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.z3hyh1i.mongodb.net/APOD`,
  () => console.log("Connected"),
  (error) => console.log(error)
);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
