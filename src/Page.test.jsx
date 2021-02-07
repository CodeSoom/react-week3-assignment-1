import React from 'react';

import { render } from '@testing-library/react';

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

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  it('할일이 없을때 "할일이 없어요!"라고 보여준다.', () => {
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

  it('input에 입력값을 표시한다.', () => {
    const inputValue = '입력값';
    const { getByPlaceholderText } = pageRender(
      inputValue,
      handleChangeTitle,
      handleClickAddTask,
      [],
      handleClickDeleteTask,
    );

    const placeholder = getByPlaceholderText('할 일을 입력해 주세요');

    expect(placeholder).toHaveValue(inputValue);
  });

  it('할일이 있을 때 모두 표시한다.', () => {
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
