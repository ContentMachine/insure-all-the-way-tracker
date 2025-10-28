// "use client";

// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import classes from "./DashboardMapContainer.module.css";
// import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
// import { useEffect, useState } from "react";

// import L from "leaflet";
// import { useMap } from "react-leaflet";

// function RecenterMap({ position }: { position: [number, number] }) {
//   const map = useMap();

//   useEffect(() => {
//     if (position[0] && position[1]) {
//       map.flyTo(position, map.getZoom());
//     }
//   }, [position, map]);

//   return null;
// }

// // Create icon
// const customIcon = new L.Icon({
//   iconUrl: "/yellowCar.png",
//   iconSize: [40, 22],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// function DashboardMapContainer() {
//   // Hooks
//   const { updateSearchParams } = useUpdateSearchParams();

//   // States
//   const [position, setPosition] = useState<number[]>([]);

//   // Utils
//   const longitude = updateSearchParams("longitude", undefined, "get");
//   const latitude = updateSearchParams("latitude", undefined, "get");

//   // Effect
//   useEffect(() => {
//     if (latitude && longitude) {
//       const numberLat = Number(latitude);
//       const numberLong = Number(longitude);

//       setPosition([numberLat, numberLong]);
//     }
//   }, [longitude, latitude]);

//   return (
//     <section className={classes?.container}>
//       {position?.length > 0 && (
//         <>
//           <MapContainer
//             center={position as any}
//             zoom={18}
//             scrollWheelZoom={true}
//             zoomControl={false}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position as any} icon={customIcon}></Marker>
//             <RecenterMap position={position as [number, number]} />
//           </MapContainer>
//         </>
//       )}
//     </section>
//   );
// }

// export default DashboardMapContainer;

"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./DashboardMapContainer.module.css";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { vehicleType } from "@/utilities/types";
import Loader from "@/components/Loader/Loader";

function RecenterMap({ position }: { position: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
}

// Custom car icon
const carIcon = new L.Icon({
  iconUrl: "/car.png",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const bikeIcon = new L.Icon({
  iconUrl: "/motorcycle.png",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const truckIcon = new L.Icon({
  iconUrl: "/truck.png",
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface DashboardMapContainerProps {
  vehicles: vehicleType[];
}

export default function DashboardMapContainer({
  vehicles,
}: DashboardMapContainerProps) {
  const { updateSearchParams } = useUpdateSearchParams();
  const [focusPosition, setFocusPosition] = useState<[number, number] | null>([
    0, 0,
  ]);

  const longitude = updateSearchParams("longitude", undefined, "get");
  const latitude = updateSearchParams("latitude", undefined, "get");

  useEffect(() => {
    if (latitude && longitude) {
      setFocusPosition([Number(latitude), Number(longitude)]);
    } else if (vehicles?.length > 0) {
      setFocusPosition([
        vehicles[0]?.status?.carStatus?.lat ?? 0,
        vehicles?.[0]?.status?.carStatus?.lon ?? 0,
      ]);
    }
  }, [latitude, longitude, vehicles]);

  if (!vehicles?.[0])
    return (
      <section className={classes.container}>
        <Loader />
      </section>
    );

  return (
    <section className={classes.container}>
      {vehicles?.[0]?.status?.carStatus?.lon &&
        vehicles?.[0]?.status?.carStatus?.lat && (
          <MapContainer
            center={
              focusPosition
                ? focusPosition
                : [
                    vehicles?.[0]?.status?.carStatus?.lat ?? 0,
                    vehicles?.[0]?.status?.carStatus?.lon ?? 0,
                  ]
            }
            zoom={15}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {vehicles.map((car) => (
              <Marker
                key={car.carNO}
                position={[
                  car?.status?.carStatus?.lat ?? 0,
                  car?.status?.carStatus?.lon ?? 0,
                ]}
                icon={
                  (car?.carType === 2 || car?.carType) === 5
                    ? truckIcon
                    : car?.carType === 6
                    ? bikeIcon
                    : carIcon
                }
              >
                <Popup>
                  <strong>{car.machineName}</strong>
                  <br />
                  Reg No: {car.carNO}
                  <br />
                  Lat: {car?.status?.carStatus?.lat as number}, Lng:{" "}
                  {car?.status?.carStatus?.lon as number}
                </Popup>
              </Marker>
            ))}

            <RecenterMap
              position={
                focusPosition || [
                  vehicles?.[0]?.status?.carStatus?.lat ?? 0,
                  vehicles?.[0]?.status?.carStatus?.lon ?? 0,
                ]
              }
            />
          </MapContainer>
        )}
    </section>
  );
}
