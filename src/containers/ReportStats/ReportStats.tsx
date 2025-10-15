import Loader from "@/components/Loader/Loader";
import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import { AuthContext } from "@/context/AuthContext";
import { getToken } from "@/helpers/authHelpers";
import useError from "@/hooks/useError";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { getVehicleDailyReport } from "@/services/api";
import {
  dateRequestType,
  requestType,
  statsOverviewType,
} from "@/utilities/types";
import moment from "moment";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import classes from "./ReportStats.module.css";

interface Props {
  dates: dateRequestType;
  setDates: Dispatch<SetStateAction<dateRequestType>>;
}

const ReportStats: React.FC<Props> = ({ dates, setDates }) => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const carId = updateSearchParams("carId", undefined, "get");
  const { errorFlowFunction } = useError();

  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Context
  const { user } = useContext(AuthContext);

  // Requests
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
        startTime: moment(dates?.startTime).format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment(dates?.endTime).format("YYYY-MM-DD HH:mm:ss"),
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
      }
    } catch (error) {
      errorFlowFunction(error);
    } finally {
      setRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  const carData: statsOverviewType = useMemo(() => {
    return requestState?.data?.find(
      (data: any) => String(data?.carId) === String(carId)
    );
  }, [carId, requestState?.data]);

  useEffect(() => {
    if (dates && carId) {
      handleGetvehicleReport();
    }
  }, [dates]);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.container}>
      <PoliciesSummaryCard title="Device Amount" amount={0} notAmount />

      <PoliciesSummaryCard
        title="Total Milage "
        amount={carData?.mileage}
        notAmount
      />

      <PoliciesSummaryCard
        title="Total Oveespeed(times) "
        amount={carData?.overSpeedCount}
        notAmount
      />

      <PoliciesSummaryCard
        title="Total Stop(times) "
        amount={carData?.stopCount}
        notAmount
      />
    </section>
  );
};

export default ReportStats;
