import { Types } from 'mongoose';

export interface PreRequisiteCoursesProps {
  course: Types.ObjectId;
  isDeleted: boolean;
}

export interface CourseProps {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: PreRequisiteCoursesProps[];
}
