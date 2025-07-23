"use client";

import DashboardHeader from "@/containers/DashboardHeader/DashboardHeader";
import classes from "./DashboardLayout.module.css";
import DashboardSideNav from "@/containers/DashboardSideNav/DashboardSideNav";

type DashboardLayout = {
  children: React.ReactNode;
  className?: string;
  header: string;
};

const DashboardLayout = ({ children, className, header }: DashboardLayout) => {
  return (
    <main className={classes.container}>
      <DashboardSideNav />

      <section>
        <DashboardHeader header={header} />
        <section className={className}>{children}</section>
      </section>
    </main>
  );
};

export default DashboardLayout;
