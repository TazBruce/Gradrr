/**
 * An assignment within a course.
 */
class Assignment {
  /**
   * The ID of the assignment
   */
  id: string;
  /**
   * The name of the assignment
   */
  title: string;
  /**
   * The weight of the assignment
   */
  weight: number;
  /**
   * The course the assignment is in
   */
  course: Course;
  /**
   * The date the assignment is due
   */
  dueDate: Date;
  /**
   * Whether the assignment has been completed
   */
  completed: boolean;
  /**
   * The maximum amount of marks the assignment can receive
   */
  maxMarks: number;
  /**
   * The amount of marks the assignment has received
   */
  marks: number;

  constructor(
    id: string,
    title: string,
    weight: number,
    course: Course,
    dueDate: Date,
    completed: boolean,
    maxMarks: number,
    marks: number
  ) {
    this.id = id;
    this.title = title;
    this.weight = weight;
    this.course = course;
    this.dueDate = dueDate;
    this.completed = completed;
    this.maxMarks = maxMarks;
    this.marks = marks;
  }
}
