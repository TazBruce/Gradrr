import React, { useContext } from "react";
import { Button, Heading, VStack } from "native-base";
import { AuthContext, AuthService } from "../providers/AuthProvider";
import { t } from "../utils";
import Screen from "../components/common/Screen";

export default function SettingsScreen() {
  const { user } = useContext(AuthContext);

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
