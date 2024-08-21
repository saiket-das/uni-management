export const ROUTES = {
  home: "/",
  register: "/register",
  login: "/login",
  change_passwrod: "/change-password",

  faculty: "/faculty",
  student: "/student",

  // ADMIN
  admin: "/admin",
  dashboard: "dashboard",
  create_academic_semester: "create-academic-semester",
  create_academic_faculty: "create-academic-faculty",
  create_academic_department: "create-academic-department",

  // STUDENT
  offered_course: "offered-course",

  role_dashboard: (role: string) => `/${role}/dashboard`,
};
