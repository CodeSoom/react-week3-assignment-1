import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const renderList = (value) => render((
    <List
      tasks={value}
      onClickDelete={handleClickDelete}
    />
  ));

  context('when tasks empty', () => {
    it('it shows empty list', () => {
      const tasks = [];

      const { getByText } = renderList(tasks);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('when tasks more two', () => {
    it('it shows tasks list', () => {
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

      const { getByText } = renderList(tasks);

      tasks.forEach((task) => {
        expect(getByText(task.title)).toBeInTheDocument();
      });
    });
  });
});
