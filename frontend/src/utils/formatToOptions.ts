interface OptionProps {
  value: string;
  label: string;
}

export const formatToOptions = <T>(
  array: T[],
  valueKey: keyof T,
  labelFormatter: (item: T) => string
): OptionProps[] => {
  return array.map((item) => ({
    value: String(item[valueKey]), // Convert the value to a string
    label: labelFormatter(item),
  }));
};
