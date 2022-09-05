import React from "react";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Divider,
  IconButton,
  Icon,
} from "native-base";
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
                25%
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
                100%
              </Heading>
            </VStack>
          </HStack>
        </Box>
        <Heading>Assignments</Heading>
        {AssignmentList(course)}
        <IconButton
          icon={
            <Icon
              size="4xl"
              color="primary.500"
              as={<AntDesign name="pluscircle" />}
            />
          }
          onPress={() =>
            navigation.navigate("CreateAssignment", {
              courseID: course.id,
              assignment: initialAssignment,
            })
          }
          alignSelf="flex-end"
        />
      </VStack>
    </Screen>
  );
}
