import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { TestRoot } from '../../utils/testing';
import Screen from './Screen';
import { mockGoBack } from '../../__mocks__/@react-navigation/native';

jest.mock('@react-navigation/native');

const wrapper = TestRoot;

test('it works', () => {
  const title = 'Title';
  const content = 'Content';

  const { getByRole, getByText } = render(
    <Screen title={title} showBackButton>
      {content}
    </Screen>,
    { wrapper },
  );

  expect(getByText(title)).toBeDefined();
  expect(getByText(content)).toBeDefined();

  const button = getByRole('button');
  expect(button).toBeDefined();

  fireEvent.press(button);
  expect(mockGoBack).toBeCalled();
});
