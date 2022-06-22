import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  const setUp = ({ tasks }) => render(
    <List
      tasks={tasks}
      onClickDelete={handleClick}
    />,
  );

  beforeEach(() => {
    handleClick.mockClear();
  });

  context('without tasks', () => {
    const tasks = [];

    it('renders fallback', () => {
      const { container } = setUp({ tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '할 일 1' },
      { id: 2, title: '할 일 2' },
      { id: 3, title: '할 일 3' },
    ];

    it('renders tasks list', () => {
      const { getAllByRole } = setUp({ tasks });

      const items = getAllByRole('listitem');
      expect(items.length).toBe(tasks.length);
    });
  });
});
