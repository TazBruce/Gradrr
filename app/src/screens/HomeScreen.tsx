import React from "react";
import { t } from "../utils";
import Screen from "../components/common/Screen";
import AssignmentList from "../components/assignments/AssignmentList";

export default function HomeScreen() {
  return <Screen title={t("home.title")}>{AssignmentList(null, true)}</Screen>;
}
