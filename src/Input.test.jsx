import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  test('input value 입력 검사', () => {
    const value = '밥 먹고 3주차 강의 보기!';
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />,
    );
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(input).toHaveAttribute('value', '밥 먹고 3주차 강의 보기!');
  });

  test('handleChange 이벤트 검사', () => {
    const value = '';
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />,
    );
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();
    fireEvent.change(input, { target: { value: 'handleChange 이벤트 동작!' } });
    expect(handleChange).toBeCalled();
  });

  test('handleClick 이벤트 검사', () => {
    const value = '';
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const { getByText } = render(
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />,
    );
    const button = getByText('추가');

    expect(handleClick).not.toBeCalled();
    fireEvent.click(button);
    expect(handleClick).toBeCalled();
  });
});
