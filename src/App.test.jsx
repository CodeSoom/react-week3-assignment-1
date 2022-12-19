import { render, screen } from '@testing-library/react';

import Page from './Page';

describe('App', () => {
  it('taskTitle의 value는 input에 그대로 노출되어야 한다.', () => {
    const taskTitle = '테스크 타이틀';
    const tasks = [];

    const changeTaskTitle = jest.fn();
    const addTask = jest.fn();
    const deleteTask = jest.fn();

    render(
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={changeTaskTitle}
        onClickAddTask={addTask}
        onClickDeleteTask={deleteTask}
      />,
    );

    const title = screen.getByRole('textbox');
    expect(title).toHaveValue('테스크 타이틀');
  });
});
