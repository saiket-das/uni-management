export const semesterNameOption = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "02", label: "Fall" },
];

export const semesterStatusOption = [
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "ENDED", label: "Ended" },
];

export const RegistrationStatus = {
  UPCOMING: "UPCOMING",
  ONGOING: "ONGOING",
  ENDED: "ENDED",
} as const;
