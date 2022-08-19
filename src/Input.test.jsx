import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Input from './Input';

test('Initial Conditions', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container } = render(
    <Input onChange={handleChange} onClick={handleClick} />,
  );
  const input = container.querySelector('input');

  expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
  expect(container).toHaveTextContent('추가');
  expect(handleClick).not.toBeCalled();
  expect(handleChange).not.toBeCalled();
});

test('Click button to add task', () => {
  const handleClick = jest.fn();

  const { getByText } = render(
    <Input onClick={handleClick} />,
  );

  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
});

test('Change the value of input', () => {
  const handleChange = jest.fn();

  const { container } = render(
    <Input onChange={handleChange} />,
  );

  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: '안녕?' } });
  expect(handleChange).toBeCalled();
});
