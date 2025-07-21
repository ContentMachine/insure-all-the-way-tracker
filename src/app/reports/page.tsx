import Loader from "@/components/Loader/Loader";
import Report from "@/containers/Report/Report";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Report />
    </Suspense>
  );
};

export default page;
