import React from 'react';

import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const taskTitle = '아무것도 하지 않기';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByLabelText } = render((
    <Input onClick={handleClick} onChange={handleChange} />
  ));
  const input = getByLabelText('할 일');
  const button = getByText('추가');

  expect(container).toHaveTextContent('추가');

  test('할일 입력', () => {
    expect(input).toHaveDisplayValue('');
    expect(handleChange).not.toBeCalled();

    fireEvent.change(input, { target: { value: taskTitle } });

    expect(handleChange).toBeCalled();
    expect(input).toHaveDisplayValue('아무것도 하지 않기');
  });

  test('추가 버튼 클릭', () => {
    fireEvent.click(button, handleClick);
    expect(input).toHaveDisplayValue('');
  });
});
