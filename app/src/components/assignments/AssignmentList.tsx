import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, query, where } from "firebase/firestore";
import { db as firestore } from "../../services/firebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import Loader from "../common/Loader";
import { Course, CourseStackParamList } from "../../types/Course";
import AssignmentRow from "./AssignmentRow";
import { ScrollView, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Assignment } from "../../types/Assignment";

export default function AssignmentList(course: Course): JSX.Element {
  const { user } = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<CourseStackParamList>>();

  let ref;
  let firestoreQuery;

  ref = query(
    collection(firestore, "assignments"),
    where("owner", "==", user?.uid || "N/A"),
    where("course", "==", course.id)
  );

  firestoreQuery = useFirestoreQuery<Assignment>(
    [course.id + "_assignments"],
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

  const assignments = function () {
    return (
      // @ts-ignore
      snapshot.docs.map(function (docSnapshot: {
        data: () => Assignment;
        id: React.Key | undefined;
      }) {
        return AssignmentRow(navigation, docSnapshot.data(), docSnapshot.id);
      })
    );
  };

  return (
    <>
      {
        <ScrollView h="80">
          <VStack space={4}>{assignments()}</VStack>
        </ScrollView>
      }
    </>
  );
}
