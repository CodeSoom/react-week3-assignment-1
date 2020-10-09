import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Page from './Page';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Page', () => {
  const placeholderText = '할 일을 입력해 주세요';
  const emptyTasksText = '할 일이 없어요!';
  const addTaskButtonText = '추가';
  const deleteButtonText = '완료';
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const renderPage = ({ taskTitle, tasks }) => {
    const utils = render(<Page
      taskTitle={taskTitle}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />);

    return { ...utils };
  };

  function onChangeTitleTest() {
    const { getByRole } = screen;
    const input = getByRole('textbox');

    expect(onChangeTitle).not.toBeCalled();

    fireEvent.change(input, { target: { value: 'any' } });

    expect(onChangeTitle).toBeCalledTimes(1);
  }

  function onClickAddTaskTest() {
    const { getByText } = screen;

    expect(onClickAddTask).not.toBeCalled();

    fireEvent.click(getByText(addTaskButtonText));

    expect(onClickAddTask).toBeCalledTimes(1);
  }

  function onClickDeleteTaskTest(tasks) {
    const { getAllByText } = screen;
    const buttons = getAllByText(deleteButtonText);

    expect(buttons).toHaveLength(tasks.length);
    expect(onClickDeleteTask).not.toBeCalled();

    buttons.forEach((button) => fireEvent.click(button));

    expect(onClickDeleteTask).toBeCalledTimes(tasks.length);
  }

  context('without taskTitle', () => {
    const taskTitle = '';

    context('without tasks', () => {
      const tasks = [];

      it('check elements', () => {
        const { getByText, getByPlaceholderText } = renderPage({ taskTitle, tasks });

        getByPlaceholderText(placeholderText);
        getByText(addTaskButtonText);
        getByText(emptyTasksText);
      });

      it('check functions', () => {
        renderPage({ taskTitle, tasks });

        onChangeTitleTest();
        onClickAddTaskTest();
      });
    });

    context('with tasks', () => {
      const tasks = [
        { id: 1, title: '아무것도 안하기' },
        { id: 2, title: '더욱 더 아무것도 안하기' },
        { id: 3, title: '본격적으로 아무것도 안하기' },
      ];

      it('check elements', () => {
        const { getByText, getByPlaceholderText } = renderPage({ taskTitle, tasks });

        getByPlaceholderText(placeholderText);
        getByText(addTaskButtonText);
        tasks.forEach((task) => getByText(task.title));
      });

      it('check functions', () => {
        renderPage({ taskTitle, tasks });

        onClickAddTaskTest();
        onChangeTitleTest();
        onClickDeleteTaskTest(tasks);
      });
    });
  });

  context('with taskTitle', () => {
    const taskTitle = 'some text';

    context('without tasks', () => {
      const tasks = [];

      it('check elements', () => {
        const { getByText, getByDisplayValue } = renderPage({ taskTitle, tasks });

        getByDisplayValue(taskTitle);
        getByText(addTaskButtonText);
        getByText(emptyTasksText);
      });

      it('check functions', () => {
        renderPage({ taskTitle, tasks });

        onChangeTitleTest();
        onClickAddTaskTest();
      });
    });

    context('with tasks', () => {
      const tasks = [
        { id: 1, title: '아무것도 안하기' },
        { id: 2, title: '더욱 더 아무것도 안하기' },
        { id: 3, title: '본격적으로 아무것도 안하기' },
      ];

      it('check elements', () => {
        const { getByText, getByPlaceholderText } = renderPage({ taskTitle, tasks });

        getByPlaceholderText(placeholderText);
        getByText(addTaskButtonText);
        tasks.forEach((task) => getByText(task.title));
      });

      it('check functions', () => {
        renderPage({ taskTitle, tasks });

        onClickAddTaskTest();
        onChangeTitleTest();
        onClickDeleteTaskTest(tasks);
      });
    });
  });
});
