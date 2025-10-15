import {
  agentResponseType,
  getUserRequestBodyType,
  getUserVehicleRequestBodyType,
  loginDataRequestBody,
  loginResponseType,
  vehicleDataWithStatus,
  vehicleHistoryStatusRequestBodyType,
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

export const getUserAgent = (data: getUserRequestBodyType) => {
  return axiosInstance.post<ResponseType<agentResponseType>>(
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

export const getVehicleHistory = (
  data: vehicleHistoryStatusRequestBodyType
) => {
  return axiosInstance.post<ResponseType<any>>(
    "/api/vehicle/getVehicleTrackerHistory",
    JSON.stringify(data)
  );
};

export const getVehicleDailyReport = (
  data: vehicleHistoryStatusRequestBodyType
) => {
  return axiosInstance.post<ResponseType<any>>(
    "/api/vehicle/report/dailyReport",
    JSON.stringify(data)
  );
};

export const getVehicleDriverBehaviorReport = (
  data: vehicleHistoryStatusRequestBodyType
) => {
  return axiosInstance.post<ResponseType<any>>(
    "/api/vehicle/report/driverBehavior",
    JSON.stringify(data)
  );
};

export const getVehicleMileagereport = (
  data: vehicleHistoryStatusRequestBodyType
) => {
  return axiosInstance.post<ResponseType<any>>(
    "/api/vehicle/report/mileageReport",
    JSON.stringify(data)
  );
};

export const getVehicleSpeedOrFuelReport = (
  data: vehicleHistoryStatusRequestBodyType
) => {
  return axiosInstance.post<ResponseType<any>>(
    "/api/vehicle/report/speedOrFuelReport",
    JSON.stringify(data)
  );
};

export const getVehicleStopReport = (
  data: vehicleHistoryStatusRequestBodyType
) => {
  return axiosInstance.post<ResponseType<any>>(
    "/api/vehicle/report/stopReport",
    JSON.stringify(data)
  );
};

export const getVehicleTravelStats = (
  data: vehicleHistoryStatusRequestBodyType
) => {
  return axiosInstance.post<ResponseType<any>>(
    "/api/vehicle/report/travelReport",
    JSON.stringify(data)
  );
};
