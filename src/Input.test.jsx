import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByRole } = render((
    <Input
      value="할 일을 입력중"
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(getByRole('button')).toHaveTextContent('추가');
  // Todo: test placeholder
  // Todo: test value
});
