"use client";

import Loader from "@/components/Loader/Loader";
import Report from "@/containers/Report/Report";
import RequireAuth from "@/middleware/RequireAuth/RequireAuth";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RequireAuth>
        <Report />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
