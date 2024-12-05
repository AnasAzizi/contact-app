import axios from "axios";
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: "https://ms.itmd-b1.com:5123/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token =  Cookies.get("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;