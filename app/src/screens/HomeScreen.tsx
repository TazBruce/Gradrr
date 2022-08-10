import React from 'react';
import { Text } from 'native-base';
import { t } from '../utils';
import Screen from '../components/common/Screen';

export default function HomeScreen() {
  return (
    <Screen title={t('home.title')}>
      <Text>{t('home.greeting')}</Text>
    </Screen>
  );
}
