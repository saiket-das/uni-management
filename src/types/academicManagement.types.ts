export type AcademicSemesterProps = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AcademicFacultyProps = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AcademicDepartmentProps = {
  _id: string;
  name: string;
  academicFaculty: AcademicFacultyProps;
  createdAt: string;
  updatedAt: string;
};
