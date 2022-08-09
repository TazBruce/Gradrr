/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Input, IInputProps, Button, Icon, FormControl } from 'native-base';
import { useField, useFormikContext } from 'formik';
import { Ionicons } from '@expo/vector-icons';

interface TextFieldProps extends IInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  password?: boolean;
}

const defaultProps = {
  label: '',
  isRequired: false,
  password: false,
};

export default function TextField(props: TextFieldProps) {
  const { name, label, isRequired, password, ...rest } = props;
  const [textHidden, setTextHidden] = useState(password);
  const [field, meta] = useField(name);
  const { handleChange, handleBlur, setFieldTouched } = useFormikContext();

  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(meta.error)}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        testID="textfield-input"
        type={textHidden ? 'password' : 'text'}
        value={field.value}
        {...rest}
        InputRightElement={
          password ? (
            <Button
              variant="ghost"
              leftIcon={
                <Icon
                  as={Ionicons}
                  name={textHidden ? 'eye' : 'eye-off'}
                  size="xs"
                />
              }
              onPress={() => setTextHidden(!textHidden)}
            />
          ) : undefined
        }
        onChangeText={handleChange(name)}
        onBlur={() => {
          setFieldTouched(name);
          handleBlur(name);
        }}
      />
      {meta.error && (
        <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}

TextField.defaultProps = defaultProps;
