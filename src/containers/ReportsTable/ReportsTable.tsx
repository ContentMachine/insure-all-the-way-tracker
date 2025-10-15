import CustomTable from "@/components/CustomTable/CustomTable";
import classes from "./ReportsTable.module.css";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import {
  dateRequestType,
  modalGenericType,
  navItemTypes,
  requestType,
  vehicleType,
} from "@/utilities/types";
import Modal from "@/components/Modal/Modal";
import VehicleHistoryDateModalBody from "../VehicleHistoryDateModalBody/VehicleHistoryDateModalBody";
import VehicleReportModalBody from "../VehicleReportModalBody/VehicleReportModalBody";
import SectionsNav from "@/components/SectionsNav/SectionsNav";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import moment from "moment";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { MAX_DATE_FILTER, TODAY } from "@/utilities/constants";
import { getToken, getUserId } from "@/helpers/authHelpers";
import {
  getUser,
  getUserVehicles,
  getVehicleMileagereport,
  getVehicleSpeedOrFuelReport,
  getVehicleStopReport,
  getVehicleTravelStats,
} from "@/services/api";
import useError from "@/hooks/useError";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Loader from "@/components/Loader/Loader";

interface Props {
  dates: dateRequestType;
  setDates: Dispatch<SetStateAction<dateRequestType>>;
}

const headers = {
  "mileage-report": [
    "Day",
    "Mileage (KM)",
    "Fuel Consumption (Litres)",
    "Stop Count (Count)",
  ],
  "stop-report": [
    "Stop Start Date",
    "Stop End Date",
    "Stop Duration",
    "Latitude",
    "Longitude",
  ],
  "speed-report": [
    "Stop Start Date",
    "Stop End Date",
    "Stop Duration",
    "Latitude",
    "Longitude",
  ],
  "travel-statistics": [
    "Stop Start Date",
    "Stop End Date",
    "Stop Duration",
    "Latitude",
    "Longitude",
  ],
};

const fields = {
  "mileage-report": ["day", "mileage", "fuelConsumptionSum", "stopCount"],
  "stop-report": ["startTime", "endTime", "stopTime", "lon", "lat"],
  "speed-report": ["startTime", "endTime", "stopTime", "lon", "lat"],
  "travel-statistics": ["startTime", "endTime", "stopTime", "lon", "lat"],
};

