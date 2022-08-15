/**
 * A course within the app.
 */
export type Course = {
  /**
   * The ID of the course
   */
  id: string;
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
  year: number;
  /**
   * The final grade the course receives
   */
  grade: string;
};
