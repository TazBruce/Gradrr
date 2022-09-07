import React from "react";
import { Heading, VStack } from "native-base";
import Screen from "../../components/common/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import { Timestamp } from "firebase/firestore";

export default function ViewAssignmentScreen({
  route,
}: NativeStackScreenProps<CourseStackParamList, "ViewAssignment">) {
  const { assignment } = route.params;
  const dueDate = () => {
    if (assignment.due_date) {
      console.log(assignment.due_date);
      let date;
      if (assignment.due_date instanceof Timestamp) {
        date = assignment.due_date.toDate().toDateString();
      } else {
        date = assignment.due_date.toDateString();
      }
      return date.substring(0, date.length - 4);
    } else {
      return "";
    }
  };

  return (
    <Screen
      title={assignment.title}
      showBackButton={true}
      showEditButton={true}
      currentItem={assignment}
    >
      <VStack space="md">
        <Heading size="md">{assignment.description}</Heading>
        <Heading size="md">{dueDate()}</Heading>
      </VStack>
    </Screen>
  );
}
