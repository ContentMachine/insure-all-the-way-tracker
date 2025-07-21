import Close from "@/assets/svgIcons/Close";
import { capitalize } from "@/helpers/capitalize";
import { vehicleDataWithStatus } from "@/utilities/types";
import classes from "./VehicleDetailsModalBody.module.css";

type VehicleDetailsModalBodyTypes = {
  onClose?: () => void;
  data: vehicleDataWithStatus;
};

const VehicleDetailsModalBody = ({
  onClose,
  data,
}: VehicleDetailsModalBodyTypes) => {
  const {
    machineName,
    machineType,
    imei,
    simNO,
    iccid,
    carNO,
    joinTime,
    serviceTime,
  } = data || {};

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Tracker Information</h2>

      <div className={classes.body}>
        <h4>Device Information</h4>

        <div>
          <h4>Device Name</h4>
          <p>{capitalize(machineName || "No machine name")}</p>
        </div>

        <div>
          <h4>Model</h4>
          <p>{machineType || "No machine type"}</p>
        </div>

        <div>
          <h4>Device Number</h4>
          <p>{imei || "No device number"}</p>
        </div>

        <div>
          <h4>SIM Card</h4>
          <p>{simNO || "No sim card"}</p>
        </div>

        <div>
          <h4>ICCID</h4>
          <p>{iccid || "No ICCID"}</p>
        </div>

        <h4>Vehicle Information</h4>

        <div>
          <h4>Registration Number</h4>
          <p>{carNO || " No registration number"}</p>
        </div>

        <div>
          <h4>Phone</h4>
          <p>{simNO || " No phone number"}</p>
        </div>

        <div>
          <h4>Activation Date</h4>
          <p>{joinTime || "N/A"}</p>
        </div>

        <div>
          <h4>Expiry Date</h4>
          <p>{serviceTime || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModalBody;
