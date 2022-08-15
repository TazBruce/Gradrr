import React, { useContext } from "react";
import { Button, Heading, VStack } from "native-base";
import { AuthContext, AuthService } from "../providers/AuthProvider";
import { t } from "../utils";
import Screen from "../components/common/Screen";

export default function SettingsScreen() {
  const { user } = useContext(AuthContext);

  return (
    <Screen title={t("settings.title")}>
      <Heading size="lg">
        {t("settings.greeting", { name: user?.displayName || "Joe" })}
      </Heading>
      <VStack flex={1} justifyContent="center">
        <Button onPress={() => AuthService.signOut()}>
          {t("settings.logout")}
        </Button>
      </VStack>
    </Screen>
  );
}
