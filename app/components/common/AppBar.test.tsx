import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { TestRoot } from '../../utils/testing';
import AppBar from './AppBar';
import { mockGoBack } from '../../__mocks__/@react-navigation/native';

jest.mock('@react-navigation/native');

const wrapper = TestRoot;

test('it works', () => {
  const title = 'Title';

  const { queryByRole, getByText } = render(<AppBar title={title} />, {
    wrapper,
  });

  expect(getByText(title)).toBeDefined();
  expect(queryByRole('button')).toBeNull();
});

test('it works with back button', () => {
  const title = 'Title';

  const { getByRole } = render(<AppBar title={title} showBackButton />, {
    wrapper,
  });

  const button = getByRole('button');
  expect(button).toBeDefined();

  fireEvent.press(button);
  expect(mockGoBack).toBeCalled();
});
