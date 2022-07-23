import { render, screen } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  test('Renders', () => {
    const tasks = [];
    const taskTitle = '';

    const changeTitleHandler = jest.fn();
    const clickAddTaskHandler = jest.fn();
    const clickDeleteTaskHandler = jest.fn();

    render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={changeTitleHandler}
        onClickAddTask={clickAddTaskHandler}
        tasks={tasks}
        onClickDeleteTask={clickDeleteTaskHandler}
      />
    ));

    expect(screen.getByText('To-do')).toBeInTheDocument();
  });
});
