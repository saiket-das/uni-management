export const ROUTES = {
  home: "/",
  register: "/register",
  login: "/login",
  change_passwrod: "/change-password",

  admin: "/admin",
  faculty: "/faculty",
  student: "/student",

  dashboard: "/dashboard",
  create_academic_semester: "/create-academic-semester",
  create_academic_faculty: "/create-academic-faculty",
  create_academic_department: "/create-academic-department",
  role_dashboard: (role: string) => `/${role}/dashboard`,
};
