import React from "react";
import { Box, Divider, Heading, HStack, Icon, VStack } from "native-base";
import Screen from "../../components/common/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../types/Course";
import {
  getDueDate,
  getWeight,
  removeTrailingDecimals,
} from "../../types/Assignment";
import SubtaskList from "../../components/subtasks/SubtaskList";
import SubtaskModal from "../../components/subtasks/SubtaskModal";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

/**
 * View an assignment.
 * @param route The route object.
 * @constructor View an assignment.
 */
export default function ViewAssignmentScreen({
  route,
}: NativeStackScreenProps<CourseStackParamList, "ViewAssignment">) {
  const { assignment } = route.params;
  const assignmentID = assignment.id === undefined ? 0 : assignment.id;

  const currentAssignmentElement = (
    <>
      <Heading>Subtasks</Heading>
      {SubtaskList(assignment)}
      <SubtaskModal assignmentID={assignmentID} subtask={null} />
    </>
  );

  const completedAssignmentElement = (
    <>
      {assignment.earned_marks !== null && assignment.max_marks !== null && (
        <>
          <Heading>Earned</Heading>
          <Box
            borderRadius="4"
            borderWidth="4"
            borderColor="primary.500"
            padding="4"
          >
            <HStack justifyContent="space-evenly">
              <VStack alignItems="center" w="45%">
                <Heading>Marks</Heading>
                <Heading size="xl" marginTop="4">
                  {assignment.earned_marks}
                </Heading>
              </VStack>
              <Heading size="3xl" alignSelf={"flex-end"}>
                /
              </Heading>
              <VStack alignItems="center" w="45%">
                <Heading>Maximum</Heading>
                <Heading size="xl" marginTop="4">
                  {assignment.max_marks}
                </Heading>
              </VStack>
            </HStack>
          </Box>
        </>
      )}
      <Heading>Grade</Heading>
      <Box
        borderRadius="4"
        borderWidth="4"
        borderColor="primary.500"
        padding="4"
      >
        <HStack justifyContent="space-evenly">
          <VStack alignItems="center" w="45%">
            <Heading>Percentage</Heading>
            <Heading size="xl" marginTop="4">
              {removeTrailingDecimals(assignment.percentage) + "%"}
            </Heading>
          </VStack>
          <Divider
            bg="coolGray.500"
            orientation="vertical"
            mx={4}
            thickness="4"
          />
          <VStack alignItems="center" w="45%">
            <Heading>Letter</Heading>
            <Heading size="xl" marginTop="4">
              {assignment.grade}
            </Heading>
          </VStack>
        </HStack>
      </Box>
    </>
  );

  return (
    <Screen
      title={assignment.title}
      showBackButton={true}
      showEditButton={true}
      currentItem={assignment}
    >
      <VStack space="md">
        <HStack space={2}>
          <Icon
            as={MaterialIcons}
            name="description"
            size="3xl"
            color={"primary.500"}
          />
          <Heading alignSelf={"center"} size="md">
            {assignment.description}
          </Heading>
        </HStack>
        <HStack space={2}>
          <Icon
            as={MaterialIcons}
            name="date-range"
            size="3xl"
            color={"primary.500"}
          />
          <Heading alignSelf={"center"} size="md">
            {getDueDate(assignment)}
          </Heading>
        </HStack>
        <HStack space={2}>
          <Icon
            as={MaterialCommunityIcons}
            name="weight"
            size="3xl"
            color={"primary.500"}
          />
          <Heading alignSelf={"center"} size="md">
            {getWeight(assignment)}
          </Heading>
        </HStack>
        {assignment.is_complete
          ? completedAssignmentElement
          : currentAssignmentElement}
      </VStack>
    </Screen>
  );
}
