import More from "@/assets/svgIcons/More";
import classes from "../DashboardControls/DashboardControls.module.css";
import { useEffect, useRef, useState } from "react";

type VehicleRowType = {
  options: { title: string; onClick: (row?: unknown) => void }[];
};

const VehicleRow = ({ options }: VehicleRowType) => {
  // States
  const [showOptions, setShowOptions] = useState(false);

  // Ref
  const optionsRef = useRef<HTMLDivElement | null>(null);

  //   Effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      const focusHandler = (e: any) => {
        if (optionsRef?.current && !optionsRef?.current?.contains(e?.target)) {
          setShowOptions(false);
        }
      };

      document.addEventListener("mousedown", focusHandler);

      return () => {
        document.removeEventListener("mousedown", focusHandler);
      };
    }
  }, []);

  return (
    <div className={classes.vehicle}>
      <h5>Benzo</h5>
      <p>
        <span></span>
        <span>now</span>
      </p>
      <More onClick={() => setShowOptions(true)} />

      {showOptions && (
        <div className={classes.moreOptions} ref={optionsRef}>
          {options?.map((data) => {
            return (
              <span onClick={() => data?.onClick(data)}>{data?.title}</span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VehicleRow;
