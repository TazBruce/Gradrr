import React, { useContext } from "react";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { AuthContext } from "./AuthProvider";
import { query, collection, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Course } from "../types/Course";
import firebase from "../services/firebase";

const firestore = getFirestore(firebase);

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
    return <div>Loading...</div>;
  }

  const snapshot = hookQuery.data;

  return snapshot.docs.map(
    (docSnapshot: { data: () => any; id: React.Key | null | undefined }) => {
      const data = docSnapshot.data();

      return <div key={docSnapshot.id}>{data.name}</div>;
    }
  );
}
