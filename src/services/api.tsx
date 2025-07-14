import {
  getUserRequestBodyType,
  getUserVehicleRequestBodyType,
  loginDataRequestBody,
  loginResponseType,
  vehicleDataWithStatus,
  vehicleStatusRequestBodyType,
  vehicleType,
} from "@/utilities/types";
import axiosInstance from ".";
import { ResponseType } from "@/utilities/types";

export const login = (data: loginDataRequestBody) => {
  return axiosInstance.post<ResponseType<loginResponseType>>(
    "/api/auth/login",
    JSON.stringify(data)
  );
};

export const getUser = (data: getUserRequestBodyType) => {
  return axiosInstance.post<ResponseType<loginResponseType>>(
    "/api/auth/me",
    JSON.stringify(data)
  );
};

export const getUserVehicles = (data: getUserVehicleRequestBodyType) => {
  return axiosInstance.post<ResponseType<vehicleType[]>>(
    "/api/vehicle/getVehicles",
    JSON.stringify(data)
  );
};

export const getVehicleDataAndStatus = (data: vehicleStatusRequestBodyType) => {
  return axiosInstance.post<ResponseType<vehicleDataWithStatus[]>>(
    "/api/vehicle/getVehicleStatsByCarId",
    JSON.stringify(data)
  );
};
