import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List Component', () => {
  const onClickDelete = jest.fn();

  const renderList = (value) => render((
    <List
      tasks={value}
      onClickDelete={onClickDelete}
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

      expect(getByText(tasks[0].title)).toBeInTheDocument();
      expect(getByText(tasks[1].title)).toBeInTheDocument();
    });
  });
});
