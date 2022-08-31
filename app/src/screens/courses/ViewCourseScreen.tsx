import React from "react";
import { Text } from "native-base";
import Screen from "../../components/common/Screen";
import { Course } from "../../types/Course";
import { RouteProp } from "@react-navigation/native";

export default function ViewCourseScreen(
  route: RouteProp<{ params: { course: Course } }, "params">
) {
  const { course } = route.params;

  return (
    <Screen title={course.title} showBackButton={true}>
      <Text>{course.description}</Text>
    </Screen>
  );
}
