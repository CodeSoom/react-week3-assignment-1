import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '아무것도 하지 않기',
    },
    {
      id: 3,
      title: '코드숨 과제하기',
    },
  ];
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const {
    container, getByPlaceholderText, getByText, getAllByText,
  } = render((
    <Page
      taskTitle=""
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('아무것도 하지 않기');
  expect(container).toHaveTextContent('코드숨 과제하기');

  const taskInput = getByPlaceholderText('할 일을 입력해 주세요');
  expect(handleChangeTitle).not.toBeCalled();
  fireEvent.change(taskInput, { target: { value: '뭐라도 하기' } });
  expect(handleChangeTitle).toBeCalled();

  const addTaskButton = getByText('추가');
  expect(handleClickAddTask).not.toBeCalled();
  fireEvent.click(addTaskButton);
  expect(handleClickAddTask).toBeCalled();

  const confirmButtons = getAllByText('완료');
  expect(handleClickDeleteTask).not.toBeCalled();
  confirmButtons.forEach((button) => fireEvent.click(button));
  expect(handleClickDeleteTask).toBeCalledTimes(tasks.length);
});
