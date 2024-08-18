import { useParams } from "react-router-dom";
import { useGetStudentByIdQuery } from "../../../redux/features/admin/userManagementApi";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data: StudentDeatils } = useGetStudentByIdQuery(studentId);

  console.log(StudentDeatils.data);
  return (
    <div>
      <h1>Student details</h1>
      <p>{StudentDeatils.data.email}</p>
    </div>
  );
};

export default StudentDetails;
