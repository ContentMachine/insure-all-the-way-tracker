"use client";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import ReportStats from "../ReportStats/ReportStats";
import classes from "./Report.module.css";
import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import ReportsTable from "../ReportsTable/ReportsTable";

const Report = () => {
  return (
    <DashboardLayout header="Reports" className={classes.container}>
      <GreetingComponent />
      <ReportStats />
      <ReportsTable />
    </DashboardLayout>
  );
};

export default Report;
