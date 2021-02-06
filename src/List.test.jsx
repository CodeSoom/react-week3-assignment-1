import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();
  const renderList = (tasks) => (
    render((
      <List tasks={tasks} onClickDelete={handleClick} />
    ))
  );

  context('when tasks is empty', () => {
    const tasks = [];

    it('show "할 일이 없어요!"', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('when tasks is not empty', () => {
    const tasks = [
      { id: 1, title: '엄' },
      { id: 2, title: '준' },
      { id: 3, title: '식' },
      { id: 4, title: '은' },
      { id: 5, title: ' 살아 있다' },
    ];

    it('show all tasks', () => {
      const { container } = renderList(tasks);

      tasks.forEach((task) => (
        expect(container).toHaveTextContent(task.title)
      ));
    });
  });
});
