import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';

import Input from './Input';

test('1. input 컴포넌트 출력확인 ', () => {
  const onChange = jest.fn();
  render(<Input value="할일!" onChange={onChange} />);

  const label = screen.getByText('할 일');
  const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
  const button = screen.getByRole('button');

  expect(label).toHaveTextContent('할 일');
  expect(input.value).toBe('할일!');
  expect(button).toHaveTextContent('추가');
});

test('2. input 입력 확인', () => {
  const onChange = jest.fn();
  render(<Input onChange={onChange} />);

  const input = screen.getByPlaceholderText('할 일을 입력해 주세요');

  expect(onChange).not.toHaveBeenCalled();
  expect(input.value).toBe('');

  fireEvent.change(input, { target: { value: 'test code 작성하기' } });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(input.value).toBe('test code 작성하기');
});

test('3. 버튼클릭 확인', () => {
  const onClick = jest.fn();
  render(<Input onClick={onClick} />);

  expect(onClick).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalledTimes(1);
});
