import { BASE_API_URL } from "@/config";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";
import axios from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  }
};

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
    "Access-Control-Max-Age": 86400,
  },
});

axiosInstance.interceptors.request.use((axiosConfig) => {
  if (!navigator.onLine) {
    console.log(navigator?.onLine);

    console.log("This is a testtt");
    throw new Error("Please check your internet connection");
  }

  const token = getToken();

  if (token) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  }

  return axiosConfig;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.status === 200 || response?.status === 201) {
      return response;
    } else {
      if (navigator?.onLine) {
        throw new Error("Please check your internet connection");
      }

      throw new Error(response?.data?.error?.message);
    }
  },
  async (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
