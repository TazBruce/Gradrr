import React from 'react';
import { NativeBaseProvider } from 'native-base';
import useCachedResources from './hooks/useCachedResources';
import AppNavigator from './navigators/AppNavigator';
import theme from './theme';

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
