/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { IInputProps, FormControl, Input, IconButton, Icon } from "native-base";
import { useField } from "formik";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore";
import * as Device from "expo-device";

interface TextFieldProps extends IInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
}

const defaultProps = {
  label: "",
  isRequired: false,
};

/**
 * Renders a text field.
 * @param props The props for the text field.
 * @constructor Creates a TextField.
 */
export default function DateField(props: TextFieldProps) {
  const { name, label, isRequired, ...rest } = props;
  const [field, meta, { setValue }] = useField(name);
  const [dateEnabled, setDateEnabled] = useState(false);
  const [date, setDate] = useState(() => {
    if (field.value && field.value instanceof Timestamp) {
      setDateEnabled(true);
      return field.value.toDate();
    } else {
      return new Date();
    }
  });
  const [show, setShow] = useState(false);
  const mode = Device.brand === "Apple" ? "spinner" : "default";

  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      setDateEnabled(true);
      setDate(selectedDate);
      setValue(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleClick = () => {
    setDateEnabled(false);
    setValue(null);
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(meta.error)}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        isDisabled={true}
        value={dateEnabled ? date.toDateString() : ""}
        _disabled={{ opacity: 1 }}
        InputLeftElement={
          <IconButton
            borderColor={"coolGray.400"}
            borderWidth={1}
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
            borderColor={"coolGray.400"}
            borderWidth={1}
            icon={
              <Icon
                size="lg"
                color="primary.500"
                as={<MaterialIcons name="delete" />}
              />
            }
            onPress={handleClick}
          ></IconButton>
        }
      ></Input>
      {show && (
        <RNDateTimePicker
          display={mode}
          value={date}
          onChange={onChange}
          textColor={"#000000"}
        />
      )}
      {meta.error && (
        <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}

DateField.defaultProps = defaultProps;
