import React from "react";
import { t } from "../../utils";
import Screen from "../../components/common/Screen";
import { IconButton, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CourseTabBar from "../../components/courses/CourseTabBar";

export default function CoursesScreen({
  navigation,
}: NativeStackScreenProps<any>) {
  return (
    <Screen title={t("courses.title")}>
      <CourseTabBar />
      <IconButton
        icon={
          <Icon
            size="4xl"
            color="primary.500"
            as={<AntDesign name="pluscircle" />}
          />
        }
        onPress={() => navigation.navigate("CreateCourse")}
        alignSelf="flex-end"
      />
    </Screen>
  );
}
