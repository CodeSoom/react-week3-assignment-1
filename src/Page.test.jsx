import React from 'react';
import { render } from '@testing-library/react';
import Page from './Page';

test('Page', () => {
  const taskTitle = '';
  const onChangeTitle = () => {};
  const onClickAddTask = () => {};
  const tasks = [];
  const onClickDeleteTask = () => {};
  const { container } = render(<Page
    taskTitle={taskTitle}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    tasks={tasks}
    onClickDeleteTask={onClickDeleteTask}
  />);

  expect(container).toHaveTextContent('To-do');
});

test('Page', () => {
  const taskTitle = '';
  const onChangeTitle = () => {};
  const onClickAddTask = () => {};
  const tasks = [];
  const onClickDeleteTask = () => {};
  const { container } = render(<Page
    taskTitle={taskTitle}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    tasks={tasks}
    onClickDeleteTask={onClickDeleteTask}
  />);

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('Page', () => {
  const taskTitle = '';
  const onChangeTitle = () => {};
  const onClickAddTask = () => {};
  const tasks = [{ id: 1, title: '할 일이다' }];
  const onClickDeleteTask = () => {};
  const { container } = render(<Page
    taskTitle={taskTitle}
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    tasks={tasks}
    onClickDeleteTask={onClickDeleteTask}
  />);

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일이다');
  expect(container).toHaveTextContent('완료');
});
