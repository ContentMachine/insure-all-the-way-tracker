"use client";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import ReportStats from "../ReportStats/ReportStats";
import classes from "./Report.module.css";
import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import ReportsTable from "../ReportsTable/ReportsTable";
import { useState } from "react";
import { requestType, vehicleType } from "@/utilities/types";
import useError from "@/hooks/useError";
import { getUserVehicles } from "@/services/api";
import { TOKEN, USER_ID } from "@/config";
import Loader from "@/components/Loader/Loader";

const Report = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [vehicleState, setVehicleState] = useState<vehicleType[]>([]);

  // Hooks
  const { errorFlowFunction } = useError();

  // Requests
  const handleGetUserVehicles = async () => {
    setRequestState({ isLoading: true, data: null, error: null });
    try {
      const response = await getUserVehicles({
        UserId: USER_ID as string,
        token: TOKEN as string,
      });

      setRequestState((prevState) => {
        return { ...prevState, data: response?.data?.data };
      });
      setVehicleState(
        response?.data?.data?.map((data, i) => {
          if (i === 0) {
            return { ...data, isActive: true };
          }
          return { ...data, isActive: false };
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

  return (
    <DashboardLayout header="Reports" className={classes.container}>
      <GreetingComponent />

      {!requestState?.isLoading ? (
        <Loader />
      ) : (
        <>
          <ReportStats />
          <ReportsTable />
        </>
      )}
    </DashboardLayout>
  );
};

export default Report;
