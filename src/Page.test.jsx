import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page Component', () => {
  const pageTitle = 'To-do';

  const defaultTaskTitle = '';
  const defaultTasks = [];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const init = () => render((
    <Page
      taskTitle={defaultTaskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={defaultTasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  it('has title label', () => {
    const { container } = init();
    expect(container).toHaveTextContent(pageTitle);
  });
});
