import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const noTasks = [];

  const handleClickDelete = jest.fn();

  const { container: noTaskContainer } = render((
    <List
      tasks={noTasks}
      onClickDelete={handleClickDelete}
    />
  ));

  expect(noTaskContainer).toHaveTextContent('할 일이 없어요!');

  const tasks = [
    {
      id: 101,
      title: '아무 것도 하지 않기',
    },
    {
      id: 102,
      title: '뭐라도 하기',
    },
  ];

  const { container } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  expect(container).toHaveTextContent('아무 것도 하지 않기');
  expect(container).toHaveTextContent('뭐라도 하기');
});
