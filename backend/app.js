const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const corsOption = {
  origin: "*",
};

app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const Registration = require("./routes/registrationRoute");
app.use("/api/v1", Registration);

const errMiddleware = require("./middleware/error");
app.use(errMiddleware);

module.exports = app;
