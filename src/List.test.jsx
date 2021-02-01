import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

test('EmptyList', () => {
  const tasks = [];

  const handleClick = jest.fn();

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />
  ));
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
  ];

  const { container } = render((
    <List
      tasks={tasks}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
});
