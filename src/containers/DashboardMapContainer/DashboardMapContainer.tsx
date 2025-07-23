"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./DashboardMapContainer.module.css";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useEffect, useState } from "react";

import L from "leaflet";
import { useMap } from "react-leaflet";

function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position[0] && position[1]) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return null;
}

// Create icon
const customIcon = new L.Icon({
  iconUrl: "/yellowCar.png",
  iconSize: [40, 22],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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
            <Marker position={position as any} icon={customIcon}></Marker>
            <RecenterMap position={position as [number, number]} />
          </MapContainer>
        </>
      )}
    </section>
  );
}

export default DashboardMapContainer;
