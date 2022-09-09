import React from "react";
import { HStack, Icon, IconButton, Text, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Course } from "../../types/Course";
import { Assignment } from "../../types/Assignment";
import { collection, doc, FirestoreError } from "firebase/firestore";
import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore";
import { db } from "../../services/firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UseMutationResult } from "react-query";

interface AppBarProps {
  title: string;
  showBackButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  // @ts-ignore
  currentItem?: Course | Assignment;
}

/**
 * Renders the app bar.
 * @param title The title of the app bar.
 * @param showBackButton Whether to show the back button.
 * @param showEditButton Whether to show the edit button.
 * @param showDeleteButton Whether to show the delete button.
 * @param currentItem The current item to edit or delete.
 * @constructor Creates an AppBar.
 */
export default function AppBar({
  title,
  showBackButton = false,
  showEditButton = false,
  showDeleteButton = false,
  currentItem,
}: AppBarProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  let col;
  let ref;
  let mutation: UseMutationResult<void, FirestoreError, void, unknown> | null;

  if (showEditButton || showDeleteButton) {
    if (
      typeof currentItem === "undefined" ||
      currentItem?.id === undefined ||
      currentItem?.id === null ||
      currentItem?.id === ""
    ) {
      console.log("Error: Item is undefined");
    } else {
      if ("year_of_study" in currentItem) {
        col = collection(db, "courses");
        ref = doc(col, currentItem.id.toString());
      } else {
        col = collection(db, "assignments");
        ref = doc(col, currentItem.id.toString());
      }
      mutation = useFirestoreDocumentDeletion(ref);
    }
  }

  /**
   * Function for deleting an item
   */
  const deleteItem = async () => {
    if (mutation == null) {
      console.log("Error: Mutation is undefined");
    } else {
      console.log("Deleting item");
      mutation.mutate();
      if (mutation.isError) {
        console.log("Error deleting item:" + mutation.error.message);
      } else {
        console.log("Item deleted");
        navigation.goBack();
        navigation.goBack();
      }
    }
  };

  /**
   * Function for editing an item
   */
  function editItem() {
    if (
      typeof currentItem === "undefined" ||
      currentItem?.id === undefined ||
      currentItem?.id === null ||
      currentItem?.id === ""
    ) {
      console.log("Error: Item is undefined");
    } else {
      if ("year_of_study" in currentItem) {
        console.log("Editing course");
        console.log(currentItem.id.toString());
        navigation.navigate("CreateCourse", { course: currentItem });
      } else {
        console.log("Editing assignment");
        navigation.navigate("CreateAssignment", { assignment: currentItem });
      }
    }
  }

  return (
    <HStack
      safeAreaTop
      backgroundColor="primary.500"
      px="3"
      py="3"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box width="50">
        {showBackButton && (
          <IconButton
            icon={
              <Icon
                size="sm"
                color="white"
                as={<MaterialIcons name="arrow-back-ios" />}
              />
            }
            onPress={() => navigation.goBack()}
          />
        )}
      </Box>
      <Text color="white" fontSize="20" fontWeight="bold" py="2">
        {title}
      </Text>
      <Box width="50">
        {showEditButton && (
          <IconButton
            icon={
              <Icon
                size="lg"
                color="white"
                as={<MaterialIcons name="edit" />}
              />
            }
            onPress={() => editItem()}
          />
        )}
        {showDeleteButton && !showEditButton && (
          <IconButton
            icon={
              <Icon
                size="lg"
                color="white"
                as={<MaterialIcons name="delete" />}
              />
            }
            onPress={() => deleteItem()}
          />
        )}
      </Box>
    </HStack>
  );
}
