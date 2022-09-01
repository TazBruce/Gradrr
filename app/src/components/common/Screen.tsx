import React, { PropsWithChildren } from "react";
import { Box, VStack } from "native-base";
import AppBar from "./AppBar";
import { Course } from "../../types/Course";
import { Assignment } from "../../types/Assignment";

interface ScreenProps {
  title?: string;
  showBackButton?: boolean;
  showEditButton?: boolean;
  currentItem?: Course | Assignment;
}

export default function Screen({
  title,
  showBackButton,
  showEditButton,
  currentItem,
  children,
}: PropsWithChildren<ScreenProps>) {
  return (
    <VStack flex={1}>
      {title && (
        <AppBar
          title={title}
          showBackButton={showBackButton}
          showEditButton={showEditButton}
          currentItem={currentItem}
        />
      )}
      <Box flex={1} p="4">
        {children}
      </Box>
    </VStack>
  );
}
