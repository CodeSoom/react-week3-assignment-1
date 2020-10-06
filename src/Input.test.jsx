import React from 'react';

import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const setup = ({ handleChange = jest.fn(), handleClick = jest.fn() }) => {
    const utils = render(<Input onClick={handleClick} onChange={handleChange} />);
    const { getByLabelText, getByText } = utils;
    const input = getByLabelText('할 일');
    const button = getByText('추가');
    const taskTitle = '아무것도 하지 않기';

    return {
      ...utils,
      input,
      button,
      taskTitle,
    };
  };

  test('할일 입력', () => {
    const handleChange = jest.fn();
    const { input, taskTitle } = setup({ handleChange });

    expect(input).toHaveDisplayValue('');
    expect(handleChange).not.toBeCalled();

    fireEvent.change(input, { target: { value: taskTitle } });

    expect(handleChange).toBeCalled();
    expect(input).toHaveDisplayValue(taskTitle);
  });

  test('추가 버튼 클릭', () => {
    const handleClick = jest.fn();
    const { input, button, taskTitle } = setup({ handleClick });

    expect(handleClick).not.toBeCalled();

    fireEvent.change(input, { target: { value: taskTitle } });

    fireEvent.click(button);

    expect(handleClick).toBeCalled();
    expect(input).toHaveDisplayValue('');
  });
});
