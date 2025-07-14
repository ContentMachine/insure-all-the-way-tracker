"use client";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import classes from "./Dashboard.module.css";
import DashboardMapContainer from "../DashboardMapContainer/DashboardMapContainer";
import DashboardControls from "../DashboardControls/DashboardControls";
import { useTestWhatGps } from "@/hooks/useTracker";
import { useEffect, useMemo, useState } from "react";
import { requestType, vehicleType } from "@/utilities/types";
import { getUserVehicles } from "@/services/api";
import { TOKEN, USER_ID } from "@/config";
import useError from "@/hooks/useError";

const Dashboard = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [vehicleState, setVehicleState] = useState<vehicleType[]>([]);

  // Hooks
  const { errorFlowFunction } = useError();

  // Helper
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
      console.log(error);
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  // Memo
  const activeVehicle: vehicleType | undefined = useMemo(() => {
    return vehicleState?.find((data) => data?.isActive);
  }, [vehicleState]);

  // Effects
  useEffect(() => {
    handleGetUserVehicles();
  }, []);

  console.log(vehicleState, "Vehicle state");

  return (
    <>
      <DashboardLayout className={classes.container} header="Dashboard">
        <DashboardMapContainer />
        <DashboardControls
          vehicles={vehicleState}
          setVehicles={setVehicleState}
          requestState={requestState}
        />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
