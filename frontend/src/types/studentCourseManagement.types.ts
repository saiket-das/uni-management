import {
  AcademicDepartmentProps,
  AcademicFacultyProps,
  AcademicSemesterProps,
} from "./academicManagement.types";
import {
  CourseProps,
  OfferedCourseProps,
  SemesterResgistrationProps,
} from "./courseManagement.types";
import { FacultyProps, StudentProps } from "./userManagement.types";

export interface MyOfferedCourseProps {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: CourseProps;
  faculty: string;
  section: string;
  days: string[];
  maxCapacity: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
}

export interface EnrolledCourseProps {
  _id: string;
  semesterRegistration: SemesterResgistrationProps;
  academicSemester: AcademicSemesterProps;
  academicFaculty: AcademicFacultyProps;
  academicDepartment: AcademicDepartmentProps;
  offeredCourse: OfferedCourseProps;
  course: CourseProps;
  student: StudentProps;
  faculty: FacultyProps;
  isEnrolled: boolean;
  courseMarks: CourseMarksProps;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
}

export interface CourseMarksProps {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
}
