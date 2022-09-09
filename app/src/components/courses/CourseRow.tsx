import React from "react";
import {
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Square,
  Pressable,
} from "native-base";
import { Course, CourseStackParamList } from "../../types/Course";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { removeTrailingDecimals } from "../../types/Assignment";

/**
 * Determines whether a course should show it's current or past status.
 * @param course The Course to check.
 */
function getGrade(course: Course) {
  if (course.final_grade === "") {
    return removeTrailingDecimals(course.current_percentage) + "%";
  }
  return course.final_grade;
}

interface RowProps {
  navigation: NativeStackNavigationProp<CourseStackParamList>;
  course: Course;
}

/**
 * Renders a course row.
 * @constructor Creates a CourseRow.
 * @param props
 */
export default function CourseRow(props: RowProps): JSX.Element {
  const course = props.course;
  const navigation = props.navigation;
  return (
    <Pressable
      onPress={() => navigation.navigate("ViewCourse", { course })}
      paddingTop={3}
      paddingBottom={3}
      _pressed={{ bg: "coolGray.200" }}
    >
      <HStack h="78" w="100%" space={3} justifyContent="flex-start">
        <Square
          bg="primary.500"
          rounded="md"
          shadow={3}
          h="100%"
          w="15%"
          alignSelf="center"
        />
        <VStack alignSelf="center" w="40%">
          <Heading size="md">{course.title}</Heading>
          <Text numberOfLines={2}>{course.description}</Text>
        </VStack>
        <Heading alignSelf="center" size="xl" alignContent="flex-end" w="28%">
          {getGrade(course)}
        </Heading>
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
