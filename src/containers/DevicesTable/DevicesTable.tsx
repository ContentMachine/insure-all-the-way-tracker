import CustomTable from "@/components/CustomTable/CustomTable";
import classes from "../ReportsTable/ReportsTable.module.css";
import { useState } from "react";
import { modalGenericType } from "@/utilities/types";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import VehicleDetailsModalBody from "../VehicleDetailsModalBody/VehicleDetailsModalBody";

const headers = ["Device Name", "SIM Card", "Model", "Status", "Activity Time"];

const data = [
  {
    deviceName: "Toyota Corolla",
    simCard: "+2347018898015",
    model: "R16",
    status: "online",
    activityTime: "2025-04-15",
  },
  {
    deviceName: "Toyota Corolla",
    simCard: "+2347018898015",
    model: "R16",
    status: "online",
    activityTime: "2025-04-15",
  },
  {
    deviceName: "Toyota Corolla",
    simCard: "+2347018898015",
    model: "R16",
    status: "online",
    activityTime: "2025-04-15",
  },
  {
    deviceName: "Toyota Corolla",
    simCard: "+2347018898015",
    model: "R16",
    status: "online",
    activityTime: "2025-04-15",
  },
];

const DevicesTable = () => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    info: false,
  });
  return (
    <>
      {modals?.info && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleDetailsModalBody
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
      )}

      <section className={classes.container}>
        <CustomTable
          header="Devices"
          data={data}
          fields={["deviceName", "simCard", "model", "status", "activityTime"]}
          headers={headers}
          onRowClick={() => setModalTrue(setModals, "info")}
        />
      </section>
    </>
  );
};

export default DevicesTable;
