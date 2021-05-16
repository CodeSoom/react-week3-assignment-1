import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import Page from './Page';

test('page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const pageTitle = 'To-do';

  const label = '할 일';

  const tasks = [
    { id: 1, title: '뭐라도 하기' },
    { id: 2, title: '또 뭐라도 하기' },
  ];

  const { container, getByText } = render((
    <Page
      taskTitle=""
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('또 뭐라도 하기');
  expect(getByText(pageTitle)).toBeTruthy();
  expect(getByText(label)).toBeTruthy();

  fireEvent.click(getByText('추가'));

  expect(handleClickAddTask).toBeCalled();
});
