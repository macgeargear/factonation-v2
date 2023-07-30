/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ModuleCard from "./ModuleCard";
import { IBM_Plex_Sans_Thai } from "next/font/google";

const imb_plex_sans_thai = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: ["100", "200", "400", "600"],
});

import { FC } from "react";
import { useCourses } from "@/hooks/useCourses";
import axios from "axios";
import { host } from "@/lib/utils";
import { CourseDto } from "@/types/dto";

interface indexProps {
  courses: CourseDto[];
}

export const getStaticProps = async () => {
  const res = await axios.get(`http://${host}/course`);
  const courses = await res.data.data;
  return { props: { courses } };
};

const index: FC<indexProps> = ({ courses }) => {
  //   const { courses, isError, isLoading } = useCourses();
  //   if (isError) return <h1>error</h1>;
  //   if (isLoading) return <h1>Loading....</h1>;
  console.log(courses);
  return (
    <div className="imb_plex_sans_thai">
      {/* <ModuleCard /> */}
      <div className="flex justify-center my-10">
        <div className="flex flex-col gap-10 w-9/12 ">
          <div className="flex gap-2">
            <p className="text-3xl font-black">|</p>
            <p className="text-4xl font-bold">แนะนำคอร์สเรียน</p>
          </div>

          {courses.map((course, i) => {
            return <ModuleCard course={course} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default index;
