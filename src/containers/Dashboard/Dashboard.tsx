"use client";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import classes from "./Dashboard.module.css";
import DashboardControls from "../DashboardControls/DashboardControls";
import { useEffect, useState } from "react";
import { requestType, vehicleType } from "@/utilities/types";
import { getUserVehicles } from "@/services/api";
import useError from "@/hooks/useError";
import ArrowForward from "@/assets/svgIcons/ArrowForward";
import dynamic from "next/dynamic";
import { getToken, getUserId } from "@/helpers/authHelpers";

// Dynamic imports
const DashboardMapContainer = dynamic(
  () => import("../DashboardMapContainer/DashboardMapContainer"),
  { ssr: false }
);

const Dashboard = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [vehicleState, setVehicleState] = useState<vehicleType[]>([]);
  const [showControls, setShowControls] = useState(true);

  // Hooks
  const { errorFlowFunction } = useError();

  // Helper
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

  // Effects
  useEffect(() => {
    handleGetUserVehicles();
  }, []);

  return (
    <>
      <DashboardLayout className={classes.container} header="Dashboard">
        <DashboardMapContainer />
        <DashboardControls
          vehicles={vehicleState}
          setVehicles={setVehicleState}
          requestState={requestState}
          show={showControls}
          setShow={setShowControls}
        />
        <div
          className={classes.arrow}
          style={showControls ? { translate: "-60px" } : { translate: "0px" }}
          onClick={() => setShowControls(true)}
        >
          <ArrowForward />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
