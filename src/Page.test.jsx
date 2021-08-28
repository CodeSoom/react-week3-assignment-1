import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const tasks = [
    { id: 1, title: '아무것도 하지 않기 #1' },
    { id: 2, title: '아무것도 하지 않기 #2' },
  ];

  const { getByText } = render((
    <Page
      taskTitle=''
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  expect(getByText('아무것도 하지 않기 #1')).toBeInTheDocument();

  fireEvent.click(getByText('추가'));

  expect(handleClickAddTask).toBeCalled();
});
