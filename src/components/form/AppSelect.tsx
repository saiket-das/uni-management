import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type AppSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
  disabled?: boolean;
};

const AppSelect = ({ name, label, options, placeholder }: AppSelectProps) => {
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
              placeholder={placeholder}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppSelect;
