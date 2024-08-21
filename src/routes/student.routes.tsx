import { BookCheck, BookOpenText, LayoutDashboard } from "lucide-react";
import { ROUTES } from "../constants/route";
import EnrolledCourse from "../pages/student/EnrolledCourse";
import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: ROUTES.dashboard,
    element: <StudentDashboard />,
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Offered Course",
    path: ROUTES.offered_course,
    element: <OfferedCourse />,
    icon: <BookCheck size={20} />,
  },
  {
    name: "Enrolled Courses",
    path: ROUTES.enrolled_course,
    element: <EnrolledCourse />,
    icon: <BookOpenText size={20} />,
  },
];
