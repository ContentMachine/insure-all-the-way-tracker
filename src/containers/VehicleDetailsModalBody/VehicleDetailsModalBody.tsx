import Close from "@/assets/svgIcons/Close";
import classes from "./VehicleDetailsModalBody.module.css";

type VehicleDetailsModalBodyTypes = {
  onClose?: () => void;
};

const VehicleDetailsModalBody = ({ onClose }: VehicleDetailsModalBodyTypes) => {
  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Vehicle Information</h2>

      <div></div>
    </div>
  );
};

export default VehicleDetailsModalBody;
