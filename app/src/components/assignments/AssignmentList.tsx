import React from "react";
import { Course, CourseStackParamList } from "../../types/Course";
import AssignmentRow from "./AssignmentRow";
import { ScrollView, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Assignment } from "../../types/Assignment";
import { getCourseAssignments } from "../../providers/DataProvider";

export default function AssignmentList(course: Course): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<CourseStackParamList>>();

  const assignments = function () {
    if (course.id) {
      let result = getCourseAssignments(course.id);
      if (result instanceof Array) {
        return result.map(function (assignment: Assignment) {
          return AssignmentRow(navigation, assignment);
        });
      } else {
        return result;
      }
    }
  };

  return (
    <>
      {
        <ScrollView h="65%">
          <VStack space={4}>{assignments()}</VStack>
        </ScrollView>
      }
    </>
  );
}
