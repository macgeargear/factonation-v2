import { CourseDto } from "./dto";
import { _DataState } from "./hook";

export interface CourseListHook extends _DataState<CourseDto[]> {
  setData: React.Dispatch<React.SetStateAction<CourseDto[]>>;
}
