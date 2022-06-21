import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List is Empty', () => {
  const tasks = [];

  const emptyText = '할 일이 없어요!';

  const { container, getByText } = render((
    <List tasks={tasks} />
  ));

  expect(container).toHaveTextContent(emptyText);

  expect(getByText(emptyText)).toBeInTheDocument();
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

  const handleClickDelete = jest.fn();

  const { getAllByRole } = render((
    <List tasks={tasks} />
  ));

  const items = getAllByRole('listitem');

  expect(items).toHaveLength(tasks.length);

  items.forEach((item, index) => {
    const task = tasks[index];

    expect(item).toHaveTextContent(task.title);
  });

  expect(handleClickDelete).not.toBeCalled();

  const completeButtons = getAllByRole('button');

  expect(completeButtons).toHaveLength(2);

  completeButtons.forEach((button) => {
    expect(button).toHaveTextContent('완료');
  });

  fireEvent.click(completeButtons[0]);

  expect(handleClickDelete).toBeCalled();
});
