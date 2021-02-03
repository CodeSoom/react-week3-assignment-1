import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

test('addedTaskViewed', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();
  const tasks = [{ id: 1, title: '안녕하세요' }];
  const { container, getByText, rerender } = render((
    <Page
      taskTitle="이게 외않되?"
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAdd}
      tasks={tasks}
      onClickDeleteTask={handleClickDelete}
    />
  ));

  expect(handleClickAdd).not.toBeCalled();
  fireEvent.click(getByText('추가'));

  expect(handleClickAdd).toBeCalled();

  rerender((
    <Page
      taskTitle=""
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAdd}
      tasks={[...tasks, { id: 2, title: '이게 외않되?' }]}
      onClickDeleteTask={handleClickDelete}
    />
  ));
  expect(container).toHaveTextContent('안녕하세요');
  expect(container).toHaveTextContent('이게 외않되?');
});
