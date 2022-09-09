import React, { PropsWithChildren } from "react";
import { Box, VStack } from "native-base";
import AppBar from "./AppBar";
import { Course } from "../../types/Course";
import { Assignment } from "../../types/Assignment";

interface ScreenProps {
  title?: string;
  showBackButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  currentItem?: Course | Assignment;
}

/**
 * Renders a screen.
 * @param title The title of the screen.
 * @param showBackButton Whether to show the back button.
 * @param showEditButton Whether to show the edit button.
 * @param showDeleteButton Whether to show the delete button.
 * @param currentItem The current item to edit or delete.
 * @param children The children of the screen.
 * @constructor Creates a Screen.
 */
export default function Screen({
  title,
  showBackButton,
  showEditButton,
  showDeleteButton,
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
          showDeleteButton={showDeleteButton}
          currentItem={currentItem}
        />
      )}
      <Box flex={1} p="4">
        {children}
      </Box>
    </VStack>
  );
}