const ReportsTable: React.FC<Props> = ({ dates, setDates }) => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    reportDate: false,
    report: false,
  });

  const [showDateSelector, setSHowDateSelector] = useState(false);
  const [navItems, setNavItems] = useState<navItemTypes[]>([
    {
      title: "Mileage Report",
      isActive: true,
      id: "mileage-report",
    },
    {
      title: "Stop Report",
      isActive: false,
      id: "stop-report",
    },
    {
      title: "Travel Statistics",
      isActive: false,
      id: "travel-statistics",
    },
    {
      title: "Speed Report",
      isActive: false,
      id: "speed-report",
    },
  ]);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Hooks
  const { errorFlowFunction } = useError();
  const { updateSearchParams } = useUpdateSearchParams();
  const carId = updateSearchParams("carId", undefined, "get");

  // Memos
  const activeNav: navItemTypes | undefined = useMemo(() => {
    return navItems.find((data) => data?.isActive);
  }, [navItems]);

  // Ref
  const dateSelectorRef = useRef<HTMLDivElement>(null);

  // Requests
  const handleGetMileageReport = async () => {
    setRequestState({
      isLoading: true,
      data: null,
      error: null,
      id: "mileage-report",
    });

    try {
      const response = await getVehicleMileagereport({
        carId: carId as string,
        startTime: moment(dates?.startTime).format("YYYY-MM-DD:HH:mm:ss"),
        endTime: moment(dates?.endTime).format("YYYY-MM-DD:HH:mm:ss"),
        token: getToken() as string,
      });

      if (response) {
        setRequestState((prevState) => {
          return {
            ...prevState,
            data: response?.data?.data,
            id: "mileage-report",
          };
        });
        setAllModalsFalse(setModals);
        setModalTrue(setModals, "report");
      }
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false, id: "mileage-report" };
      });
    }
  };

  const handleGetStopReport = async () => {
    setRequestState({
      isLoading: true,
      data: null,
      error: null,
      id: "stop-report",
    });

    try {
      const response = await getVehicleStopReport({
        carId: carId as string,
        startTime: moment(dates?.startTime).format("YYYY-MM-DD:HH:mm:ss"),
        endTime: moment(dates?.endTime).format("YYYY-MM-DD:HH:mm:ss"),
        token: getToken() as string,
      });

      if (response) {
        setRequestState((prevState) => {
          return {
            ...prevState,
            data: response?.data?.data,
            id: "stop-report",
          };
        });
      }
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false, id: "stop-report" };
      });
    }
  };

  const handleGetSpeedReport = async () => {
    setRequestState({
      isLoading: true,
      data: null,
      error: null,
      id: "stop-report",
    });

    try {
      const response = await getVehicleSpeedOrFuelReport({
        carId: carId as string,
        startTime: moment(dates?.startTime).format("YYYY-MM-DD:HH:mm:ss"),
        endTime: moment(dates?.endTime).format("YYYY-MM-DD:HH:mm:ss"),
        token: getToken() as string,
      });

      if (response) {
        setRequestState((prevState) => {
          return {
            ...prevState,
            data: response?.data?.data,
            id: "speed-report",
          };
        });
      }
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false, id: "speed-report" };
      });
    }
  };

  const handleGetTravelReport = async () => {
    setRequestState({
      isLoading: true,
      data: null,
      error: null,
      id: "stop-report",
    });

    try {
      const response = await getVehicleTravelStats({
        carId: carId as string,
        startTime: moment(dates?.startTime).format("YYYY-MM-DD:HH:mm:ss"),
        endTime: moment(dates?.endTime).format("YYYY-MM-DD:HH:mm:ss"),
        token: getToken() as string,
      });

      if (response) {
        setRequestState((prevState) => {
          return {
            ...prevState,
            data: response?.data?.data,
            id: "speed-report",
          };
        });
      }
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false, id: "speed-report" };
      });
    }
  };

  // Effects
  useEffect(() => {
    if (activeNav?.id === navItems?.[0]?.id && carId && getToken()) {
      handleGetMileageReport();
    }

    if (activeNav?.id === navItems?.[1]?.id && carId && getToken()) {
      handleGetStopReport();
    }

    if (activeNav?.id === navItems?.[3]?.id && carId && getToken()) {
      handleGetSpeedReport();
    }

    if (activeNav?.id === navItems?.[2]?.id && carId && getToken()) {
      handleGetTravelReport();
    }
  }, [navItems, carId, getToken(), dates]);

  useEffect(() => {
    const handleClearDateRef = (e: MouseEvent) => {
      if (
        dateSelectorRef.current &&
        !dateSelectorRef?.current?.contains(e.target as Node)
      ) {
        setSHowDateSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClearDateRef);

    return () => {
      document.removeEventListener("mousedown", handleClearDateRef);
    };
  }, []);

  return (
    <>
      {modals?.reportDate && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleHistoryDateModalBody
              onClose={() => setAllModalsFalse(setModals)}
              hasEndDate
              onClick={() => {
                setAllModalsFalse(setModals);
                setModalTrue(setModals, "report");
              }}
            />
          }
        />
      )}

      <section className={classes.container}>
        <div className={classes.filterSection}>
          <SectionsNav navItems={navItems} setNavItems={setNavItems} />

          <Button
            type="bordered"
            onClick={() => setSHowDateSelector((prevState) => !prevState)}
          >
            Select Date Range
          </Button>

          {showDateSelector && (
            <div className={classes.dateSection} ref={dateSelectorRef}>
              <h4>Select Date Range</h4>
              <Input
                type="date"
                label="Start Date"
                value={dates.startTime as string}
                name="startTime"
                onChange={(e) => inputChangeHandler(e, setDates)}
                max={TODAY}
                min={MAX_DATE_FILTER}
              />
              <Input
                type="date"
                label="End Date"
                value={dates.endTime as string}
                name="endTime"
                onChange={(e) => inputChangeHandler(e, setDates)}
                max={TODAY}
                min={MAX_DATE_FILTER}
              />
              <Button disabled={!dates?.startTime || !dates?.endTime}>
                Select
              </Button>
            </div>
          )}
        </div>

        {requestState?.isLoading ? (
          <Loader />
        ) : (
          <CustomTable
            header={activeNav?.title as string}
            data={requestState?.data}
            fields={
              fields[
                activeNav?.id as
                  | "mileage-report"
                  | "stop-report"
                  | "speed-report"
              ]
            }
            headers={
              headers[
                activeNav?.id as
                  | "mileage-report"
                  | "stop-report"
                  | "speed-report"
              ]
            }
            onRowClick={() => setModalTrue(setModals, "reportDate")}
          />
        )}
      </section>
    </>
  );
};

export default ReportsTable;
