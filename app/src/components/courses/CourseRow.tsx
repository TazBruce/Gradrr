import React from "react";
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  VStack,
  Text,
} from "native-base";
import { Course } from "../../types/Course";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * Determines whether a course should show it's current or past status.
 * @param course The Course to check.
 */
function getGrade(course: Course) {
  if (course.final_grade === "") {
    return "25%";
  }
  return course.final_grade;
}

/**
 * Renders a course row.
 * @param course The Course to render.
 * @param key The key to use for the Course.
 * @constructor Creates a CourseRow.
 */
export default function CourseRow(
  course: Course,
  key: React.Key | null | undefined
): JSX.Element {
  return (
    <HStack key={key} padding={3} space={4} justifyContent="space-evenly">
      <Center h="20" w="20" bg="primary.500" rounded="md" shadow={3} />
      <VStack paddingTop={2} paddingLeft={3} alignContent="center">
        <Heading size="md">{course.title}</Heading>
        <Text w="40">{course.description}</Text>
      </VStack>
      <Heading alignSelf="center" size="2xl">
        {getGrade(course)}
      </Heading>
      <IconButton
        icon={
          <Icon
            size="xl"
            color="black"
            as={<MaterialIcons name="keyboard-arrow-right" />}
          />
        }
        onPress={() => console.log("pressed")}
      />
    </HStack>
  );
}
