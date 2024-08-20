import { Button, Col, Flex } from "antd";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChnagePasswordMutation } from "../../redux/features/admin/userManagementApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { ResponseProps } from "../../types";

const ChangePassword = () => {
  const [changePassword] = useChnagePasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Submit to change passord
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Change password";

    const res = (await changePassword(data)) as ResponseProps<any>;

    console.log(res);

    if (res?.data?.success) {
      toast.success("Password chnages Successfully!", {
        id: toastId,
        duration: 2000,
      });
      dispatch(logout());
      navigate("/login");
    }
    // else {
    //   toast.error(res.error?.data?.message, { id: toastId });
    // }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Col span={8}>
        <AppForm onSubmit={onSubmit}>
          <AppInput
            type="text"
            name="oldPassword"
            label="Old password"
            placeholder="Enter your user Id"
          />
          <AppInput
            type="text"
            name="newPassword"
            label="New password"
            placeholder="Enter your password"
          />
          <Button htmlType="submit" style={{ width: "100%" }} size="large">
            Change password
          </Button>
        </AppForm>
        {/* </Row> */}
      </Col>
    </Flex>
  );
};

export default ChangePassword;
