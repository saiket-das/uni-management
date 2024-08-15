import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, UserProps } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from "sonner";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";

const Login = () => {
  const defaultValues = {
    id: "A-0001",
    password: "securepassword123",
  };

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Submit data to login
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loggin in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      // Decode token & set user info and user token in local storage
      const token = res.data.accessToken;
      const user = verifyToken(token) as UserProps;

      dispatch(
        setUser({
          user: user,
          token: res.data.accessToken,
        })
      );
      toast.success("Login Successfully!", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Col span={8}>
        {/* <Row justify="center" align="middle" style={{ height: "100vh" }}> */}
        <AppForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <AppInput type="text" name="id" label="User Id" />
          <AppInput type="text" name="password" label="Password" />
          <Button htmlType="submit" style={{ width: "100%" }} size="large">
            Login
          </Button>
        </AppForm>
        {/* </Row> */}
      </Col>
    </Flex>
  );
};

export default Login;
