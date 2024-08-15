
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type AppInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
};

const AppInput = ({ type, name, label, placeholder }: AppInputProps) => {
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
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppInput;
