import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

const pageRender = (
  title, handleChangeTitle, handleClickAddTask, tasks, handleClickDeleteTask,
) => render(
  (
    <Page
      taskTitle={title}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ),
);

test('빈 todolist', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const { container, getByPlaceholderText } = pageRender(
    '',
    handleChangeTitle,
    handleClickAddTask,
    [],
    handleClickDeleteTask,
  );
  expect(container).toHaveTextContent('할 일이 없어요!');

  const placeholder = getByPlaceholderText('할 일을 입력해 주세요');
  expect(placeholder).toBeInTheDocument();
});

test('input에 입력값이 있을때', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const inputValue = '입력값';
  const { getByPlaceholderText } = pageRender(
    inputValue,
    handleChangeTitle,
    handleClickAddTask,
    [],
    handleClickDeleteTask,
  );

  const placeholder = getByPlaceholderText('할 일을 입력해 주세요');
  expect(placeholder).toHaveValue(inputValue);
});

test('할일 목록이 있는 todolist', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const tasks = [{ id: 1, title: '할일1' }, { id: 2, title: '할일2' }];

  const { container, getByText, getByPlaceholderText } = pageRender(
    '',
    handleChangeTitle,
    handleClickAddTask,
    tasks,
    handleClickDeleteTask,
  );

  expect(container).toHaveTextContent('할일1');
  expect(container).toHaveTextContent('할일2');

  const placeholder = getByPlaceholderText('할 일을 입력해 주세요');
  expect(placeholder).toBeInTheDocument();

  expect(handleChangeTitle).not.toBeCalled();
  fireEvent.change(placeholder, { target: { value: '낮잠 자기' } });
  expect(handleChangeTitle).toBeCalled();

  expect(handleClickAddTask).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClickAddTask).toBeCalled();
});
