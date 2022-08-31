/**
 * A course within the app.
 */
export type Course = {
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
  owner: "",
  title: "",
  description: "",
  year_of_study: "",
  final_grade: "",
};

export type CourseStackParamList = {
  AllCourses: undefined;
  CreateCourse: undefined;
  ViewCourse: { course: Course };
};
