import api from "./api";

export default class AuthApi {
  static async login(body) {
    return api.post("/login", body);
  }

  static async register(body) {
    console.log(process.env.REACT_APP_API);
    return api.post("/register", body);
  }
}
