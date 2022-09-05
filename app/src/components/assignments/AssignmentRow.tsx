import React from "react";
import {
  Divider,
  Heading,
  HStack,
  Icon,
  Pressable,
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
 * @constructor Creates an AssignmentRow.
 */
export default function AssignmentRow(
  navigation: NativeStackNavigationProp<CourseStackParamList>,
  assignment: Assignment
): JSX.Element {
  const dueDate = () => {
    if (assignment.due_date) {
      let date = assignment.due_date.toDate().toDateString();
      console.log(date);
      return date.substring(0, date.length - 4);
    } else {
      return "";
    }
  };

  return (
    <Pressable
      key={assignment.id}
      onPress={() => navigation.navigate("ViewAssignment", { assignment })}
      padding={3}
      _pressed={{ bg: "coolGray.200" }}
    >
      <HStack space={4} h="78" w="100%" justifyContent="flex-start">
        <Square
          bg="primary.500"
          rounded="md"
          shadow={3}
          h="100%"
          w="15%"
          alignSelf="center"
        />
        <VStack alignSelf="center" w="30%">
          <Heading>{assignment.title}</Heading>
          <Heading>{dueDate()}</Heading>
        </VStack>
        <Divider
          bg="coolGray.500"
          orientation="vertical"
          mx={4}
          thickness="2"
        />
        <VStack alignSelf="center" alignContent="flex-end" w="25%">
          <Heading>Weight</Heading>
          <Heading>25%</Heading>
        </VStack>
        <Icon
          size="xl"
          color="black"
          as={<MaterialIcons name="keyboard-arrow-right" />}
          w="5%"
          alignSelf="center"
          alignContent="flex-end"
        />
      </HStack>
    </Pressable>
  );
}
