import { render } from '@testing-library/react';

import List from './List';

test('List is Empty', () => {
  const tasks = [];

  const { container } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List is Rendered', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '아무것도 하지 않기',
    },
  ];

  const { getAllByRole } = render((
    <List tasks={tasks} />
  ));

  const items = getAllByRole('listitem');

  expect(items).toHaveLength(tasks.length);

  items.forEach((item, index) => {
    const task = tasks[index];

    expect(item).toHaveTextContent(task.title);
  });
});
