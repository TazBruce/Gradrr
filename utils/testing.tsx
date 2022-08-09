/* eslint-disable import/prefer-default-export */
import { NativeBaseProvider } from 'native-base';
import React, { PropsWithChildren } from 'react';

export function TestRoot({ children }: PropsWithChildren<unknown>) {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      {children}
    </NativeBaseProvider>
  );
}
