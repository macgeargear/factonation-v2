import useSWR from "swr";
import { host } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useInstructor(): {
  instructors: { status: string; data: { name: string; id: string }[] };
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error, isLoading } = useSWR(
    `http://${host}/user/ins/instructor`,
    fetcher
  );
  return {
    instructors: data,
    isLoading,
    isError: error,
  };
}
