import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('task List', () => {
  const tasks = [
    {
      id: 1,
      title: '테스트 코드 작성',
    },
  ];

  const handleClick = jest.fn();

  const { container } = render((
    <List tasks={tasks} onClickDelete={handleClick} />
  ));

  expect(container).toHaveTextContent('테스트 코드 작성');
});

test('no data List', () => {
  const tasks = [];

  const handleClick = jest.fn();

  const { container } = render((
    <List tasks={tasks} onClickDelete={handleClick} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('tasks List', () => {
  const tasks = [
    {
      id: 1,
      title: '테스트 코드 작성',
    },
    {
      id: 2,
      title: '공부 하기',
    },
  ];

  const handleClick = jest.fn();

  const { container } = render((
    <List tasks={tasks} onClickDelete={handleClick} />
  ));

  expect(container).toHaveTextContent('테스트 코드 작성');
  expect(container).toHaveTextContent('공부 하기');
});
