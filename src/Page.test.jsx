import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const taskTitle = '';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const tasks = [
    { id: 1, title: 'task-1' },
    { id: 2, title: 'task-2' },
  ];
  const { getByText } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  expect(getByText('task-1')).not.toBeNull();
  expect(getByText('task-2')).not.toBeNull();

  fireEvent.click(getByText('추가'));
  expect(handleClickAddTask).toBeCalled();
});
