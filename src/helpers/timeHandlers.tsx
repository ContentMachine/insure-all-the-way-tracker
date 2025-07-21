import moment from "moment";

export function formatRelativeTime(timestamp: number): string {
  if (!timestamp) return "Unknown";

  const now = moment();
  const time = moment(timestamp);

  const diffInSeconds = now.diff(time, "seconds");

  if (diffInSeconds < 10) return "just now";
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

  const diffInMinutes = now.diff(time, "minutes");
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = now.diff(time, "hours");
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = now.diff(time, "days");
  return `${diffInDays}d ago`;
}
