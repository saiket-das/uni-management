import {
  AcademicDepartmentProps,
  AcademicFacultyProps,
  AcademicSemesterProps,
} from "./academicManagement.types";
import { FacultyProps } from "./userManagement.types";

export interface SemesterResgistrationProps {
  _id: string;
  academicSemester: AcademicSemesterProps;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
}

export interface CourseProps {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: PreRequisiteCourseProps[];
}

export interface PreRequisiteCourseProps {
  course: string;
}

export interface OfferedCourseProps {
  semesterRegistration: SemesterResgistrationProps;
  academicFaculty: AcademicFacultyProps;
  academicDepartment: AcademicDepartmentProps;
  course: CourseProps;
  faculty: FacultyProps;
  section: string;
  days: string[];
  maxCapacity: number;
  startTime: string;
  endTime: string;
}
