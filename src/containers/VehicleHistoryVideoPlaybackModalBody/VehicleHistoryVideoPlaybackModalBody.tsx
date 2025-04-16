import Close from "@/assets/svgIcons/Close";
import classes from "./VehicleHistoryVideoPlaybackModalBody.module.css";

type VehicleHistoryVideoPlaybackModalBodyTypes = {
  onClose: () => void;
};

const VehicleHistoryVideoPlaybackModalBody = ({
  onClose,
}: VehicleHistoryVideoPlaybackModalBodyTypes) => {
  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Video Playback</h2>

      <div className={classes.body}>
        <video width="320" height="240" controls>
          <source
            src="https://res.cloudinary.com/dfilepe0f/video/upload/v1737384647/samples/elephants.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VehicleHistoryVideoPlaybackModalBody;
