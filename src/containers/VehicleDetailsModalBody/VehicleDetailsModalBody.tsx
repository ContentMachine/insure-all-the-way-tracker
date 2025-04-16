import Close from "@/assets/svgIcons/Close";
import classes from "./VehicleDetailsModalBody.module.css";

type VehicleDetailsModalBodyTypes = {
  onClose?: () => void;
};

const VehicleDetailsModalBody = ({ onClose }: VehicleDetailsModalBodyTypes) => {
  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Tracker Information</h2>

      <div className={classes.body}>
        <h4>Device Information</h4>

        <div>
          <h4>Device Name</h4>
          <p>Test</p>
        </div>

        <div>
          <h4>Model</h4>
          <p>Test</p>
        </div>

        <div>
          <h4>Device Number</h4>
          <p>Test</p>
        </div>

        <div>
          <h4>SIM Card</h4>
          <p>Test</p>
        </div>

        <div>
          <h4>ICCID</h4>
          <p>Test</p>
        </div>

        <h4>Vehicle Information</h4>

        <div>
          <h4>Registration Number</h4>
          <p>Test</p>
        </div>

        <div>
          <h4>Phone</h4>
          <p>Test</p>
        </div>

        <div>
          <h4>Activation Date</h4>
          <p>Test</p>
        </div>

        <div>
          <h4>Expiry Date</h4>
          <p>Test</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModalBody;
