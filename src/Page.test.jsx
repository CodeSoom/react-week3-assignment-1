import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

test('subject is displayed', () => {
  const tasks = [];

  const { getByText } = render(<Page tasks={tasks} />);

  const subject = getByText('To-do');

  expect(subject).toBeInTheDocument();
});

test('todo input is empty and 추가 button is displayed', () => {
  const tasks = [];

  render(<Page tasks={tasks} />);

  const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');
  const addButton = screen.getByText('추가');

  expect(inputTodo.value).toBe('');
  expect(addButton).toBeInTheDocument();
});

test('todo input is changed', () => {
  const tasks = [];

  render(<Page tasks={tasks} />);

  const todo = '뭐라도 하기';

  const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(inputTodo, { target: { value: todo } });
  expect(inputTodo.value).toBe('뭐라도 하기');
});

test('onclick function is called when add button is clicked', () => {
  const tasks = [];

  const handleClick = jest.fn();

  const { getByText } = render(<Page tasks={tasks} onClickAddTask={handleClick} />);

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});

test('할 일이 없어요! is displayed when the task is empty', () => {
  const tasks = [];

  const { container } = render(<Page tasks={tasks} />);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('Item is displayed when the task is not empty', () => {
  const tasks = [{ id: 1, title: '뭐라도 하기' }];

  const { container } = render(<Page tasks={tasks} />);

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('완료');
});

test('onClickDelete is called when 완료 button is clicked', () => {
  const tasks = [{ id: 1, title: '뭐라도 하기' }];

  const handleClick = jest.fn();

  const { getByText } = render(<Page tasks={tasks} onClickDeleteTask={handleClick} />);

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});
