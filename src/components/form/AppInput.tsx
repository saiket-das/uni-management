import { Input } from "antd";
import { Controller } from "react-hook-form";

type AppInputProps = {
  type: string;
  name: string;
  label?: string;
};

const AppInput = ({ type, name, label }: AppInputProps) => {
  return (
    <div style={{ marginBottom: 10 }}>
      {label ? (
        // <div style={{ marginBottom: 5 }}>
        <label htmlFor={name}>{label}</label>
      ) : // </div>
      null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default AppInput;
