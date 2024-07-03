import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "securepassword123",
    },
  });
  const [login, { data: response, error }] = useLoginMutation();

  console.log("Response: ", response);
  console.log("Error: ", error);

  // Submit data to login
  const onSubmit = (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    console.log(userInfo);
    login(userInfo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">User Id</label>
        <input type="text" {...register("id")} />

        <label htmlFor="pasword">Password</label>
        <input type="text" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
