import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import { vehicleTableStatsType } from "@/utilities/types";
import classes from "../ReportStats/ReportStats.module.css";

interface Props {
  data: vehicleTableStatsType;
}

const DevicesStats: React.FC<Props> = ({ data }) => {
  return (
    <section className={classes.container}>
      <PoliciesSummaryCard
        title="All Devices"
        amount={data?.allDevices}
        notAmount
      />
      <PoliciesSummaryCard
        title="Offline "
        amount={data?.offlineDevices}
        notAmount
      />
      <PoliciesSummaryCard
        title="Online"
        amount={data?.onlineDevices}
        notAmount
      />
      <PoliciesSummaryCard
        title="Expired"
        amount={data?.expiredDevices}
        notAmount
      />
    </section>
  );
};

export default DevicesStats;
