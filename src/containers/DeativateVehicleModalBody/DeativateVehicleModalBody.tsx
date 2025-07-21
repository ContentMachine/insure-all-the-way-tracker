import Button from "@/components/Button/Button";
import classes from "./DeativateVehicleModalBody.module.css";

type DeativateVehicleModalBodyTypes = {
  onClose?: () => void;
};

const DeativateVehicleModalBody = ({
  onClose,
}: DeativateVehicleModalBodyTypes) => {
  return (
    <div className={classes.container}>
      <h3>Deactivate this vehicle?</h3>
      <p>
        We’ll pause tracking for now. Your dashboard and history will remain
        unchanged.
      </p>

      <div className={classes.buttonSection}>
        <Button type="invalid" onClick={onClose}>
          Cancel
        </Button>
        <Button type="delete">Deactivate</Button>
      </div>
    </div>
  );
};

export default DeativateVehicleModalBody;
