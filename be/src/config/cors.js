require("dotenv").config();

const whitelist = `${process.env.CORS_OPTIONS}`.split(",");

const corsOptions = {
  origin: [whitelist],
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
