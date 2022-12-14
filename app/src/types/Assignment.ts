import { Timestamp } from "firebase/firestore";
import { Key } from "react";
import { Subtask } from "./Subtask";

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
   * The maximum amount of marks the assignment can receive
   */
  max_marks: number | null;
  /**
   * The amount of marks the assignment has received
   */
  earned_marks: number | null;
  /**
   * The grade the assignment received
   */
  grade: string;
  /**
   * The percentage the assignment has received
   */
  percentage: number | null;
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
  max_marks: null,
  earned_marks: null,
  percentage: null,
  grade: "",
};

/**
 * Formats the due date of an assignment or subtask
 * @param assignment The assignment or subtask to format the due date of
 */
export const getDueDate = (assignment: Assignment | Subtask) => {
  if (assignment.due_date) {
    let date;
    if (assignment.due_date instanceof Timestamp) {
      date = assignment.due_date.toDate().toDateString();
    } else {
      date = assignment.due_date.toDateString();
    }
    return date.substring(0, date.length - 4);
  } else {
    return "N/A";
  }
};

/**
 * Formats the weight of an assignment
 * @param assignment The assignment to format the weight of
 */
export const getWeight = (assignment: Assignment) => {
  if (assignment.weight) {
    return assignment.weight + "%";
  } else {
    return "0%";
  }
};

/**
 * Formats the trailing decimals of a number
 * @param num The number to format
 */
export const removeTrailingDecimals = (num: number | null) => {
  if (num) {
    return num % 1 === 0 ? num : num.toFixed(2);
  }
  return num;
};

/**
 * Calculates the percentage of a given grade or mark
 * @param weight The weight of the assignment
 * @param grade The grade of the assignment
 * @param earned_marks The amount of marks the assignment has received
 * @param max_marks The maximum amount of marks the assignment can receive
 */
export const getPercentage = (
  weight: number | null = null,
  grade: string = "",
  earned_marks: number | null = null,
  max_marks: number | null = null
): number => {
  if (weight) {
    if (earned_marks && max_marks) {
      return (earned_marks / max_marks) * weight;
    } else if (grade) {
      return convertToPercentage(grade) * weight;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

/**
 * Converts a percentage or mark into a grade
 * @param grade The grade to convert
 * @param earned_marks The amount of marks the assignment has received
 * @param max_marks The maximum amount of marks the assignment can receive
 */
export const getGrade = (
  grade: string = "",
  earned_marks: number | null = null,
  max_marks: number | null = null
): string => {
  if (grade) {
    return grade;
  } else if (earned_marks && max_marks) {
    return convertToGrade(earned_marks / max_marks);
  } else {
    return "N/A";
  }
};

/**
 * Converts a grade into a percentage
 * @param grade The grade to convert
 */
export const convertToPercentage = (grade: string): number => {
  switch (grade) {
    case "A+":
      return 0.95;
    case "A":
      return 0.87;
    case "A-":
      return 0.82;
    case "B+":
      return 0.77;
    case "B":
      return 0.72;
    case "B-":
      return 0.67;
    case "C+":
      return 0.62;
    case "C":
      return 0.57;
    case "C-":
      return 0.52;
    case "D":
      return 0.45;
    default:
      return 0.2;
  }
};

/**
 * Converts a percentage into a grade
 * @param percentage The percentage to convert
 */
export const convertToGrade = (percentage: number): string => {
  if (percentage >= 0.9) {
    return "A+";
  } else if (percentage >= 0.85) {
    return "A";
  } else if (percentage >= 0.8) {
    return "A-";
  } else if (percentage >= 0.75) {
    return "B+";
  } else if (percentage >= 0.7) {
    return "B";
  } else if (percentage >= 0.65) {
    return "B-";
  } else if (percentage >= 0.6) {
    return "C+";
  } else if (percentage >= 0.55) {
    return "C";
  } else if (percentage >= 0.5) {
    return "C-";
  } else if (percentage >= 0.4) {
    return "D";
  } else {
    return "E";
  }
};
