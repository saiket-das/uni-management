import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type AppInputProps = {
  type: string;
  name: string;
  label?: string;
};

const AppInput = ({ type, name, label }: AppInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large" />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppInput;
