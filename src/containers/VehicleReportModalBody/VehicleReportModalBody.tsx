import Close from "@/assets/svgIcons/Close";
import classes from "./VehicleReportModalBody.module.css";
import ReportCard from "@/components/ReportCard/ReportCard";
import Road from "@/assets/svgIcons/Road";
import Speed from "@/assets/svgIcons/Speed";
import Park from "@/assets/svgIcons/Park";
import Gas from "@/assets/svgIcons/Gas";
import { useMemo } from "react";
import { statsOverviewType } from "@/utilities/types";
import moment from "moment";
import { capitalize } from "@/helpers/capitalize";

type VehicleReportModalBodyType = {
  onClose?: () => void;
  carId?: string | number;
  data: any;
};

const VehicleReportModalBody = ({
  onClose,
  carId,
  data,
}: VehicleReportModalBodyType) => {
  const carStats: statsOverviewType = useMemo(
    () => data?.find((info: any) => String(info?.carId) === String(carId)),
    [data, carId]
  );

  console.log(carStats, "Data", data);

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Tracker Report</h2>

      <div className={classes.body}>
        <div className={classes.stats}>
          <h4>Overview</h4>
          <ReportCard
            icon={<Road />}
            quantity="Total Mileage(km)"
            value={carStats?.mileage}
          />
          <ReportCard
            icon={<Speed />}
            quantity="Total Overspeed(times)"
            value={carStats?.overSpeedCount}
          />
          <ReportCard
            icon={<Park />}
            quantity="Total Stop(times)"
            value={carStats?.stopCount}
          />
          <ReportCard
            icon={<Gas />}
            quantity="Total Oil(litres)"
            value={carStats?.fuelConsumptionSum}
          />
        </div>

        <div className={classes.info}>
          <h4>More Information</h4>
          <div>
            <h4>Date</h4>
            <p>{moment().format("Do MMMM, YYYY")}</p>
          </div>

          <div>
            <h4>Device Name</h4>
            <p>{capitalize(carStats?.machineName || "No device name")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleReportModalBody;
