import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

test('Page - has no tasks', () => {
  const taskTitle = '';
  const tasks = [];

  const onChangeTitle = jest.fn();
  const onClickDeleteTask = jest.fn();
  const onClickAddTask = jest.fn();

  const { container } = render((
    <Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={onChangeTitle}
      onClickDeleteTask={onClickDeleteTask}
      onClickAddTask={onClickAddTask}
    />
  ));

  expect(onChangeTitle).not.toBeCalled();
  expect(onClickDeleteTask).not.toBeCalled();
  expect(onClickAddTask).not.toBeCalled();
});

test('Page - has title', () => {
  const taskTitle = '뭐라도 하기';
  const tasks = [];

  const onChangeTitle = jest.fn();
  const onClickDeleteTask = jest.fn();
  const onClickAddTask = jest.fn();

  const { container, getByText } = render((
    <Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={onChangeTitle}
      onClickDeleteTask={onClickDeleteTask}
      onClickAddTask={onClickAddTask}
    />
  ));

  expect(onChangeTitle).not.toBeCalled();
  expect(onClickDeleteTask).not.toBeCalled();
  expect(onClickAddTask).not.toBeCalled();

  fireEvent.click(getByText('추가'));

  expect(onChangeTitle).toBeCalled();
  expect(onClickAddTask).toBeCalled();
});
