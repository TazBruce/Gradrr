import React from 'react';
import { render } from '@testing-library/react-native';
import { TestRoot } from '../../utils/testing';
import Loader from './Loader';

const wrapper = TestRoot;

test('it works', () => {
  const { getByTestId } = render(<Loader />, { wrapper });

  expect(getByTestId('loader')).toBeDefined();
});
