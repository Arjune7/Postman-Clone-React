export function formatToHumanReadableDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Date(dateString).toLocaleString(undefined, options);
  return formattedDate;
}
