import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';

import List from './List';

test('List', () => {
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 101,
  //     title: '뭐라도 하기',
  //   },
  // ]);
  const tasks = [
    {
      id: 101,
      title: '뭐라도 하기',
    },
  ];
  expect(tasks).toBe([
    {
      id: 101,
      title: '뭐라도 하기',
    },
  ]);
  const handleClickDelete = jest.fn();

  const { container, getByText } = render(
    <List tasks={tasks} onClickDelete={handleClickDelete} />
  );

  expect(container).toHaveTextContent('뭐라도 하기');

  // tasks.pop();
  // expect(tasks.length).toBe(0);

  // const { container2 } = render(
  //   <List tasks={tasks} onClickDelete={handleClickDelete} />
  // );

  expect(container).toHaveTextContent('할 일이 없어요!');
});

// test('sample', () => {
//   expect(1 + 1).toBe(2);
// });
