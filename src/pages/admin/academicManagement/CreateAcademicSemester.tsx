import { Button, Col, Flex } from "antd";
import AppForm from "../../../components/form/AppForm";

import { FieldValues, SubmitHandler } from "react-hook-form";
import AppSelect from "../../../components/form/AppSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterValidationSchema } from "../../../validations/academicSemesterValidationSchema";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Pressed");
    const name = nameOptions[Number(data.name) - 1].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endtMonth: data.endtMonth,
    };
    console.log(semesterData);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <AppForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterValidationSchema)}
        >
          <AppSelect name="name" label="Name" options={nameOptions} />
          <AppSelect name="year" label="Year" options={yearOptions} />
          <AppSelect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          />
          <AppSelect
            name="endtMonth"
            label="End month"
            options={monthOptions}
          />
          <Button htmlType="submit" style={{ width: "100%" }} size="large">
            Submit
          </Button>
        </AppForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
