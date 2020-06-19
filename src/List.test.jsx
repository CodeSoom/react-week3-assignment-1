import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('Display empty list', () => {
  context('when no task', () => {
    it('shows default text', () => {
      const tasks = [];
      const { queryByText } = render((
        <List
          tasks={tasks}
        />
      ));

      const list = queryByText('할 일이 없어요!');

      expect(list).toHaveTextContent('할 일이 없어요!');
    });
  });
});

describe('Display items', () => {
  const TASK1 = 'item #1';
  const TASK2 = 'item #2';

  context('when tasks exist', () => {
    it('list items', () => {
      const tasks = [{ id: 1, title: TASK1 }, { id: 2, title: TASK2 }];
      const { container } = render((
        <List
          tasks={tasks}
        />
      ));

      expect(container).toHaveTextContent(TASK1);
      expect(container).toHaveTextContent(TASK2);
    });
  });
});
