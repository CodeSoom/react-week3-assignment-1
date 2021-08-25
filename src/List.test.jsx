import { render } from '@testing-library/react';

import List from './List';

test('List without tasks', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List with tasks', () => {
  const tasks = [{
    id: 1,
    title: 'something',
  },
  {
    id: 2,
    title: 'nothing',
  }];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('something');
  expect(container).toHaveTextContent('nothing');
  expect(container).toHaveTextContent('완료');
});
