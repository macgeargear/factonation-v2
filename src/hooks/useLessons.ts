import useSWR from "swr";
import { LessonDto } from "@/types/dto";
import { host } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLessons(courseId: string): {
  lessons: { status: string; data: LessonDto[] };
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR(
    `http://${host}/lesson/course${courseId}`,
    fetcher
  );
  return {
    lessons: data,
    isLoading,
    isError: error,
  };
}
