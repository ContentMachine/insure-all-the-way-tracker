import More from "@/assets/svgIcons/More";
import classes from "../../containers/DashboardControls/DashboardControls.module.css";
import { useEffect, useRef, useState } from "react";
import { requestType, vehicleType } from "@/utilities/types";
import { capitalize } from "@/helpers/capitalize";
import { getVehicleDataAndStatus } from "@/services/api";
import useError from "@/hooks/useError";
import { TOKEN } from "@/config";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

type VehicleRowType = {
  options: {
    title: string;
    onClick: (row?: unknown) => void;
    properties?: string[];
  }[];
  data: vehicleType;
  onClick: () => void;
  isActive: boolean;
};

const VehicleRow = ({ options, data, onClick, isActive }: VehicleRowType) => {
  // States
  const [showOptions, setShowOptions] = useState(false);
  const [requestState, setRequestState] = useState<requestType>({
    data: null,
    error: null,
    isLoading: false,
  });

  // Ref
  const optionsRef = useRef<HTMLDivElement | null>(null);

  // Hooks
  const { errorFlowFunction } = useError();
  const { updateConcurrentSearchParams } = useUpdateSearchParams();

  // Requests
  const handleGetvehicleStatusInfo = async () => {
    setRequestState({ isLoading: true, data: null, error: null });

    try {
      const response = await getVehicleDataAndStatus({
        carId: String(data?.carId),
        mapType: "2",
        token: TOKEN as string,
      });

      if (response) {
        console.log(response);
        setRequestState((prevState) => {
          return { ...prevState, data: response?.data?.data };
        });
      }
    } catch (error) {
      errorFlowFunction(error);

      console.log(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

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
  }, [data]);

  useEffect(() => {
    if (data?.isActive) {
      console.log("data is active", requestState);
      updateConcurrentSearchParams({
        longitude: {
          method: "set",
          value: requestState?.data?.carStatus?.lon,
        },

        latitude: {
          method: "set",
          value: requestState?.data?.carStatus?.lat,
        },
      });
    }
  }, [requestState?.data]);

  return (
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
      <h5>{capitalize(data?.machineName)}</h5>
      <p>
        <span
          className={
            requestState?.data?.carStatus?.online === 0
              ? classes.online
              : classes.offline
          }
        ></span>
        <span>now</span>
      </p>
      <More onClick={() => setShowOptions(true)} />

      {showOptions && (
        <div className={classes.moreOptions} ref={optionsRef}>
          {options?.map((data) => {
            return (
              <span
                onClick={() => data?.onClick(data)}
                className={
                  data?.properties?.includes("isAlert")
                    ? classes.alert
                    : undefined
                }
              >
                {data?.title}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VehicleRow;
