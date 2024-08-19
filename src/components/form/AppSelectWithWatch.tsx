import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type AppSelectWithWatchProps = {
  name: string;
  label?: string;
  placeholder?: string;
  mode?: "multiple" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
  //   onValueChange: (value: string) => void;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
};

const AppSelectWithWatch = ({
  name,
  label,
  options,
  placeholder,
  onValueChange,
  isLoading = false,
  mode = undefined,
}: AppSelectWithWatchProps) => {
  const method = useFormContext();
  const inputValue = useWatch({
    control: method.control,
    name,
  });

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              {...field}
              style={{ width: "100%" }}
              options={options}
              size="large"
              mode={mode}
              placeholder={placeholder}
              loading={isLoading}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppSelectWithWatch;
