import React from 'react';
import { Heading, VStack, Button, HStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Screen from '../components/common/Screen';
import { t } from '../utils';
import { GuestNavigatorParamList } from '../navigators/GuestNavigator';
import TextField from '../components/common/form/TextField';
import { AuthService } from '../providers/AuthProvider';

interface LoginFormValue {
  email: string;
  password: string;
}

const initialValues: LoginFormValue = {
  email: '',
  password: '',
};

const schema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(t('login.emailError'))
    .label(t('login.emailLabel')),
  password: Yup.string().required().label(t('login.passwordLabel')),
});

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<GuestNavigatorParamList, 'Login'>) {
  const handleFormSubmit = async ({ email, password }: LoginFormValue) => {
    try {
      await AuthService.signInWithEmailAndPassword(email, password);
    } catch ({ message }) {
      console.log(message);
    }
  };

  return (
    <Screen>
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        {t('login.headline')}
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        {t('login.subtitle')}
      </Heading>

      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <VStack space={3} mt="5">
            <TextField
              name="email"
              label={t('login.emailLabel')}
              placeholder={t('login.emailHint')}
              isRequired
            />
            <TextField
              name="password"
              label={t('login.passwordLabel')}
              placeholder={t('login.passwordHint')}
              isRequired
              password
            />
            <Button
              mt="2"
              onPress={() => handleSubmit()}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              {t('login.login')}
            </Button>
            <HStack mt="6" justifyContent="center">
              <Button
                variant="link"
                onPress={() => navigation.navigate('Register')}
              >
                {t('login.register')}
              </Button>
            </HStack>
          </VStack>
        )}
      </Formik>
    </Screen>
  );
}
