/**
 * A course within the app.
 */
class Course {
  /**
   * The ID of the course
   */
  id: string;
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

  /**
   * The constructor for the Course class
   * @param id
   * @param title
   * @param description
   * @param year
   * @param grade
   */
  constructor(
    id: string,
    title: string,
    description: string,
    year: number,
    grade: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.year = year;
    this.grade = grade;
  }
}
