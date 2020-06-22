import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  test('To-do 타이틀 활인', () => {
    const taskTitle = '';
    const tasks = [];
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const { getByText } = render((
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(getByText('To-do')).toBeTruthy();
  });

  test('Input, List 컴포넌트 확인', () => {
    const taskTitle = '';
    const tasks = [];
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();
    const { getByText, getByPlaceholderText } = render((
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(getByText('할 일')).toBeTruthy();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeTruthy();
    expect(getByText('추가')).toBeTruthy();
    expect(getByText('할 일이 없어요!')).toBeTruthy();
  });

  test('onClickDeleteTask 호출', () => {
    const taskTitle = '';
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    }];
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const { getByText } = render((
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(handleClickDeleteTask).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClickDeleteTask).toBeCalledWith(1);
  });
});
