import React, { useContext } from "react";
import { db as firestore } from "../services/firebase";
import { Course } from "../types/Course";
import { AuthContext } from "./AuthProvider";
import { collection, query, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import Loader from "../components/common/Loader";

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
