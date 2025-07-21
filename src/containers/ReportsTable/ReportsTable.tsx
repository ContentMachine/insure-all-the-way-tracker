import CustomTable from "@/components/CustomTable/CustomTable";
import classes from "./ReportsTable.module.css";
import { useState } from "react";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { modalGenericType } from "@/utilities/types";
import Modal from "@/components/Modal/Modal";
import VehicleHistoryDateModalBody from "../VehicleHistoryDateModalBody/VehicleHistoryDateModalBody";
import VehicleReportModalBody from "../VehicleReportModalBody/VehicleReportModalBody";

const headers = ["Device Name", "Mileage(km)", "Speeding", "Parking(times)"];

const data = [
  {
    deviceName: "Toyota Corolla",
    mileage: "1km",
    speeding: 2,
    parking: 1,
  },
  {
    deviceName: "Toyota Corolla",
    mileage: "1km",
    speeding: 2,
    parking: 1,
  },
  {
    deviceName: "Toyota Corolla",
    mileage: "1km",
    speeding: 2,
    parking: 1,
  },
  {
    deviceName: "Toyota Corolla",
    mileage: "1km",
    speeding: 2,
    parking: 1,
  },
];

const ReportsTable = () => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    reportDate: false,
    report: false,
  });

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

      {modals?.report && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleReportModalBody
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
      )}
      <section className={classes.container}>
        <CustomTable
          header="Report"
          data={data}
          fields={["deviceName", "mileage", "speeding", "parking"]}
          headers={headers}
          onRowClick={() => setModalTrue(setModals, "reportDate")}
        />
      </section>
    </>
  );
};

export default ReportsTable;
