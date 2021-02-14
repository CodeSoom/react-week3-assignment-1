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

  function renderPage() {
    return render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
  }

  it('render Head Title', () => {
    const { getByText } = renderPage();

    expect(getByText(/To-do/)).not.toBeNull();
  });

  it('render button "추가" to add task', () => {
    const { getByText } = renderPage();

    const addButton = getByText(/추가/);

    expect(handleClickAddTask).not.toBeCalled();

    fireEvent.click(addButton);

    expect(handleClickAddTask).toBeCalled();
  });

  it('render button input to write task', () => {
    const { getByLabelText } = renderPage();

    const input = getByLabelText('할 일');

    expect(handleChangeTitle).not.toBeCalled();

    fireEvent.change(input, { target: { value: 'dd' } });

    expect(handleChangeTitle).toBeCalled();
  });

  it('render tasks', () => {
    const { getByText } = renderPage();

    expect(getByText(/오늘은 무엇을 해볼까/)).not.toBeNull();
  });
});
