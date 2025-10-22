"use client";

import More from "@/assets/svgIcons/More";
import classes from "../../containers/DashboardControls/DashboardControls.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import {
  modalGenericType,
  requestType,
  vehicleHistoryStatusRequestBodyType,
  vehicleType,
} from "@/utilities/types";
import { capitalize } from "@/helpers/capitalize";
import {
  getVehicleDailyReport,
  getVehicleDataAndStatus,
  getVehicleHistory,
  getVehicleMileagereport,
} from "@/services/api";
import useError from "@/hooks/useError";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { formatRelativeTime } from "@/helpers/timeHandlers";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import Modal from "../Modal/Modal";
import VehicleDetailsModalBody from "@/containers/VehicleDetailsModalBody/VehicleDetailsModalBody";
import VehicleHistoryDateModalBody from "@/containers/VehicleHistoryDateModalBody/VehicleHistoryDateModalBody";
import VehicleReportModalBody from "@/containers/VehicleReportModalBody/VehicleReportModalBody";
import DeativateVehicleModalBody from "@/containers/DeativateVehicleModalBody/DeativateVehicleModalBody";
import { CircularProgress } from "@mui/material";
import { getToken } from "@/helpers/authHelpers";
import dynamic from "next/dynamic";
import { AuthContext } from "@/context/AuthContext";
import moment from "moment";
import { PARENT_ID } from "@/config";

// Dynamic imports
const VehicleHistoryVideoPlaybackModalBody = dynamic(
  () =>
    import(
      "@/containers/VehicleHistoryVideoPlaybackModalBody/VehicleHistoryVideoPlaybackModalBody"
    ),
  { ssr: false }
);

type VehicleRowType = {
  data: vehicleType;
  onClick: () => void;
  isActive: boolean;
};

