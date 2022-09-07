import React from "react";
import { Course, CourseStackParamList } from "../../types/Course";
import AssignmentRow from "./AssignmentRow";
import { ScrollView, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Assignment } from "../../types/Assignment";
import {
  getAllAssignments,
  getCourseAssignments,
} from "../../providers/DataProvider";

/**
 * Renders a list of assignments.
 * @param course The course to render assignments for.
 * @param allAssignments Whether it should be from all assignments or just the course's assignments.
 * @constructor
 */
export default function AssignmentList(
  course: Course | null = null,
  allAssignments: boolean = false
): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<CourseStackParamList>>();

  const mapAssignments = function (assignmentList: Assignment[]) {
    return assignmentList.map(function (assignment: Assignment) {
      return (
        <AssignmentRow
          key={assignment.id}
          navigation={navigation}
          assignment={assignment}
        />
      );
    });
  };

  const assignments = function () {
    let result;
    if (course != null && course.id) {
      result = getCourseAssignments(course.id);
    } else if (course == null && allAssignments) {
      result = getAllAssignments();
    }

    if (result instanceof Array) {
      return mapAssignments(result);
    } else {
      return result;
    }
  };

  return (
    <>
      {
        <ScrollView h="61%">
          <VStack space={4}>{assignments()}</VStack>
        </ScrollView>
      }
    </>
  );
}
