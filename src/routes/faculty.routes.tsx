import { ROUTES } from "../constants/route";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: ROUTES.dashboard,
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Course",
    path: ROUTES.offered_course,
    element: <FacultyDashboard />,
  },
];
