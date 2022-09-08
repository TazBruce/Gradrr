import React from "react";
import { Button, Heading, VStack } from "native-base";
import Screen from "../../components/common/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import { getDueDate, getWeight } from "../../types/Assignment";
import SubtaskList from "../../components/subtasks/SubtaskList";
import SubtaskModal from "../../components/subtasks/SubtaskModal";

export default function ViewAssignmentScreen({
  route,
}: NativeStackScreenProps<CourseStackParamList, "ViewAssignment">) {
  const { assignment } = route.params;
  const assignmentID = assignment.id === undefined ? 0 : assignment.id;

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
        <Heading size="md">{getWeight(assignment)}</Heading>
        <Heading>Subtasks</Heading>
      </VStack>
      {SubtaskList(assignment)}
      <Button>Mark as Complete</Button>
      <SubtaskModal assignmentID={assignmentID} subtask={null} />
    </Screen>
  );
}
