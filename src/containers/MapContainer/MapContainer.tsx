// MapContainer.tsx
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import classes from "./MapContainer.module.css";
import Close from "@/assets/svgIcons/Close";

// Custom tracker icon
const trackerIcon = new L.Icon({
  iconUrl: "/locationPin.jpg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Fit map bounds helper
function FitBounds({ path }: { path: LatLngExpression[] }) {
  const map = useMap();

  useEffect(() => {
    if (path && path.length > 0) {
      const bounds = L.latLngBounds(path);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [path, map]);

  return null;
}

interface Props {
  position: LatLngExpression;
  endPosition?: LatLngExpression;
  onClose: () => void;
  title?: string;
}

const MapContainer: React.FC<Props> = ({
  position,
  endPosition,
  onClose,
  title,
}) => {
  if (!position) return <p>No position provided</p>;

  const path = endPosition ? [position, endPosition] : [position];

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>{title || "Map"}</h2>

      <LeafletMap
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        className={classes.map}
        style={{ height: "70svh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={trackerIcon}>
          <Popup>Start Position</Popup>
        </Marker>

        {endPosition && (
          <Marker position={endPosition} icon={trackerIcon}>
            <Popup>End Position</Popup>
          </Marker>
        )}

        {endPosition && <Polyline positions={path} color="#2f4f4f" />}

        <FitBounds path={path} />
      </LeafletMap>
    </div>
  );
};

export default MapContainer;
