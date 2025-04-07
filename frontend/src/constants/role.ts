export const USER_ROLE = {
  superAdmin: "superAdmin",
  student: "student",
  faculty: "faculty",
  admin: "admin",
} as const;

export type UserRoleProps = keyof typeof USER_ROLE;
