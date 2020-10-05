import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('ListWithTasks', () => {
  const tasks = [
    {
      id: 1,
      title: '할 일 하나',
    },
    {
      id: 2,
      title: '할 일 두울',
    },
  ];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toContainHTML('ol');
  expect(container).toContainHTML('li');

  expect(container).toHaveTextContent('할 일 하나');
  expect(container).toHaveTextContent('할 일 두울');
  expect(container).toHaveTextContent('완료');
});

test('ListWithoutTasks', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).not.toContainHTML('ol');
  expect(container).not.toContainHTML('li');

  expect(container).toHaveTextContent('할 일이 없어요!');
  expect(container).not.toHaveTextContent('완료');
});
