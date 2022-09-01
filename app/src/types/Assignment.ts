import { Course } from "./Course";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

/**
 * An assignment within a course.
 */
export type Assignment = {
  /**
   * The name of the assignment
   */
  title: string;
  /**
   * The course the assignment is in
   */
  course: Course;
  /**
   * The weight of the assignment
   */
  weight: number;
  /**
   * The date the assignment is due
   */
  due_date: Timestamp;
  /**
   * Whether the assignment has been completed
   */
  is_complete: boolean;
  /**
   * The maximum amount of marks the assignment can receive
   */
  max_marks: number;
  /**
   * The amount of marks the assignment has received
   */
  earned_marks: number;
};
