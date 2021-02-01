import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

test('EmptyList', () => {
  const task = {};
  const tasks = [];

  const { container } = render((
    <List
      task={task}
      tasks={tasks}
    />
  ));
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };
  const tasks = [task];

  const { container } = render((
    <List
      key={task.id}
      tasks={tasks}
      tasksLen={tasks.length}
      task={task}
    />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
});
