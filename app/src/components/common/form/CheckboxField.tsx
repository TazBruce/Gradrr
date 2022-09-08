/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { IInputProps, FormControl, Checkbox } from "native-base";
import { useField } from "formik";

interface CheckboxFieldProps extends IInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
}

const defaultProps = {
  label: "",
  isRequired: false,
};

export default function CheckboxField(props: CheckboxFieldProps) {
  const { name, label, isRequired } = props;
  const [field, meta] = useField(name);

  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(meta.error)}>
      <Checkbox testID="checkbox-input" value={field.value}>
        {label}
      </Checkbox>
      {meta.error && (
        <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}

CheckboxField.defaultProps = defaultProps;
