import React, { PropsWithChildren } from "react";
import { Box, VStack } from "native-base";
import AppBar from "./AppBar";

interface ScreenProps {
  title?: string;
  showBackButton?: boolean;
  showEditButton?: boolean;
}

export default function Screen({
  title,
  showBackButton,
  showEditButton,
  children,
}: PropsWithChildren<ScreenProps>) {
  return (
    <VStack flex={1}>
      {title && (
        <AppBar
          title={title}
          showBackButton={showBackButton}
          showEditButton={showEditButton}
        />
      )}
      <Box flex={1} p="4">
        {children}
      </Box>
    </VStack>
  );
}
