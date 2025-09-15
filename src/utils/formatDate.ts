// Safe date formatter with graceful fallback
export function formatDate(
  date: string | Date | null | undefined,
  includeRelative = false,
  locale = "en-US"
): string {
  if (!date) return ""; // no date provided

  const iso =
    typeof date === "string"
      ? (date.includes("T") ? date : `${date}T00:00:00`)
      : date.toISOString();

  const targetDate = new Date(iso);
  // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
  if (isNaN(targetDate.getTime())) return "";

  const currentDate = new Date();

  const diffMs = currentDate.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  const diffMonths =
    currentDate.getMonth() -
    targetDate.getMonth() +
    12 * (currentDate.getFullYear() - targetDate.getFullYear());
  const diffYears = Math.floor(diffMonths / 12);

  let relative = "Today";
  if (diffYears > 0) relative = `${diffYears}y ago`;
  else if (diffMonths > 0) relative = `${diffMonths}mo ago`;
  else if (diffDays > 0) relative = `${diffDays}d ago`;

  const fullDate = targetDate.toLocaleString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return includeRelative ? `${fullDate} (${relative})` : fullDate;
}