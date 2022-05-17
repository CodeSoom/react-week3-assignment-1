import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

test('todo input should be empty', () => {
  render(<Input />);

  const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

  expect(inputTodo.value).toBe('');
});

test('추가 button should be displayed', () => {
  render(<Input />);

  const addButton = screen.getByText('추가');

  expect(addButton).toBeInTheDocument();
});

test('todo input should be changed', () => {
  render(<Input />);

  const todo = '뭐라도 하기';

  const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(inputTodo, { target: { value: todo } });
  expect(inputTodo.value).toBe('뭐라도 하기');
});

test('onclick function should be called when add button is clicked', () => {
  const handleClick = jest.fn();

  const { getByText } = render((<Input onClick={handleClick} />));

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});

test('todo input should be empty after clicking add button', () => {
  const handleClick = jest.fn();

  const { getByText, getByPlaceholderText } = render((<Input onClick={handleClick} />));

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();

  expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe('');

});
