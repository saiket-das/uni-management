import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import StudentList from "../pages/admin/userManagement/StudentList";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import Courses from "../pages/admin/courseManagement/Courses";
import RegisteredSemester from "../pages/admin/courseManagement/RegisteredSemester";
import CreateOfferedCourse from "../pages/admin/courseManagement/CreateOfferedCourse";
import { ROUTES } from "../constants/route";
import { DashboardFilled } from "@ant-design/icons";
import { BookOpen, LayoutDashboard, School, UserRound } from "lucide-react";

export const adminPaths = [
  {
    name: "Dashboard",
    path: ROUTES.dashboard,
    element: <AdminDashboard />,
    icon: <LayoutDashboard size={16} />,
  },
  {
    name: "Academic Management",
    icon: <School size={16} />,
    children: [
      {
        name: "Create Academic Semester",
        path: ROUTES.create_academic_semester,
        element: <CreateAcademicSemester />,
        icon: <DashboardFilled />,
      },
      {
        name: "Create Academic Faculty",
        path: ROUTES.create_academic_faculty,
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Create Academic Department",
        path: ROUTES.create_academic_department,
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    icon: <UserRound size={16} />,
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students",
        element: <StudentList />,
      },
      {
        path: "students/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
  {
    name: "Course Management",
    icon: <BookOpen size={16} />,
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },

      {
        name: "Create Offered Course",
        path: "create-offered-courses",
        element: <CreateOfferedCourse />,
      },
    ],
  },
];
