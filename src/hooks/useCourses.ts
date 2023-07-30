"use client";
import { CourseDto } from "@/types/dto";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCourses(): {
  courses: { status: string; data: CourseDto[] };
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR("http://${host}/course", fetcher);
  return {
    courses: data,
    isLoading,
    isError: error,
  };
}

const userFetcher = (url: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then((res) => res.json());

export function useUsersCourses(): {
  courses: { status: string; data: CourseDto[] };
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR(
    "http://${host}/course/student/enrolled",
    userFetcher
  );
  return {
    courses: data,
    isLoading,
    isError: error,
  };
}
