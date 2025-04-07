import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";
import AppInput from "../../../components/form/AppInput";
import { ResponseProps } from "../../../types";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { CourseProps } from "../../../types/courseManagement.types";

const CreateCourse = () => {
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const courseOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: `${item.title}`,
  }));

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  // Create a new course
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Create new course";
    const courseData = {
      course: {
        ...data,
        code: Number(data.code),
        credits: Number(data.credits),
        isDeleted: false,
        preRequisiteCourses: data.preRequisiteCourses
          ? data.preRequisiteCourses.map((item: string) => ({
              course: item,
              isDeleted: false,
            }))
          : [],
      },
    };

    try {
      const res = (await createCourse(
        courseData
      )) as ResponseProps<CourseProps>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course created successfully!", {
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
          <AppInput
            type="text"
            name="title"
            label="Title"
            placeholder="Enter course title"
          />
          <AppInput
            type="text"
            name="prefix"
            label="Prefix"
            placeholder="Enter course prefix"
          />
          <AppInput
            type="number"
            name="code"
            label="Code"
            placeholder="Enter course code"
          />
          <AppInput
            type="number"
            name="credits"
            label="Credit"
            placeholder="Enter course credit"
          />

          <AppSelect
            name="preRequisiteCourses"
            label="Pre-requisite Courses"
            mode="multiple"
            options={courseOptions}
            placeholder="Choose pre-requisite courses"
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

export default CreateCourse;
