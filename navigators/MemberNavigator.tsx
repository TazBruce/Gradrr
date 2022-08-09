import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '../components/common/BottomTabBar';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const { Navigator, Screen } = createBottomTabNavigator();

export default function MemberNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }} tabBar={BottomTabBar}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  );
}
