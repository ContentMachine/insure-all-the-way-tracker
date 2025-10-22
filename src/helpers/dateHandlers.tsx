import moment from "moment";

export const backDate = (days: number) => {
  return moment().subtract(days, "days").format("YYYY-MM-DD");
};
