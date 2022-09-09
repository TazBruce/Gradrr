import React, { Key, useContext } from "react";
import { db as firestore } from "../services/firebase";
import { Course } from "../types/Course";
import { AuthContext } from "./AuthProvider";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import Loader from "../components/common/Loader";
import { Assignment } from "../types/Assignment";
import { Subtask } from "../types/Subtask";

/**
 * A React Context that provides the current user's courses.
 * @param getAll Whether to get all courses
 * @param isCurrent Whether to only return courses that are currently active.
 */
export function getAllCourses(
  isCurrent: boolean = true,
  getAll: boolean = false
): Course[] | JSX.Element {
  const { user } = useContext(AuthContext);
  let ref;
  let firestoreQuery;

  if (getAll) {
    ref = query(
      collection(firestore, "courses"),
      where("owner", "==", user?.uid || "N/A")
    );
    // @ts-ignore
    firestoreQuery = useFirestoreQuery<Course>(["all_courses"], ref);
  } else {
    if (isCurrent) {
      ref = query(
        collection(firestore, "courses"),
        where("owner", "==", user?.uid || "N/A"),
        where("final_grade", "==", "")
      );
      // @ts-ignore
      firestoreQuery = useFirestoreQuery<Course>(["current_courses"], ref, {
        subscribe: true,
      });
    } else {
      ref = query(
        collection(firestore, "courses"),
        where("owner", "==", user?.uid || "N/A"),
        where("final_grade", "!=", "")
      );
      // @ts-ignore
      firestoreQuery = useFirestoreQuery<Course>(["past_courses"], ref, {
        subscribe: true,
      });
    }
  }

  if (firestoreQuery.isLoading) {
    return <Loader />;
  }

  const snapshot = firestoreQuery.data;

  return (
    // @ts-ignore
    snapshot.docs.map(function (docSnapshot: {
      data: () => Course;
      id: React.Key | undefined;
    }) {
      let course: Course = docSnapshot.data();
      course.id = docSnapshot.id;
      return course;
    })
  );
}

/**
 * A React Context that provides the user's current assignments.
 */
export function getAllAssignments(): Assignment[] | JSX.Element {
  const { user } = useContext(AuthContext);
  const ref = query(
    collection(firestore, "assignments"),
    where("owner", "==", user?.uid || "N/A"),
    where("is_complete", "==", false),
    orderBy("due_date", "asc")
  );
  const firestoreQuery = useFirestoreQuery<Assignment>(
    ["all_assignments"],
    // @ts-ignore
    ref,
    {
      subscribe: true,
    }
  );

  if (firestoreQuery.isLoading) {
    return <Loader />;
  }

  const snapshot = firestoreQuery.data;

  return (
    // @ts-ignore
    snapshot.docs.map(function (docSnapshot: {
      data: () => Assignment;
      id: React.Key | undefined;
    }) {
      let assignment: Assignment = docSnapshot.data();
      assignment.id = docSnapshot.id;
      return assignment;
    })
  );
}

/**
 * A React Context that provides the user's current subtasks.
 */
export function getAllSubtasks(): Subtask[] | JSX.Element {
  const { user } = useContext(AuthContext);
  const ref = query(
    collection(firestore, "subtasks"),
    where("owner", "==", user?.uid || "N/A"),
    where("is_complete", "==", false),
    orderBy("due_date", "asc")
  );
  const firestoreQuery = useFirestoreQuery<Assignment>(
    ["all_subtasks"],
    // @ts-ignore
    ref,
    {
      subscribe: true,
    }
  );

  if (firestoreQuery.isLoading) {
    return <Loader />;
  }

  const snapshot = firestoreQuery.data;

  return (
    // @ts-ignore
    snapshot.docs.map(function (docSnapshot: {
      data: () => Subtask;
      id: React.Key | undefined;
    }) {
      let subtask: Subtask = docSnapshot.data();
      subtask.id = docSnapshot.id;
      return subtask;
    })
  );
}

/**
 * A React Context that pulls all the assignments for a given course.
 * @param courseId The ID of the course to pull assignments for.
 */
export function getCourseAssignments(
  courseId: Key
): Assignment[] | JSX.Element {
  const { user } = useContext(AuthContext);
  let ref;
  let firestoreQuery;

  ref = query(
    collection(firestore, "assignments"),
    where("owner", "==", user?.uid || "N/A"),
    where("course", "==", courseId),
    orderBy("due_date", "asc")
  );

  firestoreQuery = useFirestoreQuery<Assignment>(
    ["get_assignments", courseId],
    // @ts-ignore
    ref,
    {
      subscribe: true,
    }
  );

  if (firestoreQuery.isLoading) {
    return <Loader />;
  }

  const snapshot = firestoreQuery.data;

  return (
    // @ts-ignore
    snapshot.docs.map(function (docSnapshot: {
      data: () => Assignment;
      id: React.Key | undefined;
    }) {
      let assignment: Assignment = docSnapshot.data();
      assignment.id = docSnapshot.id;
      return assignment;
    })
  );
}

/**
 * A React Context that pulls all the subtasks for a given assignment.
 * @param assignmentId The ID of the assignment to pull subtasks for.
 */
export function getAssignmentSubtasks(
  assignmentId: Key
): Subtask[] | JSX.Element {
  const { user } = useContext(AuthContext);
  let ref;
  let firestoreQuery;

  ref = query(
    collection(firestore, "subtasks"),
    where("owner", "==", user?.uid || "N/A"),
    where("assignment", "==", assignmentId),
    orderBy("due_date", "asc")
  );

  firestoreQuery = useFirestoreQuery<Subtask>(
    ["get_subtasks", assignmentId],
    // @ts-ignore
    ref,
    {
      subscribe: true,
    }
  );

  if (firestoreQuery.isLoading) {
    return <Loader />;
  }

  const snapshot = firestoreQuery.data;

  return (
    // @ts-ignore
    snapshot.docs.map(function (docSnapshot: {
      data: () => Subtask;
      id: React.Key | undefined;
    }) {
      let subtask: Subtask = docSnapshot.data();
      subtask.id = docSnapshot.id;
      return subtask;
    })
  );
}
