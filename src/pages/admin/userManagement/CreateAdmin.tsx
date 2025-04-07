import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";
import AppInput from "../../../components/form/AppInput";
import { toast } from "sonner";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { ResponseProps } from "../../../types";
import { FacultyProps } from "../../../types/userManagement.types";
import { useCreateAdminMutation } from "../../../redux/features/admin/userManagementApi";
import { genderOptions } from "../../../constants/gender";
import AppDatePicker from "../../../components/form/AppDatePicker";
import { bloodGroupOptions } from "../../../constants/bloodGroup";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagementApi";

const defaultAdminValues = {
  id: "admin123",
  name: {
    firstName: "Admin",
    lastName: "Software",
  },
  email: "admin.software@gmail.com",
  gender: "male",
  contactNumber: "1234567890",
  emergencyContactNumber: "0987654321",
  presentAddress: "123 Admin St, City, Country",
  permanentAddress: "456 Home Ave, Hometown, Country",
  bloodGroup: "A+",
};

const CreateAdmin = () => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const { data: departmentData, isLoading: departmentLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "create a new admin";

    const formData = new FormData();
    const studenData = {
      password: "securepassword123",
      admin: data,
    };
    formData.append("data", JSON.stringify(studenData));
    formData.append("file", data.profileImage);

    try {
      const res = (await createAdmin(formData)) as ResponseProps<FacultyProps>;
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Admin created successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center" style={{ paddingBottom: "20px" }}>
      <Col span={24}>
        <AppForm
          onSubmit={onSubmit}
          defaultValues={defaultAdminValues}
          // resolver={zodResolver(academicSemesterValidationSchema)}
        >
          <Row gutter={[16, 0]}>
            <Divider>Personal Info</Divider>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="name.firstName"
                label="First name"
                placeholder="Enter your firstname"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="name.lastName"
                label="Last name"
                placeholder="Enter your lastname"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="gender"
                label="Gender"
                options={genderOptions}
                placeholder="Choose your gender"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <Controller
                name="profileImage"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Your photo">
                    <Input
                      type="file"
                      value={value?.fileName}
                      size="large"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppDatePicker
                name="dateOfBirth"
                label="Date of birth"
                placeholder="Enter your date of birth"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="bloodGroup"
                label="Blood group"
                options={bloodGroupOptions}
                placeholder="Choose your blood group"
              />
            </Col>

            <Divider>Contact Info</Divider>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="email"
                label="Email address"
                placeholder="Enter your email address"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="contactNumber"
                label="Contact number"
                placeholder="Enter your contact number"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="emergencyContactNumber"
                label="Emergency contact number"
                placeholder="Enter your emergency contact number"
              />
            </Col>

            <Divider>Address Info</Divider>
            <Col span={24}>
              <AppInput
                type="text"
                name="presentAddress"
                label="Present address"
                placeholder="Enter your Present address"
              />
            </Col>
            <Col span={24}>
              <AppInput
                type="text"
                name="permanentAddress"
                label="Permanent address"
                placeholder="Enter your permanent address"
              />
            </Col>

            <Divider>Academic Info</Divider>
            <Col span={24} lg={{ span: 24 }} md={{ span: 24 }}>
              <AppSelect
                options={departmentOptions}
                disabled={departmentLoading}
                name="managementDepartment"
                label="Management department"
                placeholder="Choose your management department"
              />
            </Col>
          </Row>
          <Button
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
            loading={isLoading}
            iconPosition="start"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </AppForm>
      </Col>
    </Flex>
  );
};

export default CreateAdmin;
