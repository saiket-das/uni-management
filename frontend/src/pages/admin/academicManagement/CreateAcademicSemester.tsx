import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { academicSemesterValidationSchema } from "../../../schemas/academicManagementValidationSchema";
import { semesterNameOption } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { ResponseProps } from "../../../types";
import { AcademicSemesterProps } from "../../../types/academicManagement.types";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [createAcademicSemester, { isLoading }] =
    useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const name = semesterNameOption[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await createAcademicSemester(
        semesterData
      )) as ResponseProps<AcademicSemesterProps>;
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
          <AppSelect name="name" label="Name" options={semesterNameOption} />
          <AppSelect name="year" label="Year" options={yearOptions} />
          <AppSelect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          />
          <AppSelect name="endMonth" label="End month" options={monthOptions} />
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

export default CreateAcademicSemester;
