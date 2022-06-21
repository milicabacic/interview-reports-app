require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("autoCreate", false);
const bodyParser = require("body-parser");


const candidatesRouter = require("./routes/candidates");
const companiesRouter = require("./routes/companies");



const app = express();
app.use(bodyParser.json());
app.use("/candidates", authenticateToken, candidatesRouter);
app.use("/companies", authenticateToken, companiesRouter);

app.use((err, req, res, next) => {
  res.status(500);
  console.log("error: ,", err);
  res.json({ message: err.toString() });
});

// // start a server
mongoose.connect(process.env.DB_CONNECTION, () => {
  app.listen(3000, () => console.log("Server listening on port: 3000"));
});
