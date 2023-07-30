import { FC } from "react";
import Details from "@/components/courseOverviewPage/Details";
import Header from "@/components/courseOverviewPage/Header";
import { host } from "@/lib/utils";
import axios from "axios";
import { CourseDto } from "@/types/dto";

interface indexProps {
  params: { courseId: string };
  course: CourseDto;
}

export async function getStaticPaths() {
  const res = await axios.get(`http://${host}/course`);
  const courses = res.data.data;
  const paths = courses.map((course: CourseDto) => ({
    params: { courseId: course.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: indexProps) {
  const res = await axios.get(`http://${host}/course/${params.courseId}`);
  const course = res.data.data;
  return { props: { course } };
}

const index: FC<indexProps> = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Details course={course} />
    </>
  );
};

export default index;
