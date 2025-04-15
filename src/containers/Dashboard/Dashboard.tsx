"use client";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import classes from "./Dashboard.module.css";
import DashboardMapContainer from "../DashboardMapContainer/DashboardMapContainer";
import DashboardControls from "../DashboardControls/DashboardControls";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout className={classes.container} header="Dashboard">
        <DashboardMapContainer />
        <DashboardControls />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
