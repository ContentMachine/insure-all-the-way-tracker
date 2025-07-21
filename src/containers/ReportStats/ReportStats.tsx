import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import classes from "./ReportStats.module.css";

const ReportStats = () => {
  return (
    <section className={classes.container}>
      <PoliciesSummaryCard title="Device Amount" amount={0} notAmount />

      <PoliciesSummaryCard title="Total Milage " amount={0} notAmount />

      <PoliciesSummaryCard
        title="Total Oveespeed(times) "
        amount={0}
        notAmount
      />

      <PoliciesSummaryCard title="Total Stop(times) " amount={0} notAmount />
    </section>
  );
};

export default ReportStats;
