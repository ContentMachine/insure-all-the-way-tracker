"use client";

import Loader from "@/components/Loader/Loader";
import Dashboard from "@/containers/Dashboard/Dashboard";
import RequireAuth from "@/middleware/RequireAuth/RequireAuth";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
