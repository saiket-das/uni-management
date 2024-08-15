import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { academicSemesterValidationSchema } from "../../../schemas/academicManagementValidationSchema";
import { ResponseProps } from "../../../types";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await createAcademicSemester(semesterData)) as ResponseProps;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
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
          <AppSelect name="endMonth" label="End month" options={monthOptions} />
          <Button htmlType="submit" style={{ width: "100%" }} size="large">
            Submit
          </Button>
        </AppForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
