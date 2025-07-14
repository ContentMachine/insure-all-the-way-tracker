"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./DashboardMapContainer.module.css";
import DashboardMapPopupContainer from "../DashboardMapPopupContainer/DashboardMapPopupContainer";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo/Logo";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import L from "leaflet";
import { useMap } from "react-leaflet";

function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position[0] && position[1]) {
      map.flyTo(position, map.getZoom()); // or use map.setView(...)
    }
  }, [position, map]);

  return null;
}

// Create icon
const customIcon = new L.Icon({
  iconUrl: "/logo.png", // from /public folder
  iconSize: [50, 32], // size in px
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // offset of the popup from the icon
});

// const position = [6.5244, 3.3792];

function DashboardMapContainer() {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  // States
  const [position, setPosition] = useState<number[]>([]);

  // Utils
  const longitude = updateSearchParams("longitude", undefined, "get");
  const latitude = updateSearchParams("latitude", undefined, "get");

  // Effect
  useEffect(() => {
    if (latitude && longitude) {
      const numberLat = Number(latitude);
      const numberLong = Number(longitude);

      setPosition([numberLat, numberLong]);
    }
  }, [longitude, latitude]);

  return (
    <section className={classes?.container}>
      {position?.length > 0 && (
        <>
          <MapContainer
            center={position as any}
            zoom={18}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position as any} icon={customIcon}>
              <Popup></Popup>
            </Marker>
            <RecenterMap position={position as [number, number]} />
          </MapContainer>
        </>
      )}
    </section>
  );
}

export default DashboardMapContainer;
