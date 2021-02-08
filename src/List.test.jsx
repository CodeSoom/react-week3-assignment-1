import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('1. 할일이 없을 때', () => {
    it('할 일이 없어요! paragraph 출력', () => {
      const tasks = [];
      const { getByText } = render(<List tasks={tasks} />);

      const paragraph = getByText('할 일이 없어요!');

      expect(paragraph).toBeInTheDocument();
    });
  });

  context('2. 할일이 있을 때', () => {
    it('할일 list 출력', () => {
      const tasks = [
        {
          id: 1,
          title: 'push-up 100회',
        },
        {
          id: 2,
          title: 'squart 100회',
        },
        {
          id: 3,
          title: '달리기 10km',
        },
      ];
      const { getAllByRole } = render(<List tasks={tasks} />);

      const todoList = getAllByRole('listitem');

      expect(todoList[0]).toHaveTextContent('push-up 100회');
      expect(todoList[1]).toHaveTextContent('squart 100회');
      expect(todoList[2]).toHaveTextContent('달리기 10km');
    });
  });
});
