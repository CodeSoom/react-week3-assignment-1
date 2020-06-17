import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
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
  const handleClickDeleteButton = jest.fn();

  const { container, getAllByText } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDeleteButton}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('아무것도 하지 않기');
  expect(container).toHaveTextContent('코드숨 과제하기');

  const confirmButtons = getAllByText('완료');
  expect(handleClickDeleteButton).not.toBeCalled();
  confirmButtons.forEach((button) => fireEvent.click(button));
  expect(handleClickDeleteButton).toBeCalledTimes(tasks.length);
});


test('Empty List', () => {
  const tasks = [];

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={null}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
