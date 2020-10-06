import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const tasks = [];
  const taskTitle = '';

  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  const { container } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      onClickDeleteTask={handleClickDelete}
      tasks={tasks}
    />
  ));

  context('render', () => {
    it('visible', () => {
      expect(container).toBeVisible();
    });
  });
});
