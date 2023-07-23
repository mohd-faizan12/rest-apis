const express = require("express");
const mongoose = require("mongoose");
const route = require("./api/route/user");
const bodyParser = require("body-parser");
const EmailServices = require("./services/emailServices");
const app = express();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.url);

mongoose.connection.on("error", (error) => {
  console.log("connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("Connected to db");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/registration", route, EmailServices);
app.use((req, res, next) => {
  res.status(200).json({
    msg: "server has been started",
  });
});

app.listen(8000, () => {
  console.log("Server is listening on port number 8000");
});
