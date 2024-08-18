import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagementApi";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";
import AppInput from "../../../components/form/AppInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import AppDatePicker from "../../../components/form/AppDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { genderOptions } from "../../../constants/gender";
import { bloodGroupOptions } from "../../../constants/bloodGroup";
import { ResponseProps } from "../../../types";
import { StudentProps } from "../../../types/userManagement.types";

const studentDefaultValues = {
  name: {
    firstName: "Summer 2025",
    lastName: "Eletrical Student",
  },
  gender: "male",
  bloodGroup: "O+",

  email: "summer.student.eletrical.2025@example.com",
  contactNumber: "1234567890",
  emergencyContactNumber: "0987654321",

  presentAddress: "123 Main St, Anytown, USA",
  permanentAddress: "456 Elm St, Hometown, USA",

  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "1234567890",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContactNo: "0987654321",
  },

  localGuardian: {
    name: "Uncle Bob",
    occupation: "Doctor",
    contactNo: "1112223333",
    address: "789 Pine St, Nearbytown, USA",
  },
};

const CreateStudent = () => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllAcademicSemestersQuery(undefined);
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // Create a new student func
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "create a new student";

    const formData = new FormData();
    const studenData = {
      password: "defaultpass",
      student: data,
    };
    formData.append("data", JSON.stringify(studenData));
    formData.append("file", data.image);
    //! This is for development
    // console.log(Object.fromEntries(formData));

    try {
      const res = (await createStudent(
        formData
      )) as ResponseProps<StudentProps>;
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Student created successfully!", {
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
          defaultValues={studentDefaultValues}
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

            <Divider>Guardian Info</Divider>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="guardian.fatherName"
                label="Father name"
                placeholder="Enter your father's name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father occupation"
                placeholder="Enter your father's occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father contact no"
                placeholder="Enter your father'scontact no"
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="guardian.motherName"
                label="Mother name"
                placeholder="Enter your mother's name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother occupation"
                placeholder="Enter your mother's occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother contact no"
                placeholder="Enter your mother's contact no"
              />
            </Col>

            <Divider>Local Guardian Info</Divider>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="localGuardian.name"
                label="Local guardian name"
                placeholder="Enter your local guardian's name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="localGuardian.occupation"
                label="Local guardian occupation"
                placeholder="Enter your local guardian's occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="localGuardian.contactNo"
                label="Local guardian contact no"
                placeholder="Enter your father local guardian's contact no"
              />
            </Col>

            <Col span={24}>
              <AppInput
                type="text"
                name="localGuardian.address"
                label="Local guardian address"
                placeholder="Enter your mother local guardian's address"
              />
            </Col>

            <Divider>Academic Info</Divider>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppSelect
                options={semesterOptions}
                disabled={semesterLoading}
                name="admissionSemester"
                label="Admission Semester"
                placeholder="Choose your admission semester"
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

export default CreateStudent;
