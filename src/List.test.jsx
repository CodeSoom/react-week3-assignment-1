import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

describe('List', () => {
  context('without todos', () => {
    it('renders empty message', () => {
      const todos = [];

      const { container } = render((
        <List
          tasks={todos}
        />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with todos', () => {
    it('renders todos', () => {
      const todos = [
        {
          id: 1,
          title: 'Distribute new version',
        }, {
          id: 2,
          title: 'Fix critical error',
        },
      ];

      const { container } = render((
        <List
          tasks={todos}
        />
      ));

      todos.forEach((element) => {
        expect(container).toHaveTextContent(element.title);
      });
    });
  });
});
