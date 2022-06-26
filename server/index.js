require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("autoCreate", false);
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const candidatesRouter = require("./routes/candidates");
const companiesRouter = require("./routes/companies");
const reportsRouter = require("./routes/reports");
const authRouter = require("./routes/auth");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token je: ", token);

  if (!token && req.method !== "GET")
    return res.status(401).json({ message: "No bearer token was supplied." });

  token &&
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err)
        return res.status(403).json({ message: "Web token was malformed." });

      req.jwt = payload;
    });
    next();
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("server hit", req.body);
  next();
});
app.use("/candidates", authenticateToken, candidatesRouter);
app.use("/companies", authenticateToken, companiesRouter);
app.use("/reports", authenticateToken, reportsRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  res.status(500);
  console.log("error: ,", err);
  res.json({ message: err.toString() });
});

// // start a server
mongoose.connect(process.env.DB_CONNECTION, () => {
  app.listen(4000, () => console.log("Server listening on port: 4000"));
});
