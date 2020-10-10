import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const handleClickAddTask = jest.fn();

  const tasks = [
    { id: 1, title: '첫번째 할 일' },
    { id: 2, title: '두번째 할 일' },
  ];

  const { getByText } = render((
    <Page
      tasks={tasks}
      taskTitle="세번째 할 일"
      onClickDeleteTask={handleClickDeleteTask}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
    />
  ));

  expect(getByText('To-do')).not.toBeNull();
  expect(getByText('할 일')).not.toBeNull();

  expect(getByText(tasks[0].title)).not.toBeNull();
  expect(getByText(tasks[1].title)).not.toBeNull();

  fireEvent.click(getByText('추가'));

  expect(handleClickAddTask).toBeCalled();
});
