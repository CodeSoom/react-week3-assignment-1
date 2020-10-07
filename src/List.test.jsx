import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const listRender = (tasks) => render((
    <List tasks={tasks} />
  ));

  context('without tasks', () => {
    const tasks = [];

    it('show "할 일이 없어요!"', () => {
      const { container } = listRender(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '첫번째 할 일' },
      { id: 2, title: '두번째 할 일' },
    ];

    it('show tasks list', () => {
      const { getAllByRole } = listRender(tasks);

      const taskTitles = getAllByRole('listitem');

      taskTitles.forEach((listItem, index) => {
        expect(listItem).toHaveTextContent(tasks[index].title);
      });
    });

    it('show delete button', () => {
      const { container } = listRender(tasks);

      expect(container).toHaveTextContent('완료');
    });
  });
});
