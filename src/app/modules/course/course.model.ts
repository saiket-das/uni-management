import { model, Schema, Types } from 'mongoose';
import { CourseProps, PreRequisiteCoursesProps } from './course.interface';

const preRequisiteCoursesPropsSchema = new Schema<PreRequisiteCoursesProps>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const courseSchema = new Schema<CourseProps>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourses: [preRequisiteCoursesPropsSchema],
});

export const CourseModel = model<CourseProps>('Course', courseSchema);
