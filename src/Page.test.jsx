import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const pageRender = (
    title, handleChangeTitle, handleClickAddTask, tasks, handleClickDeleteTask,
  ) => render(
    (
      <Page
        taskTitle={title}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ),
  );

  it('할일이 없을때 "할일이 없어요!"라고 보여준다.', () => {
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const { container, getByPlaceholderText } = pageRender(
      '',
      handleChangeTitle,
      handleClickAddTask,
      [],
      handleClickDeleteTask,
    );
    expect(container).toHaveTextContent('할 일이 없어요!');

    const placeholder = getByPlaceholderText('할 일을 입력해 주세요');

    expect(placeholder).toBeInTheDocument();
  });

  it('할일을 추가한다.', () => {
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const inputValue = '입력값';
    const { getByPlaceholderText, getByText } = pageRender(
      inputValue,
      handleChangeTitle,
      handleClickAddTask,
      [],
      handleClickDeleteTask,
    );

    const placeholder = getByPlaceholderText('할 일을 입력해 주세요');
    const button = getByText('추가');

    expect(handleChangeTitle).not.toBeCalled();
    fireEvent.change(placeholder, { target: { value: '잠자기' } });
    expect(handleChangeTitle).toBeCalled();

    expect(handleClickAddTask).not.toBeCalled();
    fireEvent.click(button);
    expect(handleClickAddTask).toBeCalled();
  });

  it('할일이 있을 때 모두 표시한다.', () => {
    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    const tasks = [{ id: 1, title: '할일1' }, { id: 2, title: '할일2' }];

    const { container } = pageRender(
      '',
      handleChangeTitle,
      handleClickAddTask,
      tasks,
      handleClickDeleteTask,
    );

    expect(container).toHaveTextContent('할일1');
    expect(container).toHaveTextContent('할일2');
  });
});
