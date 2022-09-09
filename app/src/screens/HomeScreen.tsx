import React from "react";
import { t } from "../utils";
import Screen from "../components/common/Screen";
import AssignmentList from "../components/assignments/AssignmentList";
import { Box, Heading, VStack } from "native-base";

export default function HomeScreen() {
  return (
    <Screen title={t("home.title")}>
      <VStack space={4}>
        <Box
          borderRadius="4"
          borderWidth="4"
          borderColor="primary.500"
          padding="4"
          alignItems={"center"}
        >
          <Heading size="md">{t("home.gpa")}</Heading>
          <Heading size="xl">3.5</Heading>
        </Box>
        <Heading>{t("home.upcoming")}</Heading>
        {AssignmentList(null, true)}
      </VStack>
    </Screen>
  );
}
