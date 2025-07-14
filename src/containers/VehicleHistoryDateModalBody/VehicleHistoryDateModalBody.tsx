import Close from "@/assets/svgIcons/Close";
import classes from "./VehicleHistoryDateModalBody.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useState } from "react";
import { requestType } from "@/utilities/types";

type VehicleHistoryDateModalBodyType = {
  onClose?: () => void;
  onClick?: () => void;
  hasEndDate?: boolean;
};

const VehicleHistoryDateModalBody = ({
  onClose,
  onClick,
  hasEndDate,
}: VehicleHistoryDateModalBodyType) => {
  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Select a Date</h2>
      <form>
        <Input type="date" label="Start Date" isRequired />
        {hasEndDate && <Input type="date" label="End Date" isRequired />}

        <Button onClick={onClick}>Submit</Button>
      </form>
    </div>
  );
};

export default VehicleHistoryDateModalBody;
