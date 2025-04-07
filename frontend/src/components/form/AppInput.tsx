import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type AppInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

const AppInput = ({
  type,
  name,
  label,
  placeholder,
  disabled = false,
}: AppInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              placeholder={placeholder}
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppInput;
