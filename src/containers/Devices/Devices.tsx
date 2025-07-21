"use client";

import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import DevicesStats from "../DevicesStats/DevicesStats";
import DevicesTable from "../DevicesTable/DevicesTable";
import classes from "../Report/Report.module.css";
import { useEffect, useMemo, useState } from "react";
import {
  requestType,
  vehicleDataWithStatus,
  vehicleTableStatsType,
} from "@/utilities/types";
import useError from "@/hooks/useError";
import { getUserVehicles, getVehicleDataAndStatus } from "@/services/api";
import { TOKEN, USER_ID } from "@/config";
import Loader from "@/components/Loader/Loader";
import { capitalize } from "@/helpers/capitalize";
import moment from "moment";

const Devices = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Hooks
  const { errorFlowFunction } = useError();

  // Requests
  const handleGetUserVehiclesWithAllStatuses = async () => {
    setRequestState({ isLoading: true, data: null, error: null });

    try {
      const vehiclesResponse = await getUserVehicles({
        UserId: USER_ID as string,
        token: TOKEN as string,
      });

      const vehicleList = vehiclesResponse?.data?.data || [];

      if (vehicleList.length === 0) {
        setRequestState((prev) => ({ ...prev, data: [] }));
        return;
      }

      const statusRequests = vehicleList.map((vehicle) =>
        getVehicleDataAndStatus({
          carId: String(vehicle.carId),
          mapType: "2",
          token: TOKEN as string,
        }).then((res) => ({
          carId: vehicle.carId,
          status: res?.data?.data,
        }))
      );

      const statusResults = await Promise.all(statusRequests);

      const updatedVehicles = vehicleList.map((vehicle, index) => {
        const statusObj = statusResults.find((s) => s.carId === vehicle.carId);
        return {
          ...vehicle,
          isActive: index === 0,
          ...(statusObj?.status || null),
        };
      });

      setRequestState((prev) => ({
        ...prev,
        data: updatedVehicles,
      }));
    } catch (error) {
      errorFlowFunction(error);
      setRequestState((prev) => ({
        ...prev,
        error: error || "Something went wrong",
      }));
    } finally {
      setRequestState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const tableData: vehicleDataWithStatus[] = useMemo(() => {
    if (requestState?.data) {
      return requestState?.data?.map((data: any, i: number) => {
        return {
          deviceName: capitalize(data?.machineName),
          simCard: data?.simNO,
          model: "R16",
          status: data?.carStatus?.online === 1 ? "Online" : "Offline",
          lastActivityTime: moment(data?.carStatus?.pointTime).format(
            "Do MMMM, YYYY"
          ),
          ...requestState?.data[i],
        };
      });
    }
  }, [requestState?.data]);

  const tableDataStatistics: vehicleTableStatsType | undefined = useMemo(() => {
    if (requestState?.data) {
      const allDevices = requestState?.data?.length;
      const offlineDevices = requestState?.data?.filter(
        (data: any) => data?.carStatus?.online !== 1
      )?.length;
      const onlineDevices = allDevices - offlineDevices;

      const isTrackerExpired = (serviceTime: string): boolean => {
        const now = new Date();
        const expiryDate = new Date(serviceTime);
        return now > expiryDate;
      };

      const expiredDevices = requestState?.data?.filter((data: any) =>
        isTrackerExpired(data)
      )?.length;

      return { allDevices, offlineDevices, onlineDevices, expiredDevices };
    }
  }, [requestState?.data]);

  // Effects
  useEffect(() => {
    handleGetUserVehiclesWithAllStatuses();
  }, []);

  return (
    <DashboardLayout header="Vehicles" className={classes.container}>
      <GreetingComponent />

      {requestState?.isLoading ? (
        <Loader />
      ) : (
        <>
          <DevicesStats data={tableDataStatistics as vehicleTableStatsType} />
          <DevicesTable data={tableData} />
        </>
      )}
    </DashboardLayout>
  );
};

export default Devices;
