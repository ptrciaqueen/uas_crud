require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

const decodeToken = async (token) => {
  const res = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const { id, username } = res;
  return { id, username };
};

module.exports = { generateToken, decodeToken };
