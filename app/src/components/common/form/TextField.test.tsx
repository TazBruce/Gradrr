import React, { PropsWithChildren } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Formik } from 'formik';
import { TestRoot } from '../../../utils/testing';
import TextField from './TextField';

const wrapper = ({ children }: PropsWithChildren<unknown>) => (
  <TestRoot>
    <Formik initialValues={{}} onSubmit={jest.fn()}>
      {children}
    </Formik>
  </TestRoot>
);

test('it works', () => {
  const { getByTestId, queryByPlaceholderText, queryByText } = render(
    <TextField name="test" />,
    { wrapper },
  );

  expect(getByTestId('textfield-input')).toBeDefined();

  expect(queryByPlaceholderText('Placeholder')).toBeNull();
  expect(queryByText('Label')).toBeNull();
  expect(queryByText('*')).toBeNull();
});

test('it shows placeholder and label', () => {
  const placeholder = 'Placeholder';
  const label = 'Label';

  const { getByText, getByPlaceholderText } = render(
    <TextField
      name="test"
      placeholder={placeholder}
      label={label}
      isRequired
    />,
    { wrapper },
  );

  expect(getByPlaceholderText(placeholder)).toBeDefined();
  expect(getByText(label)).toBeDefined();
  expect(getByText('*')).toBeDefined();
});

test('it shows password correctly', async () => {
  const password = 'Password';

  const { getByTestId, getByRole } = render(
    <TextField name="test" password />,
    { wrapper },
  );

  const input = getByTestId('textfield-input');
  expect(input.props).toHaveProperty('secureTextEntry', true);

  const button = getByRole('button');
  expect(button).toBeDefined();

  fireEvent.press(button);
  expect(input.props).toHaveProperty('secureTextEntry', false);
});

test('it shows error as asked by schema', async () => {
  const error = 'Test field is required';

  const { getByTestId, queryByText } = render(
    <TestRoot>
      <Formik
        initialValues={{}}
        onSubmit={jest.fn()}
        validate={(values: any) => {
          const errors = {} as any;
          if (!values.test) {
            errors.test = error;
          }
          return errors;
        }}
      >
        <TextField name="test" />
      </Formik>
    </TestRoot>,
  );

  const input = getByTestId('textfield-input');
  expect(input).toBeDefined();

  expect(queryByText(error)).toBeNull();

  fireEvent(input, 'onBlur');
  await waitFor(() => expect(queryByText(error)).toBeDefined());
});
