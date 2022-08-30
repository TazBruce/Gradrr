import React from "react";
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  VStack,
  Text,
} from "native-base";
import { Course } from "../../types/Course";
import { MaterialIcons } from "@expo/vector-icons";

export default function CourseRow(
  course: Course,
  key: React.Key | null | undefined
): JSX.Element {
  return (
    <HStack key={key} padding={3} space={4} justifyContent="space-evenly">
      <Center h="20" w="20" bg="primary.500" rounded="md" shadow={3} />
      <VStack paddingTop={2} paddingLeft={3} alignContent="center">
        <Heading size="md">{course.title}</Heading>
        <Text w="40" isTruncated>
          {course.description}
        </Text>
      </VStack>
      <Heading alignSelf="center" size="3xl">
        A+
      </Heading>
      <IconButton
        icon={
          <Icon
            size="xl"
            color="black"
            as={<MaterialIcons name="keyboard-arrow-right" />}
          />
        }
        onPress={() => console.log("pressed")}
      />
    </HStack>
  );
}
