import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const tasks = [
    {
      newId: 1,
      taskTitle: '할 일 1',
    },
    {
      newId: 1,
      taskTitle: '할 일 1',
    },
    {
      newId: 1,
      taskTitle: '할 일 1',
    },
  ];

  const handleClick = jest.fn();

  it('renders items', () => {
    const { container } = render(
      (
        <List
          tasks={tasks}
          onClickDelete={handleClick}
        />
      ),
    );

    const renderedItems = getAllByText('완료');
    expect(renderedItems.length).toBe(tasks.length);
  });
});
