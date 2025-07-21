import Close from "@/assets/svgIcons/Close";
import classes from "./VehicleHistoryDateModalBody.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { Dispatch, SetStateAction, useState } from "react";
import {
  requestType,
  vehicleHistoryStatusRequestBodyType,
} from "@/utilities/types";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import Dropdown from "@/components/Dropdown/Dropdown";

type VehicleHistoryDateModalBodyType = {
  onClose?: () => void;
  onClick?: () => void;
  hasEndDate?: boolean;
  date: vehicleHistoryStatusRequestBodyType;
  setDate: Dispatch<SetStateAction<vehicleHistoryStatusRequestBodyType>>;
  requestState: requestType;
  isReport?: boolean;
  reportType?: string;
  setReportType?: Dispatch<SetStateAction<string>>;
};

const reportTypes = [
  "Daily driving report",
  "Mileage summary",
  "Stop report",
  "Speed/fuel report",
  "Driving behavior",
];

const VehicleHistoryDateModalBody = ({
  onClose,
  onClick,
  hasEndDate,
  date,
  setDate,
  requestState,
  reportType,
  setReportType,
  isReport,
}: VehicleHistoryDateModalBodyType) => {
  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Select a Date</h2>
      <form>
        {isReport && (
          <Dropdown
            options={reportTypes}
            selected={reportType}
            setSelected={setReportType}
            label="Select a report type"
          />
        )}

        <Input
          type="date"
          label="Start Date"
          isRequired
          name="startTime"
          value={date.startTime}
          onChange={(e) => inputChangeHandler(e, setDate)}
        />
        {hasEndDate && (
          <Input
            type="date"
            label="End Date"
            isRequired
            name="endTime"
            value={date.endTime}
            onChange={(e) => inputChangeHandler(e, setDate)}
          />
        )}

        <Button
          disabled={!date?.startTime || (hasEndDate && !date?.endTime)}
          onClick={(e) => {
            e.preventDefault();
            if (onClick) onClick();
          }}
          loading={
            requestState?.isLoading &&
            (requestState?.id === "vehicle-history" ||
              requestState?.id === "vehicle-report")
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default VehicleHistoryDateModalBody;
