import { render, screen } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  context('without todo items', () => {
    it('renders "할 일이 없어요!"', () => {
      const tasks = [];

      render(<List
        tasks={tasks}
        onClickDelete={handleClick}
      />);

      expect(screen.getByText(/할 일이 없어요/)).toBeInTheDocument();
    });
  });

  context('with todo items', () => {
    it('renders todo items', () => {
      const tasks = [{
        id: 100,
        title: 'something',
      }];

      render(<List
        tasks={tasks}
        onClickDelete={handleClick}
      />);

      expect(screen.getByText(/something/)).toBeInTheDocument();
    });
  });
});
