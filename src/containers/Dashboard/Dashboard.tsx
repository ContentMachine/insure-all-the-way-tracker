"use client";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import classes from "./Dashboard.module.css";
import DashboardControls from "../DashboardControls/DashboardControls";
import { useEffect, useState } from "react";
import { requestType, vehicleType } from "@/utilities/types";
import { getUserVehicles, getVehicleDataAndStatus } from "@/services/api";
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

  const handleFetchAllVehicleData = async () => {
    setRequestState({ isLoading: true, data: null, error: null });

    try {
      const vehiclesResponse = await getUserVehicles({
        UserId: getUserId() as string,
        token: getToken() as string,
      });

      const rawVehicles = vehiclesResponse?.data?.data || [];
      const vehicles = Array.isArray(rawVehicles)
        ? rawVehicles.filter((v) => v && v.carId)
        : [];

      const initialVehicles = vehicles.map((v, i) => ({
        ...v,
        status: null,
        hasStatusError: false,
        isActive: i === 0,
        isLoadingStatus: true,
      }));

      setVehicleState(initialVehicles as any);
      setRequestState({ isLoading: false, data: initialVehicles, error: null });

      for (const vehicle of vehicles) {
        try {
          const res = await getVehicleDataAndStatus({
            carId: String(vehicle.carId),
            mapType: "2",
            token: getToken() as string,
          });

          const status = res?.data?.data || null;

          setVehicleState((prev) =>
            prev.map((v) =>
              v.carId === vehicle.carId
                ? {
                    ...v,
                    status: status as any,
                    isLoadingStatus: false,
                    hasStatusError: false,
                  }
                : v
            )
          );
        } catch (err) {
          console.warn(`⚠️ Failed to get status for ${vehicle.carId}`, err);

          setVehicleState((prev) =>
            prev.map((v) =>
              v.carId === vehicle.carId
                ? {
                    ...v,
                    status: undefined,
                    isLoadingStatus: false,
                    hasStatusError: true,
                  }
                : v
            )
          );
        }
      }
    } catch (error) {
      errorFlowFunction(error);
      setRequestState({ isLoading: false, data: null, error });
    }
  };

  // Effects
  useEffect(() => {
    handleFetchAllVehicleData();
  }, []);

  return (
    <>
      <DashboardLayout className={classes.container} header="Dashboard">
        <DashboardMapContainer vehicles={vehicleState} />
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
