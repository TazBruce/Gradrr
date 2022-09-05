/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { IInputProps, FormControl, Button } from "native-base";
import { useField } from "formik";
import RNDateTimePicker from "@react-native-community/datetimepicker";

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

  const onChange = (event: any, selectedDate: any) => {
    setShow(false);
    setDate(selectedDate);
    setValue(selectedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(meta.error)}>
      <FormControl.Label>{label}</FormControl.Label>
      <Button onPress={showDatepicker}>{date.toDateString()}</Button>
      {show && <RNDateTimePicker value={date} onChange={onChange} />}
      {meta.error && (
        <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}

DateField.defaultProps = defaultProps;
