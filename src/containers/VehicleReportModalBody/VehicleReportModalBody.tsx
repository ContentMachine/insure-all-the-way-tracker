import Close from "@/assets/svgIcons/Close";
import classes from "./VehicleReportModalBody.module.css";
import ReportCard from "@/components/ReportCard/ReportCard";
import Road from "@/assets/svgIcons/Road";
import Speed from "@/assets/svgIcons/Speed";
import Park from "@/assets/svgIcons/Park";
import Gas from "@/assets/svgIcons/Gas";

type VehicleReportModalBodyType = {
  onClose?: () => void;
};

const VehicleReportModalBody = ({ onClose }: VehicleReportModalBodyType) => {
  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Tracker Report</h2>

      <div className={classes.body}>
        <div className={classes.stats}>
          <h4>Overview</h4>
          <ReportCard icon={<Road />} quantity="Total Mileage(km)" />
          <ReportCard icon={<Speed />} quantity="Total Overspeed(times)" />
          <ReportCard icon={<Park />} quantity="Total Stop(times)" />
          <ReportCard icon={<Gas />} quantity="Total Oil(litres)" />
        </div>

        <div className={classes.info}>
          <h4>More Information</h4>
          <div>
            <h4>Date</h4>
            <p>Test</p>
          </div>

          <div>
            <h4>Mileage(km)</h4>
            <p>Test</p>
          </div>

          <div>
            <h4>Overspeeding Setting</h4>
            <p>120 km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleReportModalBody;
