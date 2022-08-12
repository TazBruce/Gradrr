import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { TestRoot } from '../../utils/testing';
import BottomTabBar from './BottomTabBar';
import {
  mockNavigate,
  useNavigation,
} from '../../__mocks__/@react-navigation/native';

const wrapper = TestRoot;
const mockState = {
  index: 0,
  routeNames: ['Home', 'Profile'],
};

test('it works', () => {
  const props = {
    navigation: useNavigation(),
    state: mockState,
  } as any;

  const { getByText } = render(
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <BottomTabBar {...props} />,
    { wrapper },
  );

  const thisTab = getByText(mockState.routeNames[0]);
  expect(thisTab).toBeDefined();

  fireEvent.press(thisTab);
  expect(mockNavigate).toBeCalledWith(mockState.routeNames[0]);

  const otherTab = getByText(mockState.routeNames[1]);
  expect(otherTab).toBeDefined();

  fireEvent.press(otherTab);
  expect(mockNavigate).toBeCalledWith(mockState.routeNames[1]);
});
