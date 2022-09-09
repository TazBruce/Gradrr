import React from "react";
import { t } from "../utils";
import Screen from "../components/common/Screen";
import AssignmentList from "../components/assignments/AssignmentList";
import { Box, Heading, VStack } from "native-base";
import { getAllCourses } from "../providers/DataProvider";
import { letterGradeToGPA } from "../types/Course";

export default function HomeScreen() {
  const gpa = function () {
    const result = getAllCourses(false);
    if (result instanceof Array) {
      let total = 0;
      let count = 0;
      result.forEach((course) => {
        if (course.final_grade !== "") {
          total += letterGradeToGPA(course.final_grade);
          count++;
        }
      });
      return (total / count).toFixed(2);
    }
    return result;
  };

  return (
    <Screen title={t("home.title")}>
      <VStack space={4}>
        <Box
          borderRadius="4"
          borderWidth="4"
          borderColor="primary.500"
          padding="4"
          alignItems={"center"}
        >
          <Heading size="md">{t("home.gpa")}</Heading>
          <Heading size="xl">{gpa()}</Heading>
        </Box>
        <Heading>{t("home.upcoming")}</Heading>
        {AssignmentList(null, true)}
      </VStack>
    </Screen>
  );
}
