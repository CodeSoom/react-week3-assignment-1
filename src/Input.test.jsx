import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Input from './Input';

describe('Input', () => {
  const taskTitle = '할일!';
  const handleChangeTitle = jest.fn();
  const handleClick = jest.fn();

  const renderElement = (
    <Input
      value={taskTitle}
      onChange={handleChangeTitle}
      onClick={handleClick}
    />
  );

  test('value 입력 테스트', () => {
    const { getByPlaceholderText } = render(renderElement);
    const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
    expect(inputElement.value).toBe('할일!');
  });

  test('handleChange 동작 테스트', () => {
    const { getByPlaceholderText } = render(renderElement);
    const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
    expect(handleChangeTitle).not.toBeCalled();
    fireEvent.change(inputElement, { target: { value: '할일 테스트!' } });
    expect(handleChangeTitle).toBeCalled();
  });

  test('handleClick 동작 테스트', () => {
    const { getByText } = render(renderElement);
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
