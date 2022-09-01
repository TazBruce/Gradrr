import React from "react";
import { Box, Heading, HStack, VStack, Divider } from "native-base";
import Screen from "../../components/common/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import AssignmentList from "../../components/assignments/AssignmentList";

export default function ViewCourseScreen({
  route,
}: NativeStackScreenProps<CourseStackParamList, "ViewCourse">) {
  const { course } = route.params;

  return (
    <Screen
      title={course.title}
      showBackButton={true}
      showEditButton={true}
      currentItem={course}
    >
      <VStack space="md">
        <Heading size="md">{course.description}</Heading>
        <Box
          borderRadius="4"
          borderWidth="4"
          borderColor="primary.500"
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          padding="4"
        >
          <HStack space="md">
            <VStack alignItems="center">
              <Heading>Current</Heading>
              <Heading size="xl" marginTop="4">
                25%
              </Heading>
            </VStack>
            <Divider
              bg="coolGray.500"
              orientation="vertical"
              mx={4}
              thickness="4"
            />
            <VStack alignItems="center">
              <Heading>Maximum</Heading>
              <Heading size="xl" marginTop="4">
                100%
              </Heading>
            </VStack>
          </HStack>
        </Box>
        <Heading>Assignments</Heading>
        {AssignmentList(course)}
      </VStack>
    </Screen>
  );
}
