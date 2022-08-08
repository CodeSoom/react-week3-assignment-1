import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const emptyTask = [];
  const Tasks = [
    {
      id: 1,
      title: 'hello1',
    },
    {
      id: 2,
      title: 'hello2',
    },
  ];

  const { container: emptyTaskContainer } = render((
    <List
      tasks={emptyTask}
    />
  ));

  const { container: tasksContainer } = render((
    <List
      tasks={Tasks}
    />
  ));

  expect(emptyTaskContainer).toHaveTextContent('할 일이 없어요!');
  expect(tasksContainer).toHaveTextContent('hello1');
  expect(tasksContainer).toHaveTextContent('hello2');
});
