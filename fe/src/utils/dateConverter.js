export const dateConvert = (dateStr) => {
  const date = new Date(dateStr);

  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
