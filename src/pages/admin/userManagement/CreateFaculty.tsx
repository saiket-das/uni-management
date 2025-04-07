import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";
import AppInput from "../../../components/form/AppInput";
import { FacultyProps } from "../../../types/userManagement.types";
import { toast } from "sonner";
import { ResponseProps } from "../../../types";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import AppDatePicker from "../../../components/form/AppDatePicker";
import { bloodGroupOptions } from "../../../constants/bloodGroup";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { useCreateFacultyMutation } from "../../../redux/features/admin/userManagementApi";
import { genderOptions } from "../../../constants/gender";

const CreateFaculty = () => {
  const [createFaculty, { isLoading }] = useCreateFacultyMutation();

  const { data: semesterData, isLoading: semesterLoading } =
    useGetAcademicFacultiesQuery(undefined);
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // Create a new faculty func
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "create a new faculty";

    const formData = new FormData();
    const studenData = {
      password: "defaultpass",
      faculty: data,
    };
    formData.append("data", JSON.stringify(studenData));
    formData.append("file", data.image);

    try {
      const res = (await createFaculty(
        formData
      )) as ResponseProps<FacultyProps>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Faculty created successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const defaultFacultyValues = {
    name: {
      firstName: "Noor",
      lastName: "Less",
    },
    email: "noorless.faculty@example.com",
    gender: "female",
    contactNumber: "1234567890",
    emergencyContactNumber: "0987654321",
    presentAddress: "123 University Ave, Petaling Jaya, Malaysia",
    permanentAddress: "456 Home St, Hometown, Country",
    bloodGroup: "B+",
  };

  return (
    <Flex justify="center" align="center" style={{ paddingBottom: "20px" }}>
      <Col span={24}>
        <AppForm
          onSubmit={onSubmit}
          defaultValues={defaultFacultyValues}
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
                name="image"
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
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppSelect
                options={semesterOptions}
                disabled={semesterLoading}
                name="academicFaculty"
                label="Academic Faculty"
                placeholder="Choose your admission faculty"
              />
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppSelect
                options={departmentOptions}
                disabled={departmentLoading}
                name="academicDepartment"
                label="Academic department"
                placeholder="Choose your academic department"
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

export default CreateFaculty;
