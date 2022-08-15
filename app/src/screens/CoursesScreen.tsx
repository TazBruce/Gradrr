import React from "react";
import { Text } from "native-base";
import { t } from "../utils";
import Screen from "../components/common/Screen";

export default function CoursesScreen() {
  return (
    <Screen title={t("courses.title")}>
      <Text>{t("courses.greeting")}</Text>
    </Screen>
  );
}
