import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  const renderUtil = (tasks = []) => render((
    <List tasks={tasks} onClickDelete={handleClick} />
  ));

  context('test length is 0', () => {
    const tasks = [];

    it('할 일이 없어요! 표시', () => {
      const { container } = renderUtil(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('test length is over 1', () => {
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
      {
        id: 2,
        title: '할일2',
      },
      {
        id: 3,
        title: '할일2',
      },
    ];

    it('할 일 모두 표시', () => {
      const { container } = renderUtil(tasks);

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });
  });
});
