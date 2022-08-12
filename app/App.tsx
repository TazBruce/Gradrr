import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';
import useCachedResources from './src/hooks/useCachedResources';
import AppNavigator from './src/navigators/AppNavigator';
import theme from './theme';

LogBox.ignoreLogs(['AsyncStorage has been extracted']);

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
}
