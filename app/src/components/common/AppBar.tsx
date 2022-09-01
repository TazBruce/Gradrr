import React from "react";
import { HStack, Icon, IconButton, Text, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Course } from "../../types/Course";
import { Assignment } from "../../types/Assignment";

interface AppBarProps {
  title: string;
  showBackButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  // @ts-ignore
  currentItem?: Course | Assignment;
}

export default function AppBar({
  title,
  showBackButton = false,
  showEditButton = false,
  showDeleteButton = false,
  currentItem,
}: AppBarProps) {
  const navigation = useNavigation();
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
            onPress={() => editItem(navigation, currentItem)}
          />
        )}
        {showDeleteButton && !showEditButton && (
          <IconButton
            icon={
              <Icon
                size="lg"
                color="white"
                as={<MaterialIcons name="edit" />}
              />
            }
            onPress={() => editItem(navigation, currentItem)}
          />
        )}
      </Box>
    </HStack>
  );
}

function editItem(
  navigation: NavigationProp<any>,
  currentItem?: Course | Assignment
) {
  if (currentItem == undefined) {
    console.log(currentItem);
  } else {
    if ("year_of_study" in currentItem) {
      navigation.navigate("CreateCourse", { course: currentItem });
    } else {
      navigation.navigate("CreateAssignment", { assignment: currentItem });
    }
  }
}
