export const genderNames = ["Male", "Female", "Others"];
export const genderOptions = genderNames.map((item) => ({
  label: item,
  value: item.toLocaleLowerCase(),
}));

export const bloodNames = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const bloodOptions = bloodNames.map((item) => ({
  label: item,
  value: item.toLocaleLowerCase(),
}));
