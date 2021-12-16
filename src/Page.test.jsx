import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const state = {
    taskTitle: '',
    onChangeTitle: jest.fn(),
    onClickAddTask: jest.fn(),
    tasks: [],
    onClickDeleteTask: jest.fn(),
  };

  const renderPage = (newState) => {
    const {
      taskTitle, onChangeTitle, onClickAddTask,
      tasks, onClickDelete,
    } = newState;

    return render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDeleteTask={onClickDelete}
      />,
    );
  };

  it('taskTitle 값이 제대로 전달되어야 한다.', () => {
    const value = '전달값';
    state.taskTitle = value;
    const { queryByDisplayValue } = renderPage(state);

    expect(queryByDisplayValue(value)).not.toBe(null);
  });

  it('tasks 데이터가 제대로 전달되어야 한다.', () => {
    const task = { id: 1, title: '타이틀' };
    state.tasks = [task];
    const { queryByText } = renderPage(state);

    expect(queryByText(task.title)).not.toBe(null);
  });
});
