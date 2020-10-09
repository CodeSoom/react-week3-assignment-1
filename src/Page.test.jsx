import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const taskTitle = 'test';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const tasks = [{
    id: 1,
    title: '공부하기',
  }];

  const { container } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('공부하기');
});
