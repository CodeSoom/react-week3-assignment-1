import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
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


});
