import React, { useContext } from "react";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { AuthContext } from "./AuthProvider";
import { query, collection, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Course } from "../types/Course";
import { db } from "../services/firebase";
import { Center, Spinner } from "native-base";

const firestore = db;

export function getCourses() {
  const { user } = useContext(AuthContext);

  // Define a query reference using the Firebase SDK
  const ref = query(
    collection(firestore, "courses"),
    where("owner", "==", user?.uid || "N/A")
  );

  // Provide the query to the hook
  const hookQuery = useFirestoreQuery(["courses"], ref);

  if (hookQuery.isLoading) {
    return (
      <Center flex={1}>
        <Spinner testID="loader" size="lg" />
      </Center>
    );
  }

  const snapshot = hookQuery.data;

  // @ts-ignore
  return snapshot.docs.map(
    (docSnapshot: { data: () => any; id: React.Key | null | undefined }) => {
      const data = docSnapshot.data();

      return <div key={docSnapshot.id}>{data.name}</div>;
    }
  );
}
