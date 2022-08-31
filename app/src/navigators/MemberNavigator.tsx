import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "../components/common/BottomTabBar";
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/courses/CoursesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateCourseScreen from "../screens/courses/CreateCourseScreen";
import ViewCourseScreen from "../screens/courses/ViewCourseScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const CourseStack = createNativeStackNavigator();

function CourseNavigation() {
  return (
    <CourseStack.Navigator screenOptions={{ headerShown: false }}>
      <CourseStack.Screen name="AllCourses" component={CoursesScreen} />
      <CourseStack.Screen name="CreateCourse" component={CreateCourseScreen} />
      <CourseStack.Screen name="ViewCourse" component={ViewCourseScreen} />
    </CourseStack.Navigator>
  );
}

export default function MemberNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }} tabBar={BottomTabBar}>
      <Screen name="Courses" component={CourseNavigation} />
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Settings" component={SettingsScreen} />
    </Navigator>
  );
}
