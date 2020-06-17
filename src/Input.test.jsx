import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const { container, getByPlaceholderText } = render(<Input
    value={value}
    onChange={handleChange}
    onClick={handleClick}
  />);

  expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeTruthy();
  expect(container).toHaveTextContent('추가');
});

test('Input', () => {
  const value = '오늘 하루 일과!';
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const { container, getByPlaceholderText, getByText } = render(<Input
    value={value}
    onChange={handleChange}
    onClick={handleClick}
  />);

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  expect(input.value).toBe('오늘 하루 일과!');
  expect(container).toHaveTextContent('추가');
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
});
