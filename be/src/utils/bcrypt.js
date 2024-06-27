const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (hash, password) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };
