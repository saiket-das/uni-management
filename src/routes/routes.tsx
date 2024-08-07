import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/login/Login";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  // Admin routes
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },

  // Faculty routes
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyPaths),
  },

  // Student routes
  {
    path: "/student",
    element: <App />,
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
