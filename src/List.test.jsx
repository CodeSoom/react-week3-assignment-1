import { render } from '@testing-library/react';

import List from './List';

test('List tasks', () => {
  const tasks = [
    {
      id: 101,
      title: '뭐라도 하기',
    },
  ];
  const handleClickDelete = jest.fn();

  const { container } = render(
    <List tasks={tasks} onClickDelete={handleClickDelete} />
  );

  expect(container).toHaveTextContent('뭐라도 하기');
});

test('List no tasks', () => {
  const tasks = [];
  const handleClickDelete = jest.fn();

  const { container } = render(
    <List tasks={tasks} onClickDelete={handleClickDelete} />
  );

  // expect(container).toHaveTextContent('뭐라도 하기');

  expect(container).toHaveTextContent('할 일이 없어요!');
});
