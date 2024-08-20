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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // Admin routes
  {
    path: "/admin",

    element: (
      <ProtectedRoute role={USER_ROLE.admin}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },

  // Faculty routes
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role={USER_ROLE.faculty}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(facultyPaths),
  },

  // Student routes
  {
    path: "/student",
    element: (
      <ProtectedRoute role={USER_ROLE.student}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(studentPaths),
  },

  // Authentication
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
