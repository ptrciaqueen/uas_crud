import axios from "axios";
import { toast } from "react-hot-toast";
import { getAccessTokenInfo } from "../lib/utils.js";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API,
});

instance.interceptors.request.use(
  (request) => {
    const access_token = getAccessTokenInfo();

    if (access_token) {
      if (request.headers && access_token) {
        request.headers["Authorization"] = "Bearer " + access_token;
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userData");
      localStorage.removeItem("access_token");
      window.location.href = "/";
      toast.error("Unauthorized");
    }
    return Promise.reject(error);
  },
);

export default instance;
