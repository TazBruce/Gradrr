import { Key } from "react";
import { Timestamp } from "firebase/firestore";

export type Subtask = {
  /**
   * The id of the subtask
   */
  id?: Key;
  /**
   * The owner of the subtask
   */
  owner: string;
  /**
   * The assignment of the subtask
   */
  assignment?: Key;
  /**
   * The name of the subtask
   */
  title: string;
  /**
   * The date the subtask is due
   */
  due_date: Timestamp | Date | null;
  /**
   * Whether the subtask has been completed
   */
  is_complete: boolean;
};

export const initialSubtask: Subtask = {
  id: "",
  owner: "",
  title: "",
  due_date: null,
  is_complete: false,
};
