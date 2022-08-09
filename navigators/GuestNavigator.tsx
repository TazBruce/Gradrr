import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const { Navigator, Screen } = createNativeStackNavigator();

export type GuestNavigatorParamList = {
  Login: undefined;
  Register: undefined;
};

export default function GuestNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
    </Navigator>
  );
}
