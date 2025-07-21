import CustomTable from "@/components/CustomTable/CustomTable";
import classes from "../ReportsTable/ReportsTable.module.css";
import { useState } from "react";
import {
  modalGenericType,
  vehicleDataWithStatus,
  vehicleTableDataTyoe,
} from "@/utilities/types";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import VehicleDetailsModalBody from "../VehicleDetailsModalBody/VehicleDetailsModalBody";

interface Props {
  data: vehicleDataWithStatus[];
}

const headers = [
  "Device Name",
  "SIM Card Number",
  "Model",
  "Status",
  "Activity Time",
];

const DevicesTable: React.FC<Props> = ({ data }) => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    info: false,
  });
  const [selectedVehicle, setSelectedVehicle] =
    useState<null | vehicleDataWithStatus>(null);

  return (
    <>
      {modals?.info && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleDetailsModalBody
              onClose={() => setAllModalsFalse(setModals)}
              data={selectedVehicle as vehicleDataWithStatus}
            />
          }
        />
      )}

      <section className={classes.container}>
        <CustomTable
          header="Devices"
          data={data}
          fields={[
            "deviceName",
            "simCard",
            "model",
            "status",
            "lastActivityTime",
          ]}
          headers={headers}
          onRowClick={(data: any) => {
            setSelectedVehicle(data);
            setModalTrue(setModals, "info");
          }}
        />
      </section>
    </>
  );
};

export default DevicesTable;
