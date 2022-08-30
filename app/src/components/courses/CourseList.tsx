import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, query, where } from "firebase/firestore";
import { db as firestore } from "../../services/firebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import Loader from "../common/Loader";
import { Course } from "../../types/Course";
import CourseRow from "./CourseRow";

export default function CourseList(): JSX.Element {
  const { user } = useContext(AuthContext);

  // Create a Firestore collection reference
  // @ts-ignore
  const ref = query(
    collection(firestore, "courses"),
    where("owner", "==", user?.uid || "N/A")
  );

  // @ts-ignore
  const firestoreQuery = useFirestoreQuery<Course>(["courses"], ref);

  if (firestoreQuery.isLoading) {
    return <Loader />;
  }

  const snapshot = firestoreQuery.data;

  return (
    <>
      {
        // @ts-ignore
        snapshot.docs.map(function (docSnapshot: {
          data: () => Course;
          id: React.Key | null | undefined;
        }) {
          return CourseRow(docSnapshot.data(), docSnapshot.id);
        })
      }
    </>
  );
}
