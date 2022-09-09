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
  /**
   * The current percentage of the course
   */
  current_percentage: number;
  /**
   * Total weights of the course
   */
  total_weight: number;
  /**
   * Graded weights of the course
   */
  graded_weight: number;
};

export const initialCourse: Course = {
  id: "",
  owner: "",
  title: "",
  description: "",
  year_of_study: "",
  final_grade: "",
  current_percentage: 0,
  total_weight: 0,
  graded_weight: 0,
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

/**
 * Function that converts a letter grade to its corresponding GPA value
 */
export function letterGradeToGPA(grade: string): number {
  switch (grade) {
    case "A+":
      return 9;
    case "A":
      return 8;
    case "A-":
      return 7;
    case "B+":
      return 6;
    case "B":
      return 5;
    case "B-":
      return 4;
    case "C+":
      return 3;
    case "C":
      return 2;
    case "C-":
      return 1;
    default:
      return 0;
  }
}
