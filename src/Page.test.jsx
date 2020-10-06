import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const placeholder = '할 일을 입력해 주세요';
  const emptyTasksText = '할 일이 없어요!';

  const setup = ({
    taskTitle, onChangeTitle = jest.fn(),
    onClickAddTask = jest.fn(), tasks, onClickDeleteTask = jest.fn(),
  }) => {
    const utils = render(<Page
      taskTitle={taskTitle}
      onChangeTitle={onChangeTitle}
      onClickAddTask={onClickAddTask}
      tasks={tasks}
      onClickDeleteTask={onClickDeleteTask}
    />);

    return { ...utils };
  };

  function onChangeTitleTest(input, onClickAddTask) {
    expect(onClickAddTask).not.toBeCalled();

    fireEvent.change(
      input,
      { target: { value: 'any' } },
    );

    expect(onClickAddTask).toBeCalledTimes(1);

    for (let i = 0; i < 4; i += 1) {
      fireEvent.change(
        input,
        { target: { value: `${i}` } },
      );
    }

    expect(onClickAddTask).toBeCalledTimes(5);
  }

  function onClickAddTaskTest(button, onClickAddTask) {
    expect(onClickAddTask).not.toBeCalled();

    fireEvent.click(button);

    expect(onClickAddTask).toBeCalledTimes(1);

    for (let i = 0; i < 8; i += 1) {
      fireEvent.click(button);
    }

    expect(onClickAddTask).toBeCalledTimes(9);
  }

  context('empty taskTitle', () => {
    const taskTitle = '';

    context('empty tasks', () => {
      const tasks = [];

      it('placeholder 확인', () => {
        const { getByPlaceholderText } = setup({ taskTitle, tasks });
        const input = getByPlaceholderText(placeholder);

        expect(input.getAttribute('placeholder')).toEqual(placeholder);
      });

      it('"할 일이 없어요!" 확인', () => {
        const { container } = setup({ taskTitle, tasks });

        expect(container).toHaveTextContent(emptyTasksText);
      });

      it('onChangeTitle 호출 확인', () => {
        const onChangeTitle = jest.fn();

        const { getByPlaceholderText } = setup({ taskTitle, tasks, onChangeTitle });

        onChangeTitleTest(getByPlaceholderText(placeholder), onChangeTitle);
      });

      it('onClickAddTask 호출 확인', () => {
        const onClickAddTask = jest.fn();

        const { getByText } = setup({ taskTitle, tasks, onClickAddTask });

        onClickAddTaskTest(getByText('추가'), onClickAddTask);
      });
    });

    context('exist tasks', () => {
      const tasks = [
        { id: 1, title: '아무것도 안하기' },
        { id: 2, title: '더욱 더 아무것도 안하기' },
        { id: 3, title: '본격적으로 아무것도 안하기' },
      ];

      it('placeholder 확인', () => {
        const { getByPlaceholderText } = setup({ taskTitle, tasks });
        const input = getByPlaceholderText(placeholder);

        expect(input.getAttribute('placeholder')).toEqual(placeholder);
      });

      it('tasks 확인', () => {
        const { container } = setup({ taskTitle, tasks });

        expect(container).toHaveTextContent(tasks[0].title);
        expect(container).toHaveTextContent(tasks[1].title);
        expect(container).toHaveTextContent(tasks[2].title);
      });

      it('완료 버튼 클릭시 onClickDeleteTask 호출 확인', () => {
        const onClickDeleteTask = jest.fn();

        const { getAllByText } = setup({ taskTitle, tasks, onClickDeleteTask });
        const buttons = getAllByText('완료');

        expect(onClickDeleteTask).not.toBeCalled();

        buttons.forEach((button) => fireEvent.click(button));

        expect(onClickDeleteTask).toBeCalledTimes(tasks.length);
      });

      it('onChangeTitle 호출 확인', () => {
        const onChangeTitle = jest.fn();

        const { getByPlaceholderText } = setup({ taskTitle, tasks, onChangeTitle });

        onChangeTitleTest(getByPlaceholderText(placeholder), onChangeTitle);
      });

      it('onClickAddTask 호출 확인', () => {
        const onClickAddTask = jest.fn();

        const { getByText } = setup({ taskTitle, tasks, onClickAddTask });

        onClickAddTaskTest(getByText('추가'), onClickAddTask);
      });
    });
  });

  context('exist taskTitle', () => {
    const taskTitle = 'some text';

    context('empty tasks', () => {
      const tasks = [];

      it('input.value equal taskTitle 확인', () => {
        const { getByDisplayValue } = setup({ taskTitle, tasks });
        const input = getByDisplayValue(taskTitle);

        expect(input.value).toEqual(taskTitle);
      });

      it('"할 일이 없어요!" 확인', () => {
        const { container } = setup({ taskTitle, tasks });

        expect(container).toHaveTextContent(emptyTasksText);
      });

      it('onChangeTitle 호출 확인', () => {
        const onChangeTitle = jest.fn();

        const { getByPlaceholderText } = setup({ taskTitle, tasks, onChangeTitle });

        onChangeTitleTest(getByPlaceholderText(placeholder), onChangeTitle);
      });

      it('onClickAddTask 호출 확인', () => {
        const onClickAddTask = jest.fn();

        const { getByText } = setup({ taskTitle, tasks, onClickAddTask });

        onClickAddTaskTest(getByText('추가'), onClickAddTask);
      });
    });

    context('exist tasks', () => {
      const tasks = [
        { id: 1, title: '아무것도 안하기' },
        { id: 2, title: '더욱 더 아무것도 안하기' },
        { id: 3, title: '본격적으로 아무것도 안하기' },
      ];

      it('input.value equal taskTitle 확인', () => {
        const { getByDisplayValue } = setup({ taskTitle, tasks });
        const input = getByDisplayValue(taskTitle);

        expect(input.value).toEqual(taskTitle);
      });

      it('tasks 확인', () => {
        const { container } = setup({ taskTitle, tasks });

        expect(container).toHaveTextContent(tasks[0].title);
        expect(container).toHaveTextContent(tasks[1].title);
        expect(container).toHaveTextContent(tasks[2].title);
      });

      it('완료 버튼 클릭시 onClickDeleteTask 호출 확인', () => {
        const onClickDeleteTask = jest.fn();

        const { getAllByText } = setup({ taskTitle, tasks, onClickDeleteTask });
        const buttons = getAllByText('완료');

        expect(onClickDeleteTask).not.toBeCalled();

        buttons.forEach((button) => fireEvent.click(button));

        expect(onClickDeleteTask).toBeCalledTimes(tasks.length);
      });

      it('onChangeTitle 호출 확인', () => {
        const onChangeTitle = jest.fn();

        const { getByPlaceholderText } = setup({ taskTitle, tasks, onChangeTitle });

        onChangeTitleTest(getByPlaceholderText(placeholder), onChangeTitle);
      });

      it('onClickAddTask 호출 확인', () => {
        const onClickAddTask = jest.fn();

        const { getByText } = setup({ taskTitle, tasks, onClickAddTask });

        onClickAddTaskTest(getByText('추가'), onClickAddTask);
      });
    });
  });
});
