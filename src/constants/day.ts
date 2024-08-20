// Define an array of days of the week
export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Map the array to the desired options format
export const dayOptions = dayNames.map((day) => ({
  label: day,
  value: day,
}));
