import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [
    {
      id: 1,
      title: '할일을 해야지',
    },
    {
      id: 2,
      title: '운동하기',
    },
  ];

  const handleClickDelete = jest.fn();

  const { container, getByText } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));
});
