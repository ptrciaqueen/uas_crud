import api from "./api";

export default class AuthApi {
  static async login(body) {
    return api.post("/login", body);
  }

  static async register(body) {
    return api.post("/register", body);
  }
}
