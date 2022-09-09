import React from "react";
import { Button, VStack } from "native-base";
import { AuthService } from "../providers/AuthProvider";
import { t } from "../utils";
import Screen from "../components/common/Screen";

/**
 * Settings screen.
 * @constructor Settings screen.
 */
export default function SettingsScreen() {
  return (
    <Screen title={t("settings.title")}>
      <VStack flex={1} justifyContent="center">
        <Button color="primary.500" onPress={() => AuthService.signOut()}>
          {t("settings.logout")}
        </Button>
      </VStack>
    </Screen>
  );
}
