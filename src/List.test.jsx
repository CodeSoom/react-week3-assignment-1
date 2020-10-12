import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List Component', () => {
  const handleClickDelete = jest.fn();

  const renderList = (value) => render((
    <List
      tasks={value}
      onClickDelete={handleClickDelete}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when tasks empty', () => {
    it('show default message', () => {
      const tasks = [];

      const { getByText } = renderList(tasks);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('when two tasks', () => {
    it('show tasks', () => {
      const tasks = [
        {
          id: 100,
          title: '첫번째 할일',
        },
        {
          id: 101,
          title: '두번째 할일',
        },
      ];

      const { getByText } = renderList(tasks);

      tasks.forEach((task) => {
        expect(getByText(task.title)).toBeInTheDocument();
      });
    });
  });
});
