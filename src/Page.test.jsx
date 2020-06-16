import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const taskTitle = [];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const tasks = [];
  const handleClickDelete = jest.fn();

  const { container } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDelete}
    />
  ));

  expect(container).toHaveTextContent('To-do');
});
