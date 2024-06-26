require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
const { sequelize } = require("./models");

app.use(cors());
app.use(logger("dev"));

// static file
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/home", function(req,res) {
    return res.json({data: "Patricia Queen"})
 })
app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`);
  await sequelize.authenticate();
  console.log(`DB server running and connected`);
});