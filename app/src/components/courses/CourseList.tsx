import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, query, where } from "firebase/firestore";
import { db as firestore } from "../../services/firebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import Loader from "../common/Loader";
import { Course } from "../../types/Course";
import CourseRow from "./CourseRow";
import { ScrollView, VStack } from "native-base";

export default function CourseList(isCurrent: boolean): JSX.Element {
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
    firestoreQuery = useFirestoreQuery<Course>(["current_courses"], ref);
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

  const courses = function () {
    return (
      // @ts-ignore
      snapshot.docs.map(function (docSnapshot: {
        data: () => Course;
        id: React.Key | null | undefined;
      }) {
        return CourseRow(docSnapshot.data(), docSnapshot.id);
      })
    );
  };

  return (
    <>
      {
        <ScrollView h="80">
          <VStack space={4}>{courses()}</VStack>
        </ScrollView>
      }
    </>
  );
}
