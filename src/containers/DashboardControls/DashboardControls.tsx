"use client";

import Close from "@/assets/svgIcons/Close";
import classes from "./DashboardControls.module.css";
import VehicleRow from "../../components/VehicleRow/VehicleRow";
import { Dispatch, SetStateAction } from "react";
import { requestType, vehicleType } from "@/utilities/types";

import Loader from "@/components/Loader/Loader";
import { activeToggler } from "@/helpers/activeHandlers";

type DashboardControlsType = {
  vehicles: vehicleType[];
  setVehicles: Dispatch<SetStateAction<vehicleType[]>>;
  requestState: requestType;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const DashboardControls = ({
  vehicles,
  requestState,
  setVehicles,
  show,
  setShow,
}: DashboardControlsType) => {
  return (
    <>
      <section
        className={`${classes.container} hide-scrollbar`}
        style={
          show
            ? {
                translate: "0px",
              }
            : { translate: "-420px" }
        }
      >
        <div>
          <div className={classes.header}>
            <h4>Monitor Tracked Devices</h4>
            <Close
              onClick={() => {
                setShow(!show);
              }}
            />
          </div>

          <div className={classes.vehicles}>
            <h4>Vehicles</h4>
            {requestState?.isLoading ? (
              <Loader />
            ) : (
              vehicles?.map((data, i) => {
                return (
                  <VehicleRow
                    key={data?.carId}
                    data={data}
                    onClick={() => {
                      activeToggler(i, vehicles, setVehicles);
                    }}
                    isActive={data?.isActive as boolean}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardControls;
