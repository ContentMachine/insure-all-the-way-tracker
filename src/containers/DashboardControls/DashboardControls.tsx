import Close from "@/assets/svgIcons/Close";
import classes from "./DashboardControls.module.css";
import Button from "@/components/Button/Button";
import VehicleRow from "../../components/VehicleRow/VehicleRow";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { modalGenericType } from "@/utilities/types";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import VehicleDetailsModalBody from "../VehicleDetailsModalBody/VehicleDetailsModalBody";
import VehicleHistoryDateModalBody from "../VehicleHistoryDateModalBody/VehicleHistoryDateModalBody";
import VehicleHistoryVideoPlaybackModalBody from "../VehicleHistoryVideoPlaybackModalBody/VehicleHistoryVideoPlaybackModalBody";
import VehicleReportModalBody from "../VehicleReportModalBody/VehicleReportModalBody";
import DeativateVehicleModalBody from "../DeativateVehicleModalBody/DeativateVehicleModalBody";

const DashboardControls = () => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    vehicleDetails: false,
    vehicleHistoryDate: false,
    vehicleHistory: false,
    vehicleGeofencing: false,
    reportDate: false,
    report: false,
    share: false,
    deactivate: false,
  });

  //   Utils
  const options = [
    {
      title: "Vehicle Details",
      onClick: () => setModalTrue(setModals, "vehicleDetails"),
    },
    {
      title: "View Vehicle History",
      onClick: () => setModalTrue(setModals, "vehicleHistoryDate"),
    },
    {
      title: "Vehicle Geofencing",
      onClick: () => setModalTrue(setModals, "vehicleHistoryDate"),
    },
    { title: "Report", onClick: () => setModalTrue(setModals, "reportDate") },
    {
      title: "Deactivate Vehicle",
      onClick: () => setModalTrue(setModals, "deactivate"),
      properties: ["isAlert"],
    },
  ];

  return (
    <>
      {modals?.vehicleDetails && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleDetailsModalBody
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
      )}

      {modals?.vehicleHistoryDate && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleHistoryDateModalBody
              onClose={() => setAllModalsFalse(setModals)}
              onClick={() => {
                setAllModalsFalse(setModals);
                setModalTrue(setModals, "vehicleHistory");
              }}
            />
          }
        />
      )}

      {modals?.vehicleHistory && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <VehicleHistoryVideoPlaybackModalBody
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
      )}

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

      {modals?.deactivate && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <DeativateVehicleModalBody
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
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
        {/* <Button
          type="delete"
          onClick={() => setModalTrue(setModals, "deactivate")}
        >
          Deactivate this device
        </Button> */}
      </section>
    </>
  );
};

export default DashboardControls;
