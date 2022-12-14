import React from "react";
import { t } from "../../utils";
import Screen from "../../components/common/Screen";
import { Icon, Fab } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CourseTabBar from "../../components/courses/CourseTabBar";

/**
 * The courses screen.
 * @param navigation The navigation object.
 * @constructor The courses screen.
 */
export default function CoursesScreen({
  navigation,
}: NativeStackScreenProps<any>) {
  return (
    <Screen title={t("courses.title")}>
      <CourseTabBar />
      <Fab
        renderInPortal={false}
        bottom={30}
        shadow={2}
        size="sm"
        backgroundColor="primary.500"
        _pressed={{ backgroundColor: "primary.600" }}
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        onPress={() => navigation.navigate("CreateCourse")}
      />
    </Screen>
  );
}
