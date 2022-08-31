import React from "react";
import { Text } from "native-base";
import Screen from "../../components/common/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";

export default function ViewCourseScreen({
  route,
}: NativeStackScreenProps<CourseStackParamList, "ViewCourse">) {
  const { course } = route.params;

  return (
    <Screen title={course.title} showBackButton={true}>
      <Text>{course.description}</Text>
    </Screen>
  );
}
