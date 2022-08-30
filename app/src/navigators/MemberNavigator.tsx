import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "../components/common/BottomTabBar";
import HomeScreen from "../screens/HomeScreen";
import CoursesScreen from "../screens/courses/CoursesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function MemberNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }} tabBar={BottomTabBar}>
      <Screen name="Courses" component={CoursesScreen} />
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Settings" component={SettingsScreen} />
    </Navigator>
  );
}
