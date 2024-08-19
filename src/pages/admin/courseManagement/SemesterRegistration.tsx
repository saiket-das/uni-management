import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";
import AppDatePicker from "../../../components/form/AppDatePicker";

import AppInput from "../../../components/form/AppInput";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { semesterStatusOption } from "../../../constants/semester";
import { useCreateSemesterResgistrationMutation } from "../../../redux/features/admin/courseManagementApi";
import { SemesterResgistrationProps } from "../../../types/courseManagement.types";
import { ResponseProps } from "../../../types";

const SemesterRegistration = () => {
  const [createSemesterRegistration, { isLoading }] =
    useCreateSemesterResgistrationMutation();

  const { data: semesterData } = useGetAllAcademicSemestersQuery(undefined);
  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Register academic semester";
    const semesterRegistrationData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await createSemesterRegistration(
        semesterRegistrationData
      )) as ResponseProps<SemesterResgistrationProps>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester registered successfully!", {
          id: toastId,
          duration: 2000,
        });
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
          //   resolver={zodResolver()}
        >
          <AppSelect
            name="academicSemester"
            label="Academic Semester"
            options={semesterOptions}
            placeholder="Choose semester status"
          />
          <AppSelect
            name="status"
            label="Status"
            options={semesterStatusOption}
            placeholder="Choose semester status"
          />

          <AppDatePicker
            name="startDate"
            label="Start Date"
            placeholder="Enter your date of birth"
          />

          <AppDatePicker
            name="endDate"
            label="End Date"
            placeholder="Enter your date of birth"
          />

          <AppInput
            type="number"
            name="minCredit"
            label="Min Credit"
            placeholder="Enter your email address"
          />
          <AppInput
            type="number"
            name="maxCredit"
            label="Max Credit"
            placeholder="Enter your email address"
          />

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

export default SemesterRegistration;
