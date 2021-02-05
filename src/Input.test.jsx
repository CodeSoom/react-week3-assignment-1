import React from 'react';
import {
  fireEvent, render,
} from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();
  const inputRender = (value = '') => render(
    (<Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />),
  );
  test('1. label,input,button 출력확인', () => {
    const { getByText, getByPlaceholderText, getByRole } = inputRender('할일!');
    const label = getByText('할 일');
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const button = getByRole('button');

    expect(label).toHaveTextContent('할 일');
    expect(input.value).toBe('할일!');
    expect(button).toHaveTextContent('추가');
  });

  test('2. input change event 확인', () => {
    const { getByPlaceholderText } = inputRender();
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(onChange).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: 'test code 작성하기' } });

    expect(onChange).toHaveBeenCalled();
  });

  test('3. button click event 확인', () => {
    const { getByRole } = inputRender();

    expect(onClick).not.toHaveBeenCalled();

    fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });
});
