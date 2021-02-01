import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('When List have several Task', () => {
  const tasks = [
    { id: 1, title: '볶음밥 만들기' },
    { id: 2, title: '누워있기' },
    { id: 3, title: '계속 누워있기' },
  ];

  const onClickDelete = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));

  expect(container).toHaveTextContent('볶음밥 만들기');
  expect(container).toHaveTextContent('누워있기');
  expect(container).toHaveTextContent('계속 누워있기');
});

test('Nothing to do', () => {
  const tasks = [];

  const onClickDelete = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
