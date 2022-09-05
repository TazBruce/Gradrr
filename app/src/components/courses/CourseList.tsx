import React from "react";
import { Course, CourseStackParamList } from "../../types/Course";
import CourseRow from "./CourseRow";
import { ScrollView, VStack } from "native-base";
import { getAllCourses } from "../../providers/DataProvider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function CourseList(isCurrent: boolean): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<CourseStackParamList>>();

  const courses = () => {
    let result = getAllCourses(isCurrent);
    if (result instanceof Array) {
      return result.map(function (course: Course) {
        return CourseRow(navigation, course);
      });
    } else {
      return result;
    }
  };

  return (
    <>
      {
        <ScrollView h="80%">
          <VStack space={4}>{courses()}</VStack>
        </ScrollView>
      }
    </>
  );
}
