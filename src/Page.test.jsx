import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

// TODO: Page 컴포넌트 테스트 작성
// 1. Page render 확인
// 2. 각 상태 기능 생성

describe('Page', () => {
  const taskTitle = '';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const tasks = [
    { id: 1, title: '오늘은 무엇을 해볼까?' },
  ];

  it('render Head Title', () => {
    const { getByText } = render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    expect(getByText(/To-do/)).not.toBeNull();
    expect(getByText(/오늘은 무엇을 해볼까/)).not.toBeNull();
  });

  it('render button "추가" to add task', () => {
    const { getByText } = render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));

    const addButton = getByText(/추가/);

    expect(handleClickAddTask).not.toBeCalled();

    fireEvent.click(addButton);

    expect(handleClickAddTask).toBeCalled();
  });
});
