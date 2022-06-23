import { render, fireEvent } from '@testing-library/react';

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

    it('renders titles of tasks', () => {
      const { container } = setUp({ tasks });

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('listens click events', () => {
      const { getAllByRole } = setUp({ tasks });

      expect(handleClick).not.toBeCalled();
      getAllByRole('button').forEach((button) => {
        fireEvent.click(button);
      });
      expect(handleClick).toBeCalledTimes(tasks.length);
    });
  });
});
