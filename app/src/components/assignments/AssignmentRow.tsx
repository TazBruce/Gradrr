import React from "react";
import {
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Square,
  VStack,
} from "native-base";
import { CourseStackParamList } from "../../types/Course";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Assignment } from "../../types/Assignment";
import { MaterialIcons } from "@expo/vector-icons";

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
  const dueDate = assignment.due_date.toDate().toDateString();
  return (
    <HStack key={key} padding={3} space={4} justifyContent="space-evenly">
      <Square size="xs" bg="primary.500" rounded="md" shadow={3} />
      <VStack>
        <Heading>{assignment.title}</Heading>
        <Heading>{dueDate.substring(0, dueDate.length - 4)}</Heading>
      </VStack>
      <Divider bg="coolGray.500" orientation="vertical" mx={4} thickness="2" />
      <VStack>
        <Heading>Weight</Heading>
        <Heading>25%</Heading>
      </VStack>
      <IconButton
        icon={
          <Icon
            size="xl"
            color="black"
            as={<MaterialIcons name="keyboard-arrow-right" />}
          />
        }
        onPress={() => console.log("Assignment pressed")}
      />
    </HStack>
  );
}
