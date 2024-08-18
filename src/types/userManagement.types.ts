import {
  AcademicDepartmentProps,
  AcademicFacultyProps,
  AcademicSemesterProps,
} from "./academicManagement.types";

export interface NameProps {
  firstName: string;
  lastName: string;
}

export interface GuardianProps {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}
export interface LocalGuardianProps {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface UserProps {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentProps {
  _id: string;
  id: string;
  name: NameProps;
  email: string;
  gender: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: GuardianProps;
  localGuardianProps: LocalGuardianProps;
  bloodGroup: string;
  profileImage: string;
  userProps: UserProps;
  admissionSemester: AcademicSemesterProps;
  academicDepartment: AcademicDepartmentProps;
  academicFaculty: AcademicFacultyProps;
  createdAt: string;
  updatedAt: string;
}

export interface FacultyProps {
  name: NameProps;
  email: string;
  gender: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: string;
  academicFaculty: string;
  academicDepartment: string;
  createdAt: string;
  updatedAt: string;
}
