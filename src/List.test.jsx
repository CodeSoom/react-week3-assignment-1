import { fireEvent, render } from '@testing-library/react';

import List from './List';
import Item from './Item';

test('List', () => {
  const tasks = [
    { id: 100, title: '운동가기' },
  ];

  const { container } = render(<List
    tasks={tasks}
  />);

  expect(tasks).toHaveLength(1);
  expect(container).toHaveTextContent('운동가기');
});

test('List2', () => {
  const tasks = [];

  const { container } = render(<List
    tasks={tasks}
  />);

  expect(tasks).toHaveLength(0);
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('List3', () => {
  const tasks = [
    { id: 100, title: '운동가기' },
  ];

  const handleClick = jest.fn();

  const { container } = render(<List
    tasks={tasks}
    onClickDelete={handleClick}
  />);

  fireEvent.click(container);

  expect(container).toHaveTextContent('완료');
});

test('List4', () => {
  const task = [
    { id: 100, title: '운동가기' },
  ];

  const handleClick = jest.fn();

  render(
    <Item
      key={task.id}
      task={task}
      onClickDelete={handleClick}
    />,
  );
});
