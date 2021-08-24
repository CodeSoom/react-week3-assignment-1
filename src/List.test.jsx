import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('without tasks', () => {
    it('shows placeholder text', () => {
      const tasks = [];

      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('shows task items', () => {
      const tasks = [
        { id: 100, title: 'test1' },
        { id: 101, title: 'test2' },
      ];

      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('test1');
      expect(container).toHaveTextContent('test2');
    });
  });
});
