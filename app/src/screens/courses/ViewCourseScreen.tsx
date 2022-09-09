import React from "react";
import { Box, Heading, HStack, VStack, Divider, Icon, Fab } from "native-base";
import Screen from "../../components/common/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import AssignmentList from "../../components/assignments/AssignmentList";
import { AntDesign } from "@expo/vector-icons";
import { initialAssignment } from "../../types/Assignment";

export default function ViewCourseScreen({
  navigation,
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
          padding="4"
        >
          <HStack justifyContent="space-evenly">
            <VStack alignItems="center" w="45%">
              <Heading>Current</Heading>
              <Heading size="xl" marginTop="4">
                {course.current_percentage}%
              </Heading>
            </VStack>
            <Divider
              bg="coolGray.500"
              orientation="vertical"
              mx={4}
              thickness="4"
            />
            <VStack alignItems="center" w="45%">
              <Heading>Maximum</Heading>
              <Heading size="xl" marginTop="4">
                {100 -
                  (100 - course.current_percentage) -
                  (course.total_weight - course.graded_weight)}
                %
              </Heading>
            </VStack>
          </HStack>
        </Box>
        <Heading>Assignments</Heading>
        {AssignmentList(course)}
        <Fab
          renderInPortal={false}
          bottom={30}
          shadow={2}
          size="sm"
          backgroundColor="primary.500"
          _pressed={{ backgroundColor: "primary.600" }}
          icon={<Icon color="white" as={<AntDesign name="plus" />} />}
          onPress={() =>
            navigation.navigate("CreateAssignment", {
              courseID: course.id,
              assignment: initialAssignment,
            })
          }
        />
      </VStack>
    </Screen>
  );
}
