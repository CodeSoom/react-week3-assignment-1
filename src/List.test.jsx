import { render } from '@testing-library/react';

import List from './List';

test('li가 없을 경우', () => {
  const tasks = [];
  const handleClickDelete = jest.fn();
  const { container } = render(
    <List tasks={tasks} onClickDelete={handleClickDelete} />
  );
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('li가 있을 경우', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '제발 뭐 좀 해라',
    },
  ];
  const handleClickDelete = jest.fn();

  const { getAllByRole } = render(
    <List tasks={tasks} onClickDelete={handleClickDelete} />
  );
  expect(getAllByRole('listitem')).toHaveLength(tasks.length);
});
