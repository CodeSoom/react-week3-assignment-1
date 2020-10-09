import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Page Component', () => {
  const pageTitle = 'To-do';

  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const init = ({
    taskTitle = '',
    handleChangeTitle = onChangeTitle,
    handleClickAddTask = onClickAddTask,
    tasks = [],
    handleClickDeleteTask = onClickDeleteTask,
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

  test('has title label', () => {
    const { container } = init({});
    expect(container).toHaveTextContent(pageTitle);
  });
});
