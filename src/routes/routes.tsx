import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/login/Login";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { USER_ROLE } from "../constants/role";
import ChangePassword from "../pages/student/ChangePassword";
import { ROUTES } from "../constants/route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // Admin routes
  {
    path: ROUTES.admin,
    element: (
      <ProtectedRoute role={USER_ROLE.admin}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },

  // Faculty routes
  {
    path: ROUTES.faculty,
    element: (
      <ProtectedRoute role={USER_ROLE.faculty}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(facultyPaths),
  },

  // Student routes
  {
    path: ROUTES.student,
    element: (
      <ProtectedRoute role={USER_ROLE.student}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(studentPaths),
  },

  // Authentication
  {
    path: ROUTES.register,
    element: <Register />,
  },
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.change_passwrod,
    element: <ChangePassword />,
  },
]);

export default router;
