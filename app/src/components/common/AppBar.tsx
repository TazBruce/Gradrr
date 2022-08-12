import React from 'react';
import { HStack, Icon, IconButton, Text, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface AppBarProps {
  title: string;
  showBackButton?: boolean;
}

export default function AppBar({ title, showBackButton = false }: AppBarProps) {
  const navigation = useNavigation();
  return (
    <HStack
      safeAreaTop
      backgroundColor="primary.600"
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
      <Box width="50" />
    </HStack>
  );
}
