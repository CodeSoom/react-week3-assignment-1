import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const taskTitle = '';
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByLabelText, getByText } = render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  const input = getByLabelText('할 일');
  const button = getByText('추가');

  test('초기 값', () => {
    expect(container).toHaveTextContent('할 일');
    expect(input).toHaveDisplayValue('');
    expect(container).toHaveTextContent('추가');
  });

  test('값 입력', () => {
    fireEvent.change(input, { target: { value: '입력 값' } });
    expect(input).toHaveDisplayValue('입력 값');
  });

  test('추가 버튼 클릭', () => {
    fireEvent.click(button);
    expect(input).toHaveDisplayValue = '';
  });
});
