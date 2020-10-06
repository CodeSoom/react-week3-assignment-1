import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('List', () => {

  // with 3 tasks
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기1',
    },
    {
      id: 2,
      title: '뭐라도 하기2',
    },
    {
      id: 3,
      title: '뭐라도 하기3',
    },
  ];

  const { container, getAllByText, rerender } = render((
    <List tasks={tasks} />
  ));

  expect(getAllByText(/뭐라도 하기/)).toHaveLength(3);

  expect(getAllByText(/뭐라도 하기/)[0]).toHaveTextContent('뭐라도 하기1');
  expect(getAllByText(/뭐라도 하기/)[1]).toHaveTextContent('뭐라도 하기2');
  expect(getAllByText(/뭐라도 하기/)[2]).toHaveTextContent('뭐라도 하기3');

  // with empty task
  const emptyTask = [];
  rerender((<List tasks={emptyTask} />));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
