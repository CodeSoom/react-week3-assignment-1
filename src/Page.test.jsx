import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page 화면 구현', () => {
  const taskTitle = '할일';
  const tasks = [];

  const handleChangeTitle = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const handleClickAddTask = jest.fn();

  const { container } = render((
    <Page
      taskTitle={taskTitle}
      tasks={tasks}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  expect(container).toHaveTextContent('To-do');
});
