import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [];
  const taskTitle = '';

  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  const { getByText, getByLabelText } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      onClickDeleteTask={handleClickDelete}
      tasks={tasks}
    />
  ));

  expect(getByText('To-do')).toHaveTextContent('To-do');
  expect(getByLabelText('할 일')).toHaveAttribute('type', 'text');
});
