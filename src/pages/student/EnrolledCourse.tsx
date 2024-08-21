import { useGetMyAllEnrolledCourseQuery } from "../../redux/features/student/studentCourseManagementApi";

const EnrolledCourse = () => {
  const { data: enrolledCourse } = useGetMyAllEnrolledCourseQuery(undefined);

  console.log(enrolledCourse);
  return (
    <div>
      {enrolledCourse?.data?.map((item) => {
        return (
          <div>
            <div>{item.course.title}</div>
            <div>{item.offeredCourse.section}</div>
            <div>
              {item.offeredCourse.days.map((item) => (
                <span> {item}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnrolledCourse;
