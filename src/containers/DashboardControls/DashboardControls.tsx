import Close from "@/assets/svgIcons/Close";
import classes from "./DashboardControls.module.css";
import Button from "@/components/Button/Button";
import More from "@/assets/svgIcons/More";
import VehicleRow from "../VehicleRow/VehicleRow";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { modalGenericType } from "@/utilities/types";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";

const DashboardControls = () => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    vehicleDetails: false,
    vehicleHistory: false,
    vehicleGeofencing: false,
    report: false,
    share: false,
  });

  //   Utils
  const options = [
    {
      title: "Vehicle Details",
      onClick: () => setModalTrue(setModals, "vehicleDetails"),
    },
    { title: "View Vehicle History", onClick: () => {} },
    { title: "Vehicle Geofencing", onClick: () => {} },
    { title: "Report", onClick: () => {} },
    { title: "Share", onClick: () => {} },
  ];

  return (
    <>
      {modals?.vehicleDetails && (
        <Modal onClick={() => setAllModalsFalse(setModals)} />
      )}

      {modals?.vehicleHistory && (
        <Modal onClick={() => setAllModalsFalse(setModals)} />
      )}
      <section className={classes.container}>
        <div>
          <div className={classes.header}>
            <h4>Monitor Tracked Devices</h4>
            <Close />
          </div>

          <div className={classes.vehicles}>
            <h4>Vehicles</h4>
            <VehicleRow options={options} />
            <VehicleRow options={options} />
            <VehicleRow options={options} />
            <VehicleRow options={options} />
          </div>
        </div>
        <Button type="delete">Deactivate this device</Button>
      </section>
    </>
  );
};

export default DashboardControls;
