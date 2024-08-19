import { Button, Col, Flex, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../../../components/form/AppForm";
import AppSelectWithWatch from "../../../components/form/AppSelectWithWatch";
import AppInput from "../../../components/form/AppInput";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagementApi";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { useState } from "react";
import AppSelect from "../../../components/form/AppSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import AppTimePicker from "../../../components/form/AppTimePicker";

const CreateOfferedCourse = () => {
  const [courseId, setCourseId] = useState("");

  // Courses
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const courseOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: `${item.title}`,
  }));

  const { data: facultyData } = useGetAllFacultiesQuery(undefined);
  const facultyOptions = facultyData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  // Academic faculties
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // Academic departments
  const { data: academicDepartmentsData } =
    useGetAcademicDepartmentsQuery(undefined);
  const academicDepartmentOptions = academicDepartmentsData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  console.log(courseId);

  // Create a new course
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // const toastId = "Create new course";
    // const courseData = {
    //   course: {
    //     ...data,
    //     code: Number(data.code),
    //     credits: Number(data.credits),
    //     isDeleted: false,
    //     preRequisiteCourses: data.preRequisiteCourses
    //       ? data.preRequisiteCourses.map((item: string) => ({
    //           course: item,
    //           isDeleted: false,
    //         }))
    //       : [],
    //   },
    // };
    // try {
    //   const res = (await createCourse(
    //     courseData
    //   )) as ResponseProps<CourseProps>;
    //   if (res.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.success("Course created successfully!", {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //   }
    // } catch (err) {
    //   toast.error("Something went wrong", { id: toastId, duration: 2000 });
    // }
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
                disabled={!courseId}
                name="faculty"
                label="Faculty"
                options={facultyOptions}
                placeholder="Choose faculty"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="semesterRegistration"
                label="Registered semester"
                options={academicFacultyOptions}
                placeholder="Choose registered semester"
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="academicFaculty"
                label="Academic faculty"
                options={academicDepartmentOptions}
                placeholder="Choose academic faculty"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="academicDepartment"
                label="Academic department"
                options={academicDepartmentOptions}
                placeholder="Choose academic department"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppInput
                disabled={!courseId}
                type="number"
                name="section"
                label="Section"
                placeholder="Enter section"
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppSelect
                name="days"
                label="Days"
                mode="multiple"
                options={courseOptions}
                placeholder="Choose days"
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <AppTimePicker
                name="startTime"
                label="Start time"
                placeholder="Select start time"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
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
            // loading={isLoading}
            iconPosition="start"
          >
            {/* {isLoading ? "Loading..." : "Submit"} */}
            Submit
          </Button>
        </AppForm>
      </Col>
    </Flex>
  );
};

export default CreateOfferedCourse;
