/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import AddCourseForm from "@/components/AddCourseForm";
import AddLessonForm from "@/components/AddLessonForm";
import { useCourses } from "@/hooks/useCourses";
import { useLessons } from "@/hooks/useLessons";
import { CourseDto, LessonDto } from "@/types/dto";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  const { courses, isError, isLoading } = useCourses();
  const [lessons, setLessons] = useState<LessonDto[]>([]);
  console.log(courses);
  return (
    <div>
      <div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Courses
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                ตารางแสดงรายละเอียดของแต่ละคอร์ส
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <AddCourseForm />
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <table className="w-full text-left">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                  >
                    Instructor
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Lessons
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses?.data.map((course) => (
                  <tr key={course.id}>
                    <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                      {course.courseName}
                      <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {course.id}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                      {course.instructor.name}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                      {course.lessons.length}
                    </td>

                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                        <span className="sr-only">, {course.courseName}</span>
                      </Link>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href="#"
                        className="text-red-600 hover:text-red-900"
                        onClick={async () => {
                          await fetch(`http://localhost/course/${course.id}`, {
                            method: "DELETE",
                          });
                        }}
                      >
                        Delete
                        <span className="sr-only">, {course.courseName}</span>
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <AddLessonForm
                        lessons={lessons}
                        setLessons={setLessons}
                        courseId={course.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
