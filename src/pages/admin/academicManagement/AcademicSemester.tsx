import { Table, TableColumnsType } from "antd";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { AcademicSemesterProps } from "../../../types/academicManagement.types";

interface DataType {
  // key: React.Key;
  name: string;
  year: string;
  startMonth: string;
  endMonth: string;
}

const AcademicSemester = () => {
  const { data: semesterData } = useGetAllAcademicSemestersQuery(undefined);
  const tableData =
    semesterData?.data &&
    semesterData?.data.map(
      ({ _id, name, year, startMonth, endMonth }: AcademicSemesterProps) => ({
        key: _id,
        _id,
        name,
        year,
        startMonth,
        endMonth,
      })
    );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      defaultSortOrder: "descend",
      sorter: (a, b) => parseInt(a.year) - parseInt(b.year),
    },
    {
      title: "Start month",
      dataIndex: "startMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) =>
        record.startMonth.indexOf(value as string) === 0,
    },
    {
      title: "End month",
      dataIndex: "endMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) =>
        record.endMonth.indexOf(value as string) === 0,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
