import React from 'react';
import { Center, HStack, Icon, Pressable, Text } from 'native-base';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { t } from '../../utils';

export default function BottomTabBar({ navigation, state }: BottomTabBarProps) {
  const select = (index: number) =>
    navigation.navigate(state.routeNames[index]);
  return (
    <HStack bg="primary.600" alignItems="center" safeAreaBottom shadow={6}>
      <Pressable
        opacity={state.index === 0 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => select(0)}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={state.index === 0 ? 'home' : 'home-outline'}
              />
            }
            color="white"
            size="sm"
          />
          <Text color="white" fontSize="12">
            {t('home.title')}
          </Text>
        </Center>
      </Pressable>
      <Pressable
        opacity={state.index === 1 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => select(1)}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={state.index === 1 ? 'account' : 'account-outline'}
              />
            }
            color="white"
            size="sm"
          />
          <Text color="white" fontSize="12">
            {t('profile.title')}
          </Text>
        </Center>
      </Pressable>
    </HStack>
  );
}
