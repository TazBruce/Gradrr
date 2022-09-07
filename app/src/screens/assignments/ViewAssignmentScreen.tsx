import React from "react";
import { Button, Fab, Heading, Icon, VStack } from "native-base";
import Screen from "../../components/common/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import { getDueDate, getWeight } from "../../types/Assignment";
import { AntDesign } from "@expo/vector-icons";

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
        <Heading size="md">{getWeight(assignment)}</Heading>
        <Heading size="md">Subtasks</Heading>
      </VStack>
      <Button>Mark as Complete</Button>
      <Fab
        renderInPortal={false}
        bottom={30}
        shadow={2}
        size="sm"
        backgroundColor="primary.500"
        _pressed={{ backgroundColor: "primary.600" }}
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        onPress={() =>
          console.log("Add subtask to assignment " + assignment.title)
        }
      />
    </Screen>
  );
}
