"use client";

import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import DevicesStats from "../DevicesStats/DevicesStats";
import DevicesTable from "../DevicesTable/DevicesTable";
import classes from "../Report/Report.module.css";

const Devices = () => {
  return (
    <DashboardLayout header="Devices" className={classes.container}>
      <GreetingComponent />
      <DevicesStats />
      <DevicesTable />
    </DashboardLayout>
  );
};

export default Devices;
