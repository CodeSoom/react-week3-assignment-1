import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  test('taskTitle, tasks props 검사', () => {
    const taskTitle = '밥 먹고 3주차 강의 보기!';
    const tasks = [
      {
        id: 100,
        title: '통과하지 못하는 테스트 작성(RED)',
      },
      {
        id: 101,
        title: '테스트를 통과하는 코드 작성(GREEN)',
      },
      {
        id: 102,
        title: '결과 코드를 깔끔하게 리팩터링(REFACTORING)',
      },
    ];
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const onClickDeleteTask = jest.fn();
    const { container, getByPlaceholderText } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDeleteTask={onClickDeleteTask}
      />,
    );
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(input).toHaveValue(taskTitle);
    expect(container).toHaveTextContent('통과하지 못하는 테스트 작성(RED)');
    expect(container).toHaveTextContent('테스트를 통과하는 코드 작성(GREEN)');
    expect(container).toHaveTextContent('결과 코드를 깔끔하게 리팩터링(REFACTORING)');
  });

  test('onChangeTitle 이벤트 검사', () => {
    const taskTitle = '';
    const tasks = [];
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const onClickDeleteTask = jest.fn();
    const { getByPlaceholderText } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDeleteTask={onClickDeleteTask}
      />,
    );
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(input).toHaveValue(taskTitle);
    expect(onChangeTitle).not.toBeCalled();
    fireEvent.change(input, { target: { value: 'onChangeTitle 이벤트 동작!' } });
    expect(onChangeTitle).toBeCalled();
  });

  test('onClickAddTask 이벤트 검사', () => {
    const taskTitle = '';
    const tasks = [];
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const onClickDeleteTask = jest.fn();
    const { getByText } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDeleteTask={onClickDeleteTask}
      />,
    );
    const button = getByText('추가');

    expect(onClickAddTask).not.toBeCalled();
    fireEvent.click(button);
    expect(onClickAddTask).toBeCalled();
  });

  test('onClickDeleteTask 이벤트 검사', () => {
    const taskTitle = '';
    const tasks = [
      {
        id: 100,
        title: '통과하지 못하는 테스트 작성(RED)',
      },
    ];
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const onClickDeleteTask = jest.fn();
    const { getByText } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDeleteTask={onClickDeleteTask}
      />,
    );
    const button = getByText('완료');

    expect(onClickDeleteTask).not.toBeCalled();
    fireEvent.click(button);
    expect(onClickDeleteTask).toBeCalledWith(100);
  });
});
