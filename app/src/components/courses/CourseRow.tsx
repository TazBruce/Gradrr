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
  Square,
} from "native-base";
import { Course, CourseStackParamList } from "../../types/Course";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
 * @param navigation
 * @param course The Course to render.
 * @param key The key to use for the Course.
 * @constructor Creates a CourseRow.
 */
export default function CourseRow(
  navigation: NativeStackNavigationProp<CourseStackParamList>,
  course: Course,
  key: React.Key | null | undefined
): JSX.Element {
  return (
    <HStack key={key} padding={3} space={4} justifyContent="space-evenly">
      <Square size="md" bg="primary.500" rounded="md" shadow={3} />
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
        onPress={() => navigation.navigate("ViewCourse", { course: course })}
      />
    </HStack>
  );
}
