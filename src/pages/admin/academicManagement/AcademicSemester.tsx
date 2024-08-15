import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemestersQuery(undefined);
  console.log(data);
  return <div>Academic Semester</div>;
};

export default AcademicSemester;
