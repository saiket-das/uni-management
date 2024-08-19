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
