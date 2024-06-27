const { Users } = require("../../models");

const getUserByQuery = async (query) => {
  return await Users.findOne({
    where: query,
  });
};

const createUser = async (data) => {
  return await Users.create(data);
};

module.exports = { getUserByQuery, createUser };
