import { render } from '@testing-library/react';

import List from './List';

test('List에 tasks가 있을 때', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
  ];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('뭐라도 하기');
});

test('List에 tasks가 없을 떄', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});
