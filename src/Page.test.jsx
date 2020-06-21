import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';
import { TASKS, TASK_TITLE } from './mocks/data';

test('Page', () => {
  const taskTitle = TASK_TITLE;

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const tasks = TASKS;
  const handleClickDelete = jest.fn();

  const { container, getByDisplayValue } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDelete}
    />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(getByDisplayValue(taskTitle)).toBeVisible();

  tasks.forEach(
    (task) => expect(container).toHaveTextContent(task.title),
  );
});
