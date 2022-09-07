import React from "react";
import { Heading, VStack } from "native-base";
import Screen from "../../components/common/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import { getDueDate } from "../../types/Assignment";

export default function ViewAssignmentScreen({
  route,
}: NativeStackScreenProps<CourseStackParamList, "ViewAssignment">) {
  const { assignment } = route.params;

  return (
    <Screen
      title={assignment.title}
      showBackButton={true}
      showEditButton={true}
      currentItem={assignment}
    >
      <VStack space="md">
        <Heading size="md">{assignment.description}</Heading>
        <Heading size="md">{getDueDate(assignment)}</Heading>
      </VStack>
    </Screen>
  );
}
