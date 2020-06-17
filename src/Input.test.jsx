import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const handleChange = jest.fn();
const handleClick = jest.fn();

test('Input - when type in then changes text field', () => {
  const value = '';

  const { getByPlaceholderText } = render((
    <Input
      id="input-task-title"
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(input, { target: { value: '테스트' } });

  expect(input.value).toBe('테스트');
});

test('Input - when click add then empty text field', () => {
  const value = '';
  const { getByPlaceholderText, getByText } = render((
    <Input
      id="input-task-title"
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(input, { target: { value: '테스트' } });

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalledTimes(1);

  expect(input.value).toBe('');
});
