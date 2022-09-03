import { Key } from "react";
import { Assignment } from "./Assignment";

/**
 * A course within the app.
 */
export type Course = {
  /**
   * The id of the course
   */
  id?: Key;
  /**
   * The owner of the course
   */
  owner: string;
  /**
   * The name of the course
   */
  title: string;
  /**
   * The description of the course
   */
  description: string;
  /**
   * The year of study the course is in
   */
  year_of_study: string;
  /**
   * The final grade the course receives
   */
  final_grade: string;
};

export const initialCourse: Course = {
  id: "",
  owner: "",
  title: "",
  description: "",
  year_of_study: "",
  final_grade: "",
};

export type CourseStackParamList = {
  AllCourses: undefined;
  CreateCourse: { course: Course } | undefined;
  ViewCourse: { course: Course };
  CreateAssignment:
    | { courseID: Key | undefined; assignment: Assignment }
    | undefined;
  ViewAssignment: { assignment: Assignment };
};
