const ResponseHandler = require("../../helpers/handler");
const service = require("./users.service");
const bcrypt = require("../../utils/bcrypt");
const jwt = require("../../utils/jwt");

const register = async (req, res) => {
  const response = new ResponseHandler(res);
  try {
    const query = {
      username: req.body.username,
    };
    const existed = await service.getUserByQuery(query);
    if (existed) {
      return response.resp([], 400, "User already registered", 400);
    }

    const hash = await bcrypt.hashPassword(req.body.password);
    const userData = {
      username: req.body.username,
      password: hash,
    };

    const user = await service.createUser(userData);
    if (!user) {
      return response.resp([], 400, "Failed create user", 400);
    }

    return response.resp(user);
  } catch (err) {
    console.log(err);
    return response.resp([], 400, err, 400);
  }
};

const login = async (req, res) => {
  const response = new ResponseHandler(res);
  try {
    const query = {
      username: req.body.username,
    };
    const registered = await service.getUserByQuery(query);
    if (!registered) {
      return response.resp([], 404, "User not registered yet", 404);
    }

    const compared = await bcrypt.comparePassword(
      registered.password,
      req.body.password,
    );
    if (!compared) {
      return response.resp([], 400, "Invalid password", 400);
    }

    const token = await jwt.generateToken(registered);
    if (!token) {
      return response.resp([], 400, "Failed generate token", 400);
    }
    req.session.token = token;
    res.cookie("username", query);

    return response.resp({ token, username: req.body.username });
  } catch (err) {
    console.log(err);
    return response.resp([], 400, err, 400);
  }
};

module.exports = { register, login };
