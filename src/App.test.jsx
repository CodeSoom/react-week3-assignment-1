import React from 'react';
import { render } from '@testing-library/react';

import Page from './Page';

test('App', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  }];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const taskTitle = '';
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
  expect(container).toHaveTextContent('완료');
});
