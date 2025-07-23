import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import moment from "moment";
import { vehicleHistoryType } from "@/utilities/types";
import classes from "./VehicleHistoryVideoPlaybackModalBody.module.css";
import Close from "@/assets/svgIcons/Close";
import { useEffect } from "react";

type VehicleHistoryVideoPlaybackModalBodyTypes = {
  onClose: () => void;
  history: vehicleHistoryType[];
};

const trackerIcon = new L.Icon({
  iconUrl: "/locationPin.jpg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Fit map bounds helper
function FitBounds({ path }: { path: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (path.length > 0) {
      const bounds = L.latLngBounds(path);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [path, map]);

  return null;
}

const VehicleHistoryVideoPlaybackModalBody = ({
  onClose,
  history,
}: VehicleHistoryVideoPlaybackModalBodyTypes) => {
  if (!history || history.length === 0) return <p>No history to display</p>;

  const path = history.map(
    (point) => [point.lat, point.lon] as [number, number]
  );

  const start = path[0];
  const end = path[path.length - 1];

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Vehicle Tracker History</h2>

      <MapContainer
        center={start}
        zoom={15}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={path} color="#2f4f4f" />

        <Marker position={start} icon={trackerIcon}>
          <Popup>
            Start Point
            <br />
            {moment(history[0].pointDt).format("LLL")}
          </Popup>
        </Marker>

        <Marker position={end} icon={trackerIcon}>
          <Popup>
            End Point
            <br />
            {moment(history[history.length - 1].pointDt).format("LLL")}
          </Popup>
        </Marker>

        <FitBounds path={path} />
      </MapContainer>
    </div>
  );
};

export default VehicleHistoryVideoPlaybackModalBody;
