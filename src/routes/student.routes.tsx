import { ROUTES } from "../constants/route";
import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: ROUTES.dashboard,
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: ROUTES.offered_course,
    element: <OfferedCourse />,
  },
];
