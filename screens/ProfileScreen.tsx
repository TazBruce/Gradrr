import React, { useContext } from 'react';
import { Button, Heading, VStack } from 'native-base';
import { AuthContext, AuthService } from '../providers/AuthProvider';
import { t } from '../utils';
import Screen from '../components/common/Screen';

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);

  return (
    <Screen title={t('profile.title')}>
      <Heading size="lg">
        {t('profile.greeting', { name: user!.displayName || 'Joe' })}
      </Heading>
      <VStack flex={1} justifyContent="center">
        <Button onPress={() => AuthService.signOut()}>
          {t('profile.logout')}
        </Button>
      </VStack>
    </Screen>
  );
}
