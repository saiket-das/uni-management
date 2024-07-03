import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Navigate } from "react-router-dom";

type LoginProps = {
  id: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginProps>({
    defaultValues: {
      id: "A-0001",
      password: "securepassword123",
    },
  });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  // Submit data to login
  const onSubmit = async (data: LoginProps) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const token = res.data.accessToken;

    // Decode token & set user info and user token in local storage
    const user = verifyToken(token);

    dispatch(
      setUser({
        user: user,
        token: res.data.accessToken,
      })
    );
    console.log(user);
    <Navigate to={`/dmin/dashboard`} replace={true} />;
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
