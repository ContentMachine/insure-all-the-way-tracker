import { LOCAL_STORAGE_AUTH_KEY } from "@/utilities/constants";
import axios from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  }
};

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((axiosConfig) => {
  if (!navigator.onLine) {
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
    if (!(response?.data as any)?.code || !(response?.data as any)?.msg) {
      return response;
    } else {
      // if (navigator?.onLine) {
      //   throw new Error("Please check your internet connection");
      // }

      throw new Error(response?.data?.msg);
    }
  },
  async (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
