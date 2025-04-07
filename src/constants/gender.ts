export const genderNames = ["Male", "Female", "Others"];
export const genderOptions = genderNames.map((item) => ({
  label: item,
  value: item.toLocaleLowerCase(),
}));
