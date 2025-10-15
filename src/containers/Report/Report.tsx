"use client";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import ReportStats from "../ReportStats/ReportStats";
import classes from "./Report.module.css";
import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import ReportsTable from "../ReportsTable/ReportsTable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  dateRequestType,
  navItemTypes,
  requestType,
  vehicleType,
} from "@/utilities/types";
import useError from "@/hooks/useError";
import { getUserVehicles } from "@/services/api";
import Loader from "@/components/Loader/Loader";
import { getToken, getUserId } from "@/helpers/authHelpers";
import SectionsNav from "@/components/SectionsNav/SectionsNav";
import { capitalize } from "@mui/material";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { MAX_DATE_FILTER, TODAY } from "@/utilities/constants";

const Report = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [dates, setDates] = useState<dateRequestType>({
    startTime: MAX_DATE_FILTER,
    endTime: TODAY,
  });
  const [vehicleState, setVehicleState] = useState<vehicleType[]>([]);

  // Hooks
  const { errorFlowFunction } = useError();
  const { updateSearchParams } = useUpdateSearchParams();
  const carId = updateSearchParams("carId", undefined, "get");

  // Requests
  const handleGetUserVehicles = async () => {
    setRequestState({ isLoading: true, data: null, error: null });
    try {
      const response = await getUserVehicles({
        UserId: getUserId() as string,
        token: getToken() as string,
      });

      setRequestState((prevState) => {
        return { ...prevState, data: response?.data?.data };
      });
      setVehicleState(
        response?.data?.data?.map((data, i) => {
          if (i === 0) {
            return {
              ...data,
              isActive: true,
              id: String(data?.carId),
              title: capitalize(data?.machineName) || "No title",
            };
          }
          return {
            ...data,
            isActive: false,
            id: String(data?.carId),
            title: capitalize(data?.machineName) || "No title",
          };
        })
      );
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  // Effects
  useEffect(() => {
    if (getUserId() && getToken()) {
      handleGetUserVehicles();
    }
  }, [getToken(), getUserId()]);

  useEffect(() => {
    if (!carId && vehicleState?.length > 0) {
      updateSearchParams("carId", String(vehicleState?.[0]?.carId), "set");
    }
  }, [vehicleState, carId]);

  return (
    <DashboardLayout header="Reports" className={classes.container}>
      <GreetingComponent />

      {requestState?.isLoading ? (
        <Loader />
      ) : (
        <>
          <SectionsNav
            navItems={vehicleState as navItemTypes[]}
            setNavItems={
              setVehicleState as Dispatch<SetStateAction<navItemTypes[]>>
            }
            isRoute
            id="carId"
          />
          <ReportStats dates={dates} setDates={setDates} />
          <ReportsTable dates={dates} setDates={setDates} />
        </>
      )}
    </DashboardLayout>
  );
};

export default Report;
