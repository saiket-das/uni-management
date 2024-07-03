import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "securepassword123",
    },
  });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  // console.log("Response: ", response);
  // console.log("Error: ", error);

  // Submit data to login
  const onSubmit = async (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const token = res.data.accessToken;

    // Decode token
    const user = verifyToken(token);
    // Set user and user token at local storage
    dispatch(
      setUser({
        user: user,
        token: res.data.accessToken,
      })
    );
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
