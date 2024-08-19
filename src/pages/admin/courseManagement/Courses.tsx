import { Button, Modal, Table, TableColumnsType, Tag } from "antd";
import { CourseProps } from "../../../types/courseManagement.types";
import {
  useAssignCourseToFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { useState } from "react";
import AppForm from "../../../components/form/AppForm";
import AppSelect from "../../../components/form/AppSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import { ResponseProps } from "../../../types";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TableDataProps = Pick<
  CourseProps,
  "_id" | "title" | "prefix" | "credits" | "code"
>;

const Courses = () => {
  const { data: courseData, isFetching: getCourseFetching } =
    useGetAllCoursesQuery(undefined);
  const tableData = courseData?.data?.map(
    ({ _id, title, prefix, code }: CourseProps) => ({
      key: _id,
      title,
      code: `${prefix}${code}`,
    })
  );

  const columns: TableColumnsType<TableDataProps> = [
    {
      title: "Course title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Course code",
      key: "code",
      dataIndex: "code",
      render: (code) => {
        return <Tag color="blue">{code} </Tag>;
      },
    },
    {
      title: "Total credit",
      key: "credits",
      dataIndex: "credits",
      sorter: (a, b) => a.credits - b.credits,
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AssignFacultyModal courseInfo={item} />;
      },
    },
  ];

  return (
    <Table
      loading={getCourseFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      style={{ paddingBottom: "20px" }}
    />
  );
};

const AssignFacultyModal = ({ courseInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: facultyData, isFetching: getFacultyFetching } =
    useGetAllFacultiesQuery(undefined);

  const [assignCourseToFaculties] = useAssignCourseToFacultiesMutation();

  const facultyOptions = facultyData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.lastName}`,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Assign course to faculties
  const handleAssignFaculty: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Create new course";
    const assignCourseToFacultiesData = {
      courseId: courseInfo.key,
      data: data,
    };

    try {
      const res = (await assignCourseToFaculties(
        assignCourseToFacultiesData
      )) as ResponseProps<CourseProps>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course assigned successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Assign course to faculties"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <AppForm onSubmit={handleAssignFaculty}>
          <AppSelect
            name="faculties"
            label="Faculties"
            mode="multiple"
            options={facultyOptions}
            isLoading={getFacultyFetching}
            placeholder="Choose pre-requisite courses"
          />

          <Button htmlType="submit" style={{ width: "100%" }} size="large">
            Assign Faculty
          </Button>
        </AppForm>
      </Modal>
    </>
  );
};

export default Courses;
