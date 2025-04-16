import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import classes from "../ReportStats/ReportStats.module.css";

const DevicesStats = () => {
  return (
    <section className={classes.container}>
      <PoliciesSummaryCard title="All Devices" amount={0} notAmount />
      <PoliciesSummaryCard title="Offline " amount={0} notAmount />
      <PoliciesSummaryCard title="Online" amount={0} notAmount />
      <PoliciesSummaryCard title="Expired" amount={0} notAmount />
    </section>
  );
};

export default DevicesStats;
