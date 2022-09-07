import { Timestamp } from "firebase/firestore";
import { Key } from "react";

/**
 * An assignment within a course.
 */
export type Assignment = {
  /**
   * The id of the assignment
   */
  id?: Key;
  /**
   * The owner of the assignment
   */
  owner: string;
  /**
   * The name of the assignment
   */
  title: string;
  /**
   * The description of the assignment
   */
  description: string;
  /**
   * The course the assignment is in
   */
  course?: Key;
  /**
   * The weight of the assignment
   */
  weight: number;
  /**
   * The date the assignment is due
   */
  due_date: Timestamp | Date | null;
  /**
   * Whether the assignment has been completed
   */
  is_complete: boolean;
  /**
   * Whether the grade is a percentage or a letter
   */
  is_letter_grade: boolean;
  /**
   * The grade the assignment received (if letter grade)
   */
  grade: string;
  /**
   * The maximum amount of marks the assignment can receive
   */
  max_marks: number | null;
  /**
   * The amount of marks the assignment has received
   */
  earned_marks: number | null;
};

export const initialAssignment: Assignment = {
  id: "",
  owner: "",
  title: "",
  description: "",
  course: "",
  weight: 0,
  due_date: null,
  is_complete: false,
  is_letter_grade: false,
  grade: "",
  max_marks: null,
  earned_marks: null,
};
