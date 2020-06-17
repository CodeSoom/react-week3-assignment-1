import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

describe('List', () => {
  it('No todo', () => {
    const todos = [];

    const { container } = render((
      <List
        tasks={todos}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('Have any todos', () => {
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

    expect(container).toHaveTextContent('Distribute new version');
    expect(container).toHaveTextContent('Fix critical error');
  });
});
