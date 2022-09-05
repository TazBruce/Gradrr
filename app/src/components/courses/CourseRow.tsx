import React from "react";
import {
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
 * @constructor Creates a CourseRow.
 */
export default function CourseRow(
  navigation: NativeStackNavigationProp<CourseStackParamList>,
  course: Course
): JSX.Element {
  return (
    <HStack
      key={course.id}
      paddingTop={3}
      paddingBottom={2}
      space={4}
      w="100%"
      justifyContent="flex-start"
    >
      <Square size="md" bg="primary.500" rounded="md" shadow={3} w="15%" />
      <VStack paddingTop={2} alignContent="flex-start" w="45%">
        <Heading size="md">{course.title}</Heading>
        <Text numberOfLines={2}>{course.description}</Text>
      </VStack>
      <Heading alignSelf="center" size="2xl" alignContent="flex-end" w="20%">
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
        w="5%"
        alignContent="flex-end"
      />
    </HStack>
  );
}
