import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { AcademicSemesterProps } from "../../../types/academicManagement.types";
import { useState } from "react";
import { QueryParamProps } from "../../../types";

type TableDataProps = Pick<
  AcademicSemesterProps,
  "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<QueryParamProps[] | undefined>(
    undefined
  );
  const { data: semesterData, isFetching } =
    useGetAllAcademicSemestersQuery(params);

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

  const columns: TableColumnsType<TableDataProps> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
      defaultSortOrder: "descend",
      sorter: (a, b) => parseInt(a.year) - parseInt(b.year),
    },
    {
      title: "Start month",
      dataIndex: "startMonth",
    },
    {
      title: "End month",
      dataIndex: "endMonth",
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
