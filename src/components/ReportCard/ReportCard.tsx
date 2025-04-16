import Road from "@/assets/svgIcons/Road";
import classes from "./ReportCard.module.css";

type ReportCardTypes = {
  icon: React.ReactNode;
  value?: number | string;
  quantity: string;
};

const ReportCard = ({ icon, value, quantity }: ReportCardTypes) => {
  return (
    <div className={classes.container}>
      <span>{icon || <Road />}</span>
      <h4>{value || 0}</h4>
      <p>{quantity}</p>
    </div>
  );
};

export default ReportCard;
