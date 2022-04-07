import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('check there is task', () => {
    it('there is no task', () => {
      const tasks = [];
      const { container } = render((
        <List
          tasks={tasks}
        />
      ));
      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('there is task', () => {
      const tasks = [
        {
          id: 1,
          title: '1',
        },
      ];
      const { container } = render((
        <List
          tasks={tasks}
        />
      ));
      expect(container).not.toHaveTextContent('할 일이 없어요!');
    });
  });
});
