import {
  Button,
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

type TableDataProps = Pick<
  StudentProps,
  "name" | "id" | "email" | "gender" | "bloodGroup"
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
      ({ _id, name, id, email, gender, bloodGroup }: StudentProps) => ({
        key: _id,
        _id,
        name,
        id,
        email,
        gender,
        bloodGroup,
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
      title: "Blood group",
      key: "bloodGroup",
      dataIndex: "bloodGroup",
    },
    {
      title: "Action",
      key: "X",
      width: "1%",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
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
      />
      <Pagination
        onChange={(page) => setCurrentPage(page)}
        current={currentPage}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentList;
