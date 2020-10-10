import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page Component', () => {
  const pageTitle = 'To-do';

  const init = ({
    taskTitle = '',
    handleChangeTitle = jest.fn(),
    handleClickAddTask = jest.fn(),
    tasks = [],
    handleClickDeleteTask = jest.fn(),
  }) => {
    const utils = render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
    return { ...utils };
  };

  it('has title label', () => {
    const { container } = init({});
    expect(container).toHaveTextContent(pageTitle);
  });
});
