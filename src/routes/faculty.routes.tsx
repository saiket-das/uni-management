import { BookOpen, LayoutDashboard } from "lucide-react";
import { ROUTES } from "../constants/route";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: ROUTES.dashboard,
    element: <FacultyDashboard />,
    icon: <LayoutDashboard size={16} />,
  },
  {
    name: "My Courses",
    path: ROUTES.my_course,
    element: <MyCourses />,
    icon: <BookOpen size={16} />,
  },
];
