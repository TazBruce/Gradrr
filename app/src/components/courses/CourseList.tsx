import React, { useContext } from "react";
import { Box, Center, HStack, Spinner } from "native-base";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, query, where } from "firebase/firestore";
import { db as firestore } from "../../services/firebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import Loader from "../common/Loader";

export default function CourseList(): JSX.Element {
  const { user } = useContext(AuthContext);

  // Create a Firestore collection reference
  // @ts-ignore
  const ref = query(
    collection(firestore, "courses"),
    where("owner", "==", user?.uid || "N/A")
  );

  // @ts-ignore
  const firestoreQuery = useFirestoreQuery(["courses"], ref);

  if (firestoreQuery.isLoading) {
    return <Loader />;
  }

  const snapshot = firestoreQuery.data;

  return (
    <>
      {
        // @ts-ignore
        snapshot.docs.map(
          (docSnapshot: {
            data: () => any;
            id: React.Key | null | undefined;
          }) => {
            const data = docSnapshot.data();
            console.log(data);
            return <Box key={docSnapshot.id}>{data.description}</Box>;
          }
        )
      }
    </>
  );
}
