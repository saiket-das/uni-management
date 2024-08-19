import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import {
  useGetAllSemesterResgistrationQuery,
  useUpdateSemesterResgistrationMutation,
} from "../../../redux/features/admin/courseManagementApi";
import { SemesterResgistrationProps } from "../../../types/courseManagement.types";
import moment from "moment";
import { RegistrationStatus } from "../../../constants/semester";
import { useState } from "react";
import { ResponseProps } from "../../../types";
import { toast } from "sonner";

const items: MenuProps["items"] = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

type TableDataProps = Pick<
  SemesterResgistrationProps,
  "status" | "startDate" | "endDate" | "minCredit" | "maxCredit"
>;

const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");

  const { data: registeredSemesterData, isFetching: getFetching } =
    useGetAllSemesterResgistrationQuery(undefined);

  const [updateSemesterStatus, { isLoading: updateLoading }] =
    useUpdateSemesterResgistrationMutation();
  // Update status details
  const handleStatusUpdate = async (data: { key: string }) => {
    const toastId = "Update registered semester status";
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    // console.log(updateData);
    try {
      const res = (await updateSemesterStatus(
        updateData
      )) as ResponseProps<SemesterResgistrationProps>;
      console.log(res.error);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Registered Semester's status updated successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const tableData =
    registeredSemesterData?.data &&
    registeredSemesterData?.data?.map(
      ({
        _id,
        academicSemester,
        status,
        startDate,
        endDate,
        minCredit,
        maxCredit,
      }: SemesterResgistrationProps) => ({
        key: _id,
        _id,
        name: academicSemester.name + " " + academicSemester.year,
        status,
        startDate: moment(new Date(startDate)).format("MMMM"),
        endDate: moment(new Date(endDate)).format(" MMMM"),
        minCredit: minCredit,
        maxCredit: maxCredit,
      })
    );

  const columns: TableColumnsType<TableDataProps> = [
    {
      title: "Academic Semester",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        if (status === RegistrationStatus.UPCOMING) {
          color = "blue";
        }
        if (status === RegistrationStatus.ONGOING) {
          color = "green";
        }
        if (status === RegistrationStatus.ENDED) {
          color = "red";
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Start Month",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Month",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Min Credit",
      key: "minCredit",
      dataIndex: "minCredit",
    },
    {
      title: "Max Credit",
      key: "maxCredit",
      dataIndex: "maxCredit",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <>
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button onClick={() => setSemesterId(item.key)}>Update</Button>
            </Dropdown>
          </>
          // <Dropdown.Button
          //   onClick={() => setSemesterId(item.key)}
          //   menu={menuProps}
          //   trigger={["click"]}
          // >
          //   Update
          // </Dropdown.Button>
        );
      },
    },
  ];

  return (
    <Table
      loading={getFetching || updateLoading}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
      pagination={false}
      style={{ paddingBottom: "20px" }}
    />
  );
};

export default RegisteredSemester;
