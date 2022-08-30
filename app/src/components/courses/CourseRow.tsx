import React from "react";
import { Box, Center, HStack, Spinner } from "native-base";
import { Course } from "../../types/Course";

export default function CourseRow(
  course: Course,
  key: React.Key | null | undefined
): JSX.Element {
  return <Box key={key}>{course.title}</Box>;
}
