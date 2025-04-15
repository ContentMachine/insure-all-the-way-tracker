import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./DashboardMapContainer.module.css";
import Logout from "@/assets/svgIcons/Logout";
import DashboardMapPopupContainer from "../DashboardMapPopupContainer/DashboardMapPopupContainer";

const position = [6.5244, 3.3792];

function DashboardMapContainer() {
  return (
    <section className={classes?.container}>
      <MapContainer
        center={position as any}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position as any}>
          <Popup>
            <DashboardMapPopupContainer />
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}

export default DashboardMapContainer;
