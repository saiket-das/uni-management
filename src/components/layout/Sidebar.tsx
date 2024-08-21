import { Flex, Layout, Menu } from "antd";
import { GraduationCap } from "lucide-react";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import {
  useCurrentToken,
  UserProps,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { USER_ROLE } from "../../constants/role";
import { SidebarItemProps } from "../../types";

const { Sider } = Layout;

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as UserProps;
  }

  let sidebarItems: SidebarItemProps[] | undefined;
  switch (user?.role) {
    case USER_ROLE.admin:
      sidebarItems = sidebarItemsGenerator(adminPaths, USER_ROLE.admin);
      break;
    case USER_ROLE.faculty:
      sidebarItems = sidebarItemsGenerator(facultyPaths, USER_ROLE.faculty);
      break;
    case USER_ROLE.student:
      sidebarItems = sidebarItemsGenerator(studentPaths, USER_ROLE.student);
      break;
    default:
      sidebarItems = [];
      break;
  }

  return (
    <Sider
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex align="center" gap={10}>
          <GraduationCap size={36} />
          <h1>Uni Managment</h1>
        </Flex>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        // color="blue"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
