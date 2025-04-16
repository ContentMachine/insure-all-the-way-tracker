import Loader from "@/components/Loader/Loader";
import Devices from "@/containers/Devices/Devices";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Devices />
    </Suspense>
  );
};

export default page;
