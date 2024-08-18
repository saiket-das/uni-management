import {
  Button,
  Flex,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { QueryParamProps } from "../../../types";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { NameProps, StudentProps } from "../../../types/userManagement.types";
import { DeleteOutlined } from "@ant-design/icons";
import { AcademicDepartmentProps } from "../../../types/academicManagement.types";
import { Link } from "react-router-dom";

type TableDataProps = Pick<
  StudentProps,
  "name" | "id" | "email" | "gender" | "bloodGroup" | "contactNumber"
>;

const StudentList = () => {
  const [params, setParams] = useState<QueryParamProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: studentsData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 2 },
    { name: "page", value: currentPage },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentsData?.meta;

  const tableData =
    studentsData?.data &&
    studentsData?.data?.map(
      ({
        _id,
        name,
        id,
        email,
        gender,
        bloodGroup,
        contactNumber,
        academicDepartment,
      }: StudentProps) => ({
        key: _id,
        _id,
        name,
        id,
        email,
        gender,
        bloodGroup,
        contactNumber,
        academicDepartment,
      })
    );

  const columns: TableColumnsType<TableDataProps> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (name: NameProps) => `${name.firstName} ${name.lastName}`,
    },
    {
      title: "Student ID",
      key: "id",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      render: (gender: string) =>
        `${gender.charAt(0).toUpperCase() + gender.slice(1)}`,
    },
    {
      title: "Contact number",
      key: "contactNumber",
      dataIndex: "contactNumber",
      render: (contactNumber: string) => `+60-${contactNumber}`,
    },
    {
      title: "A cademic department",
      key: "academicDepartment",
      dataIndex: "academicDepartment",
      render: (department: AcademicDepartmentProps) => `${department.name}`,
    },
    {
      title: "Action",
      key: "X",
      width: "1%",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/students/${item.key}`}>
              <Button>Details</Button>
            </Link>

            <Link to={item._id}>
              <Button>Update</Button>
            </Link>
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<TableDataProps>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: QueryParamProps[] = [];

      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
        style={{ paddingBottom: "20px" }}
      />
      <Flex align="center" vertical>
        <Pagination
          onChange={(page) => setCurrentPage(page)}
          current={currentPage}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
      </Flex>
    </>
  );
};

export default StudentList;
