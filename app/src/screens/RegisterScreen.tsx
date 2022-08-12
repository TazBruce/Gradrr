import React from 'react';
import { Heading, VStack, Button } from 'native-base';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Screen from '../components/common/Screen';
import { t } from '../utils';
import TextField from '../components/common/form/TextField';
import { AuthService } from '../providers/AuthProvider';

interface RegisterFormValue {
  displayName: string;
  email: string;
  password: string;
}

const initialValues: RegisterFormValue = {
  displayName: '',
  email: '',
  password: '',
};

const schema = Yup.object().shape({
  displayName: Yup.string().required().label(t('register.displayNameLabel')),
  email: Yup.string()
    .required()
    .email(t('register.emailError'))
    .label(t('register.emailLabel')),
  password: Yup.string().required().min(6).label(t('register.passwordLabel')),
});

export default function RegisterScreen() {
  const handleFormSubmit = async ({
    displayName,
    email,
    password,
  }: RegisterFormValue) => {
    try {
      const result = await AuthService.createUserWithEmailAndPassword(
        email,
        password,
      );
      await result.user?.updateProfile({ displayName });
    } catch ({ message }) {
      console.log(message);
    }
  };

  return (
    <Screen title={t('register.title')} showBackButton>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        {t('register.subtitle')}
      </Heading>

      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <VStack space={3} mt="5">
            <TextField
              name="displayName"
              label={t('register.displayNameLabel')}
              placeholder={t('register.displayNameHint')}
              isRequired
            />
            <TextField
              name="email"
              label={t('register.emailLabel')}
              placeholder={t('register.emailHint')}
              isRequired
            />
            <TextField
              name="password"
              label={t('register.passwordLabel')}
              placeholder={t('register.passwordHint')}
              isRequired
              password
            />
            <Button
              mt="2"
              onPress={() => handleSubmit()}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              {t('register.register')}
            </Button>
          </VStack>
        )}
      </Formik>
    </Screen>
  );
}
