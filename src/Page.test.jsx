import React from 'react';
import { render, screen } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [{
    id: 1,
    title: '운동하기',
  }];
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  render(
    <Page
      taskTitle
      tasks={tasks}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  expect(screen.getByText('To-do')).toBeInTheDocument();

  expect(screen.getByText('할 일')).toBeInTheDocument();

  expect(screen.getByRole('list')).toBeInTheDocument();
});
