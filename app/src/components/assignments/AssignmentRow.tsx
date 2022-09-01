import React from "react";
import { Heading, HStack } from "native-base";
import { CourseStackParamList } from "../../types/Course";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Assignment } from "../../types/Assignment";

/**
 * Renders an assignment row.
 * @param navigation
 * @param assignment The assignment to render.
 * @param key The key to use for the assignment.
 * @constructor Creates an AssignmentRow.
 */
export default function AssignmentRow(
  navigation: NativeStackNavigationProp<CourseStackParamList>,
  assignment: Assignment,
  key: React.Key | undefined
): JSX.Element {
  return (
    <HStack key={key} padding={3} space={4} justifyContent="space-evenly">
      <Heading>{assignment.title}</Heading>
    </HStack>
  );
}
