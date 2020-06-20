import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const taskTitle = '새로운 할 일';

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  const tasks = [
    { id: 1, title: '야식먹기' },
    { id: 2, title: '잠자기' },
  ];
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

  expect(container).toHaveTextContent(tasks[0].title);
  expect(container).toHaveTextContent(tasks[1].title);
});
