import dayjs from "dayjs";

export const convertToHHMMFormat = (timeValue: string | Date | dayjs.Dayjs) => {
  if (!timeValue) return "";
  // Convert the input to a dayjs object if it's not already one
  const time = dayjs(timeValue);
  // Check if the conversion is valid
  if (!time.isValid()) return "";

  return time.format("HH:mm");
};
