import React, { Key, useContext } from "react";
import { db as firestore } from "../services/firebase";
import { Course } from "../types/Course";
import { AuthContext } from "./AuthProvider";
import { collection, doc, query, where } from "firebase/firestore";
import {
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import Loader from "../components/common/Loader";
import { Assignment } from "../types/Assignment";

/**
 * A React Context that provides the current user's courses.
 * @param isCurrent Whether to only return courses that are currently active.
 */
export function getAllCourses(isCurrent: boolean): Course[] | JSX.Element {
  const { user } = useContext(AuthContext);
  let ref;
  let firestoreQuery;

  // Create a Firestore collection reference
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
    firestoreQuery = useFirestoreQuery<Course>(["past_courses"], ref);
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
    where("course", "==", courseId)
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
