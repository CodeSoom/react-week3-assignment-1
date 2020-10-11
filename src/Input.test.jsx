import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { getByPlaceholderText, getByText, getByRole } = render((
    <Input
      value="오늘 할 일"
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  expect(getByText('할 일')).not.toBeNull();
  expect(input).toHaveDisplayValue('오늘 할 일');
  expect(getByRole('button')).toHaveTextContent('추가');

  fireEvent.change(input, { target: { value: '낮에 할 일' } });

  expect(handleChange).toBeCalledTimes(1);

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalledTimes(1);
});
