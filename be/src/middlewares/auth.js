const jwt = require("../utils/jwt");
const userService = require("../api/users/users.service");
const ResponseHandler = require("../helpers/handler");

const auth = async (req, res, next) => {
  const response = new ResponseHandler(res);
  try {
    const bearer = req.headers["authorization"];
    if (!bearer) {
      return response.resp([], 401, "Unauthorized", 401);
    }
    console.log(req.headers["authorization"]);

    const token = bearer.split(" ")[1];
    if (!token) {
      return response.resp([], 401, "Unauthorized", 401);
    }
    console.log(token, "======== token");

    const { id, username } = await jwt.decodeToken(token);

    const query = {
      id,
      username,
    };

    const user = await userService.getUserByQuery(query);
    if (!user) {
      return response.resp([], 401, "Unauthorized", 401);
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return response.resp([], 400, err, 400);
  }
};

module.exports = { auth };
