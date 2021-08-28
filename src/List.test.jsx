import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const ListRender = (value) => render((
    <List
      tasks={value}
      onClickDelete={handleClickDelete}
    />
  ));

  context('tasks are empty', () => {
    it('it shows empty', () => {
      const tasks = [];

      const { getByText } = ListRender(tasks);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('tasks are not empty', () => {
    it('NotEmpty', () => {
      const tasks = [
        {
          id: 100,
          title: '할 일 1',
        },
        {
          id: 101,
          title: '할 일 2',
        },
      ];

      const { getByText } = ListRender(tasks);

      tasks.forEach((task) => {
        expect(getByText(task.title)).toBeInTheDocument();
      });
    });
  });
});