const VehicleRow = ({ data, onClick, isActive }: VehicleRowType) => {
  // States
  const [showOptions, setShowOptions] = useState(false);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    error: null,
    data: null,
    id: "",
  });
  const [vehicleStatusRequestState, setVehicleStatusRequestState] =
    useState<requestType>({ isLoading: false, data: null, error: null });
  const [modals, setModals] = useState<modalGenericType>({
    vehicleDetails: false,
    vehicleHistoryDate: false,
    vehicleHistory: false,
    vehicleGeofencing: false,
    reportDate: false,
    report: false,
    share: false,
    deactivate: false,
  });
  const [vehicleDates, setVehicleDates] =
    useState<vehicleHistoryStatusRequestBodyType>({
      startTime: "",
      endTime: "",
    });
  const [reportType, setReportType] = useState("");

  // Ref
  const optionsRef = useRef<HTMLDivElement | null>(null);

  // Hooks
  const { errorFlowFunction } = useError();
  const { updateConcurrentSearchParams } = useUpdateSearchParams();

  // Context
  const { user } = useContext(AuthContext);

  // Requests
  const handleGetvehicleStatusInfo = async () => {
    setVehicleStatusRequestState({
      isLoading: true,
      data: null,
      error: null,
      id: "vehicle-status",
    });

    try {
      const response = await getVehicleDataAndStatus({
        carId: String(data?.carId),
        mapType: "2",
        token: getToken() as string,
      });

      if (response) {
        setVehicleStatusRequestState((prevState) => {
          return { ...prevState, data: response?.data?.data };
        });
      }
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setVehicleStatusRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  const handleGetVehicleHistory = async () => {
    setRequestState({
      isLoading: true,
      data: null,
      error: null,
      id: "vehicle-history",
    });

    try {
      const response = await getVehicleHistory({
        carId: String(data?.carId),
        startTime: moment(vehicleDates?.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        endTime: moment(vehicleDates?.endTime).format("YYYY-MM-DD HH:mm:ss"),
        token: getToken() as string,
        filter: false,
      });

      if (response) {
        setRequestState((prevState) => {
          return { ...prevState, data: response?.data?.data };
        });

        setAllModalsFalse(setModals);
        setModalTrue(setModals, "vehicleHistory");
      }
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  const handleGetvehicleReport = async () => {
    setRequestState({
      isLoading: true,
      data: null,
      error: null,
      id: "vehicle-report",
    });

    try {
      const response = await getVehicleDailyReport({
        userId: user?.userId,
        startTime: moment(vehicleDates?.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        endTime: moment(vehicleDates?.endTime).format("YYYY-MM-DD HH:mm:ss"),
        token: getToken() as string,
        rowCount: 20,
        pageNO: 1,
      });

      if (response) {
        setRequestState((prevState) => {
          return {
            ...prevState,
            data: response?.data?.data,
            id: "overall-report",
          };
        });
        setAllModalsFalse(setModals);
        setModalTrue(setModals, "report");
      }
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  // Utils
  const options = [
    {
      title: "Vehicle Details",
      onClick: () => setModalTrue(setModals, "vehicleDetails"),
    },
    {
      title: "View Vehicle History",
      onClick: () => setModalTrue(setModals, "vehicleHistoryDate"),
    },

    {
      title: "Generate Vehicle Report",
      onClick: () => setModalTrue(setModals, "reportDate"),
    },
    {
      title: "Deactivate Vehicle",
      onClick: () => setModalTrue(setModals, "deactivate"),
      properties: ["isAlert"],
    },
  ];

  //   Effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      const focusHandler = (e: any) => {
        if (optionsRef?.current && !optionsRef?.current?.contains(e?.target)) {
          setShowOptions(false);
        }
      };

      document.addEventListener("mousedown", focusHandler);

      return () => {
        document.removeEventListener("mousedown", focusHandler);
      };
    }
  }, []);

  useEffect(() => {
    if (data) {
      handleGetvehicleStatusInfo();
    }
  }, []);

  useEffect(() => {
    if (data?.isActive) {
      updateConcurrentSearchParams({
        longitude: {
          method: "set",
          value: vehicleStatusRequestState?.data?.carStatus?.lon,
        },

        latitude: {
          method: "set",
          value: vehicleStatusRequestState?.data?.carStatus?.lat,
        },
      });
    }
  }, [vehicleStatusRequestState?.data, isActive]);

  const handleCloseModalAndResetRequestState = (close?: boolean) => {
    setRequestState({
      isLoading: false,
      data: null,
      error: null,
      id: "",
    });

    if (close) {
      setAllModalsFalse(setModals);
    }
  };

  const rawMachineName = data?.machineName?.split("-");
  const capitalizedCarNumber = capitalize(rawMachineName[0]);
  const machineName = `${capitalizedCarNumber} ${rawMachineName[1]}`;

  return (
    <>
      {modals?.vehicleDetails && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleDetailsModalBody
              onClose={() => setAllModalsFalse(setModals)}
              data={vehicleStatusRequestState?.data as any}
            />
          }
        />
      )}

      {modals?.vehicleHistoryDate && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleHistoryDateModalBody
              onClose={() => setAllModalsFalse(setModals)}
              onClick={() => {
                handleGetVehicleHistory();
              }}
              date={vehicleDates}
              setDate={setVehicleDates}
              hasEndDate
              requestState={requestState}
            />
          }
        />
      )}

      {modals?.vehicleHistory && (
        <Modal
          onClick={() => {
            handleCloseModalAndResetRequestState(true);
          }}
          body={
            <VehicleHistoryVideoPlaybackModalBody
              onClose={() => setAllModalsFalse(setModals)}
              history={
                requestState?.id === "vehicle-history" && requestState?.data
              }
            />
          }
        />
      )}

      {modals?.reportDate && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleHistoryDateModalBody
              onClose={() => setAllModalsFalse(setModals)}
              hasEndDate
              onClick={() => {
                handleGetvehicleReport();
              }}
              date={vehicleDates}
              setDate={setVehicleDates}
              requestState={requestState}
              reportType={reportType}
              setReportType={setReportType}
            />
          }
        />
      )}

      {modals?.report && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleReportModalBody
              onClose={() => setAllModalsFalse(setModals)}
              carId={data?.carId}
              data={requestState?.id === "overall-report" && requestState?.data}
            />
          }
        />
      )}

      {modals?.deactivate && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <DeativateVehicleModalBody
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
      )}

      <div
        className={`${classes.vehicle} ${
          isActive ? classes.active : classes.inActive
        }`}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <h5>{machineName}</h5>
        {vehicleStatusRequestState?.isLoading ? (
          <span className={classes.loader}>
            <CircularProgress
              size="1rem"
              color="inherit"
              style={{ color: "#a7c7e7" }}
            />
          </span>
        ) : (
          <p>
            <span
              className={
                vehicleStatusRequestState?.data?.carStatus?.online === 1
                  ? classes.online
                  : classes.offline
              }
            ></span>
            <span>
              {formatRelativeTime(
                vehicleStatusRequestState?.data?.carStatus?.pointTime
              )}
            </span>
          </p>
        )}
        {!vehicleStatusRequestState?.isLoading && (
          <More onClick={() => setShowOptions(true)} />
        )}

        {showOptions && (
          <div className={classes.moreOptions} ref={optionsRef}>
            {options?.map((optionsData) => {
              return (
                <span
                  onClick={() => optionsData?.onClick()}
                  className={
                    optionsData?.properties?.includes("isAlert")
                      ? classes.alert
                      : undefined
                  }
                >
                  {optionsData?.title}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleRow;
