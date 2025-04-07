import { Button, Col, Flex, Row, Spin, Tag } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyAllOfferedCourseQuery,
} from "../../redux/features/student/studentCourseManagementApi";
import { ClockCircleOutlined } from "@ant-design/icons";

interface SectionProps {
  section: string;
  _id: string;
  days: string[];
  startTime: string;
  endTime: string;
}
interface CourseSections {
  courseTitle: string;
  sections: SectionProps[];
}

interface CourseProps {
  [key: string]: CourseSections;
}

const OfferedCourses = () => {
  const [enrollCourse] = useEnrollCourseMutation();
  const { data: offeredCourseData, isFetching } =
    useGetMyAllOfferedCourseQuery(undefined);

  const singleObject = offeredCourseData?.data?.reduce(
    (acc: CourseProps, item) => {
      const key = item.course.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };
      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });
      return acc;
    },
    {}
  );
  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const enrollData = {
      offeredCourse: id,
    };
    console.log(enrollData);
    const res = await enrollCourse(enrollData);
    console.log(res);
  };

  if (isFetching) {
    return (
      <Flex align="center" justify="center">
        <Spin />
      </Flex>
    );
  }
  if (!modifiedData.length) {
    return (
      <Flex align="center" justify="center" vertical>
        <p>No available courses</p>
      </Flex>
    );
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item, index) => {
        return (
          <Col
            key={index}
            span={24}
            style={{ border: "solid #d4d4d4 1px", borderRadius: 10 }}
          >
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section: SectionProps, index) => {
                return (
                  <Row
                    key={index}
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 1px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section?.section} </Col>
                    <Col span={5}>
                      Days:
                      {section.days.map((day: string, index) => (
                        <span key={index}> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>
                      Start time:{" "}
                      <Tag icon={<ClockCircleOutlined />} color="green">
                        {section?.startTime}
                      </Tag>
                    </Col>
                    <Col span={5}>
                      End time:{" "}
                      <Tag icon={<ClockCircleOutlined />} color="blue">
                        {section?.endTime}
                      </Tag>
                    </Col>
                    <Button onClick={() => handleEnroll(section?._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourses;
