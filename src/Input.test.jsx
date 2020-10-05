import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const value = '할 일 타이틀';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input value={value} onChange={handleChange} onClick={handleClick} />
  ));

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(input).toHaveDisplayValue('할 일 타이틀');

  test('추가버튼을 클릭했을 때', () => {
    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(input).toHaveDisplayValue('');

    expect(handleClick).toBeCalled();
  });

  test('input창에 문자를 입력했을 때', () => {
    expect(handleChange).not.toBeCalled();

    fireEvent.change(input, { target: { value: '입력한 문자' } });

    // expect(handleChange).toBeCalled();
  });
});
