/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { IInputProps, FormControl, Input, IconButton, Icon } from "native-base";
import { useField } from "formik";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

interface TextFieldProps extends IInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
}

const defaultProps = {
  label: "",
  isRequired: false,
};

export default function DateField(props: TextFieldProps) {
  const { name, label, isRequired } = props;
  const [field, meta, { setValue }] = useField(name);
  const [date, setDate] = useState(() => {
    if (field.value && field.value instanceof Date) {
      return new Date(field.value);
    } else {
      return new Date();
    }
  });
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      console.log("Changed:");
      setDate(selectedDate);
      setValue(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleClick = () => {
    console.log("Clear date pressed");
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(meta.error)}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        isDisabled={true}
        value={date.toDateString()}
        InputLeftElement={
          <IconButton
            icon={
              <Icon
                size="lg"
                color="primary.500"
                as={<MaterialIcons name="date-range" />}
              />
            }
            onPress={showDatepicker}
          ></IconButton>
        }
        InputRightElement={
          <IconButton
            icon={
              <Icon
                size="lg"
                color="primary.400"
                as={<MaterialIcons name="delete" />}
              />
            }
            onPress={handleClick}
          ></IconButton>
        }
      ></Input>
      {show && (
        <RNDateTimePicker display="spinner" value={date} onChange={onChange} />
      )}
      {meta.error && (
        <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}

DateField.defaultProps = defaultProps;
