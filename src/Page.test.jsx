import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page 컴포넌트', () => {
  it('renders', () => {
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const tasks = [
      { id: 1, title: 'Task-1' },
      { id: 2, title: 'Task-2' },
    ];

    const { getByText } = render((
      <Page
        taskTitle=""
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(getByText(/Task-1/)).not.toBeNull();
    expect(getByText(/Task-2/)).not.toBeNull();

    fireEvent.click(getByText(/추가/));

    expect(handleClickAddTask).toBeCalled();
  });
});
