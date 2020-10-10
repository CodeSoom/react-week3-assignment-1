import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page Component', () => {
  it('render', () => {
    const tasks = [];
    const taskTitle = '';

    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const { getByText } = render(
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    );

    expect(getByText('To-do')).toBeInTheDocument();
  });
});
