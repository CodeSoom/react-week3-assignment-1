import React from 'react';

import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const taskTitle = '아무것도 하지 않기';

  test('할 일 입력', () => {
    const { getByLabelText } = render((
      <Input
        onClick={handleClick}
        onChange={handleChange}
      />
    ));
    const input = getByLabelText('할 일');

    expect(input).toHaveDisplayValue('');
    expect(handleChange).not.toBeCalled();

    fireEvent.change(input, { target: { value: taskTitle } });

    expect(handleChange).toBeCalled();
    expect(input).toHaveDisplayValue(taskTitle);
  });

  test('추가 버튼 클릭', () => {
    const { getByLabelText, getByText } = render((
      <Input
        onClick={handleClick}
        onChange={handleChange}
      />
    ));
    const input = getByLabelText('할 일');
    const button = getByText('추가');

    expect(handleClick).not.toBeCalled();

    fireEvent.change(input, { target: { value: taskTitle } });
    fireEvent.click(button);

    expect(handleClick).toBeCalled();
    expect(input).toHaveDisplayValue('');
  });
});
