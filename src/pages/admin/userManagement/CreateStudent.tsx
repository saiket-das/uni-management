import { Button, Col, Divider, Flex, Row } from "antd";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagementApi";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";
import AppInput from "../../../components/form/AppInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  bloodOptions,
  genderOptions,
} from "../../../types/userManagement.types";

const studentDummyData = {
  password: "defaultpass",
  student: {
    name: {
      firstName: "Summer 2025",
      lastName: "Eletrical Student",
    },
    gender: "male",
    dateOfBirth: "2000-01-01",
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

    admissionSemester: "667734c8079fbb6ebe6944e0",
    academicDepartment: "66775c24289034524bad8574",
  },
};

const CreateStudent = () => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    // const formData = new FormData();
    // formData.append("data", JSON.stringify(data));
    //! This is for development
    // console.log(Object.fromEntries(formData));
    // await createStudent({});
  };
  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <AppForm
          onSubmit={onSubmit}
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
              <AppInput
                type="text"
                name="dateOfBirth"
                label="Date of birth"
                placeholder="Enter your date of birth"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="bloodGroup"
                label="Blood group"
                options={bloodOptions}
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
                name="guardian.presentAddress"
                label="present address"
                placeholder="Enter your Present address"
              />
            </Col>
            <Col span={24}>
              <AppInput
                type="text"
                name="guardian.permanentAddress"
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
