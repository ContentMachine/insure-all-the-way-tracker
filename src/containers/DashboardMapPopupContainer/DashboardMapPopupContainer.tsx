import Signal from "@/assets/svgIcons/Signal";
import classes from "./DashboardMapPopupContainer.module.css";
import PhoneSignal from "@/assets/svgIcons/PhoneSignal";
import Location from "@/assets/svgIcons/Location";
import Road from "@/assets/svgIcons/Road";

const DashboardMapPopupContainer = () => {
  return (
    <div className={classes.container}>
      <h4>Name of Vehicle</h4>

      <div className={classes.infoContainer}>
        <div className={classes.info}>
          <Signal />
          <span>Signal time</span>
          <span>Yesterdat at 2:23pm</span>
        </div>

        <div className={classes.info}>
          <PhoneSignal />
          <span>GSM Last Seen</span>
          <span>Yesterdat at 2:23pm</span>
        </div>
      </div>

      <div className={classes.info}>
        <Road />
        <span>Distance Today</span>
        <span>Yesterdat at 2:23pm</span>
      </div>

      <div className={classes.info}>
        <Location />
        <span>Current Location</span>
        <span>Admiralty Way, Lekki, Lagos</span>
      </div>
    </div>
  );
};

export default DashboardMapPopupContainer;
