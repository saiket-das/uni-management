import { AcademicSemesterProps } from "./academicManagement.types";

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
