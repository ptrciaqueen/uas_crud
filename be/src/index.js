require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
const { sequelize } = require("./models");
const router = require("./api/router");
const corsOptions = require("./config/cors");

app.use(cors(corsOptions));
app.use(logger("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// static file
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`);
  await sequelize.authenticate();
  console.log(`DB server running and connected`);
});
