import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Page from './Page';

test('Page', () => {
  const taskTitle = '';
  const tasks = [];
  const handleChangeTitle = jest.fn();
  const handleAddTask = jest.fn();
  const handleDeleteTask = jest.fn();
  const { container } = render(<Page
    taskTitle={taskTitle}
    onChangeTitle={handleChangeTitle}
    onClickAddTask={handleAddTask}
    tasks={tasks}
    onClickDeleteTask={handleDeleteTask}
  />);

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('Page', () => {
  const taskTitle = '';
  const tasks = [{ id: 1, title: '할 일이다' }];
  const handleChangeTitle = jest.fn();
  const handleAddTask = jest.fn();
  const handleDeleteTask = jest.fn();
  const { container, getByText } = render(<Page
    taskTitle={taskTitle}
    onChangeTitle={handleChangeTitle}
    onClickAddTask={handleAddTask}
    tasks={tasks}
    onClickDeleteTask={handleDeleteTask}
  />);

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일이다');
  expect(container).toHaveTextContent('완료');
  fireEvent.click(getByText('완료'));
  expect(handleDeleteTask).toBeCalledWith(1);
});
