import React from "react";
import { Text } from "native-base";
import { t } from "../../utils";
import Screen from "../../components/common/Screen";

export default function CreateCourseScreen() {
  return (
    <Screen title={t("createCourse.title")} showBackButton={true}>
      <Text>{t("createCourse.subtitle")}</Text>
    </Screen>
  );
}
