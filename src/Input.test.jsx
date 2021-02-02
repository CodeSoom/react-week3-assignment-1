import React from 'react';
import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  render(
    <Input />,
  );
  expect().toHaveTextContent('할 일');
  expect().toHaveTextContent('완료');
});
