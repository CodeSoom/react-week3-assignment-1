import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = [];

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  input.value = '어렵다 어려워';
  fireEvent.change(input);
  expect(input.value).toBe('어렵다 어려워');

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
});
