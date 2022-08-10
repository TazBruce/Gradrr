import React from 'react';
import { Center, Spinner } from 'native-base';

export default function Loader() {
  return (
    <Center flex={1}>
      <Spinner testID="loader" size="lg" />
    </Center>
  );
}
