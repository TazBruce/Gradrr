/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { IInputProps, FormControl, Select } from "native-base";
import { useField, useFormikContext } from "formik";

interface SelectFieldProps extends IInputProps {
  name: string;
  values: string[];
  label?: string;
  isRequired?: boolean;
}

const defaultProps = {
  label: "",
  isRequired: false,
};

/**
 * Renders a select field.
 * @param props The props for the select field.
 * @constructor Creates a SelectField.
 */
export default function SelectField(props: SelectFieldProps) {
  const { name, label, isRequired, ...rest } = props;
  const [field, meta] = useField(name);
  const { handleChange } = useFormikContext();
  const items = props.values.map((value) => {
    return <Select.Item key={value} label={value} value={value} />;
  });

  return (
    <FormControl isRequired={isRequired} isInvalid={Boolean(meta.error)}>
      <FormControl.Label>{label}</FormControl.Label>
      {/* @ts-ignore */}
      <Select
        testID="selectfield-input"
        selectedValue={props.isDisabled ? "" : field.value}
        onValueChange={handleChange(name)}
        {...rest}
      >
        {items}
      </Select>
      {meta.error && (
        <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}

SelectField.defaultProps = defaultProps;
