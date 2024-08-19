import { Button, Col, Flex, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../../../components/form/AppForm";
import AppSelectWithWatch from "../../../components/form/AppSelectWithWatch";
import AppSelect from "../../../components/form/AppSelect";
import AppTimePicker from "../../../components/form/AppTimePicker";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllResgisteredSemesterQuery,
  useGetFacultiesWithCourseQuery,
} from "../../../redux/features/admin/courseManagementApi";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { useState } from "react";
import { formatToOptions } from "../../../utils/formatToOptions";
import { dayOptions } from "../../../constants/days";
import { sectionOptions } from "../../../constants/section";
import { OfferedCourseProps } from "../../../types/courseManagement.types";
import { ResponseProps } from "../../../types";
import { toast } from "sonner";
import AppInput from "../../../components/form/AppInput";
import { convertToHHMMFormat } from "../../../utils/convertToHHMMFormat";

const CreateOfferedCourse = () => {
  const [courseId, setCourseId] = useState("");

  const { data: offeredCourseData } = useGetAllCoursesQuery(undefined);
  const { data: facultiesData, isFetching: facultiesFetching } =
    useGetFacultiesWithCourseQuery(courseId, {
      skip: !courseId,
    });
  const { data: registeredSemesterData } = useGetAllResgisteredSemesterQuery(
    [{ name: "status", value: "UPCOMING" }],
    { skip: !courseId }
  );
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(
    undefined,
    { skip: !courseId }
  );
  const { data: academicDepartmentData } = useGetAcademicDepartmentsQuery(
    undefined,
    { skip: !courseId }
  );

  const [createOfferedCourse, { isLoading }] = useCreateOfferedCourseMutation();

  // Courses
  const courseOptions = offeredCourseData?.data?.map((item) => ({
    value: item._id,
    label: `${item.title}`,
  }));

  // Faculties with course
  let facultiesOptions;
  if (facultiesData) {
    facultiesOptions = formatToOptions(
      facultiesData.faculties,
      "_id",
      (item) => `${item.name.firstName} ${item.name.lastName}`
    );
  }

  // Registered semester
  let registeredSemesterOption;
  if (registeredSemesterData?.data) {
    registeredSemesterOption = formatToOptions(
      registeredSemesterData?.data,
      "_id",
      (item) => `${item.academicSemester.name} ${item.academicSemester.year}`
    );
  }

  // Academic faculties
  let academicFacultyOptions;
  if (academicFacultyData?.data) {
    academicFacultyOptions = formatToOptions(
      academicFacultyData.data,
      "_id",
      (item) => `${item.name}`
    );
  }

  // Academic departments
  let academicDepartmentOptions;
  if (academicDepartmentData?.data) {
    academicDepartmentOptions = formatToOptions(
      academicDepartmentData.data,
      "_id",
      (item) => `${item.name}`
    );
  }

  // Create a new course
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const toastId = "Create new offered course";
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      startTime: convertToHHMMFormat(data.startTime),
      endTime: convertToHHMMFormat(data.endTime),
    };

    try {
      const res = (await createOfferedCourse(
        offeredCourseData
      )) as ResponseProps<OfferedCourseProps>;
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Offered course created successfully!", {
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
      <Col span={24}>
        <AppForm
          onSubmit={onSubmit}
          //   resolver={zodResolver()}
        >
          <Row gutter={[16, 0]}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelectWithWatch
                onValueChange={setCourseId}
                name="course"
                label="Course"
                disabled
                options={courseOptions}
                placeholder="Choose a course"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="faculty"
                label="Faculty"
                options={facultiesOptions}
                placeholder="Choose faculty"
                disabled={!courseId}
                isLoading={facultiesFetching}
                // value={}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="semesterRegistration"
                label="Registered semester"
                options={registeredSemesterOption}
                placeholder="Choose registered semester"
                disabled={!courseId}
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="academicFaculty"
                label="Academic faculty"
                options={academicFacultyOptions}
                placeholder="Choose academic faculty"
                disabled={!courseId}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="academicDepartment"
                label="Academic department"
                options={academicDepartmentOptions}
                placeholder="Choose academic department"
                disabled={!courseId}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="section"
                label="Section"
                options={sectionOptions}
                placeholder="Choose a section"
                disabled={!courseId}
              />
            </Col>

            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppSelect
                name="days"
                label="Days"
                mode="multiple"
                options={dayOptions}
                placeholder="Choose days"
              />
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppInput
                type="number"
                name="maxCapacity"
                label="Maximum capacity"
                placeholder="Enter maximum capacity"
              />
            </Col>

            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppTimePicker
                name="startTime"
                label="Start time"
                placeholder="Select start time"
              />
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppTimePicker
                name="endTime"
                label="End time"
                placeholder="Select end time"
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

export default CreateOfferedCourse;
