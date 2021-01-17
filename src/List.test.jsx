import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const tasks = [
    { id: 101, title: '할일 1' },
    { id: 102, title: '할일 2' },
  ];

  const handleDeleteClick = jest.fn();

  const { container, rerender } = render((
    <List
      tasks={[]}
      onClickDelete={handleDeleteClick}
    />
  ));

  context('Without tasks', () => {
    it('show 할 일이 없어요!', () => {
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('With tasks', () => {
    it('show tasks', () => {
      rerender(
        <List
          tasks={tasks}
        />,
      );

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });
  });
});
