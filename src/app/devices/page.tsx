import Loader from "@/components/Loader/Loader";
import Devices from "@/containers/Devices/Devices";
import RequireAuth from "@/middleware/RequireAuth/RequireAuth";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RequireAuth>
        <Devices />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
