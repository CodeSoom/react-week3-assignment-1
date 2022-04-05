import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { container } from 'codeceptjs';
import List from './List';

test('if there is no task', () => {
  const tasks = [];
  const { container } = render((
    <List
      tasks={tasks}
    />
  ));
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('if there is task', () => {
  const tasks = [
    {
      id: 1,
      title: '1',
    },
  ];
  const { container } = render((
    <List
      tasks={tasks}
    />
  ));
  expect(container).not.toHaveTextContent('할 일이 없어요!');
  expect(container).toHaveTextContent('완료');
});
