import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const state = {
    taskTitle: '',
    onChangeTitle: jest.fn(),
    onClickAddTask: jest.fn(),
    tasks: [],
    onClickDelete: jest.fn(),
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

  beforeEach(() => {
    delete state.taskTitle;
    state.tasks = [];
  });

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

  it('onChangeTitle 이벤트 핸들러 함수가 정상적으로 작동해야 한다.', () => {
    const { queryByDisplayValue } = renderPage(state);
    const inputElement = queryByDisplayValue('');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(state.onChangeTitle).toBeCalled();
  });

  it('onClickAddTask 이벤트 핸들러 함수가 정상적으로 작동해야 한다.', () => {
    const { queryByText } = renderPage(state);
    const buttonElement = queryByText('추가');

    fireEvent.click(buttonElement);

    expect(state.onClickAddTask).toBeCalled();
  });

  it('onClickDelete 이벤트 핸들러 함수가 정상적으로 작동해야 한다.', () => {
    const task = { id: 1, title: '타이틀' };
    state.tasks = [task];

    const { queryByText } = renderPage(state);
    const buttonElement = queryByText('완료');

    fireEvent.click(buttonElement);

    expect(state.onClickDelete).toBeCalled();
  });
});
