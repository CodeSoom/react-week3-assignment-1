import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List Component', () => {
  context('tasks empty', () => {
    it('show message 할 일이 없어요!', () => {
      const tasks = [];
      const onClickDelete = jest.fn();

      const { getByText } = render(
        <List
          tasks={tasks}
          onClickDelete={onClickDelete}
        />,
      );

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('have 2 tasks', () => {
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
      const onClickDelete = jest.fn();

      const { getByText } = render(
        <List
          tasks={tasks}
          onClickDelete={onClickDelete}
        />,
      );

      expect(getByText(tasks[0].title)).toBeInTheDocument();
      expect(getByText(tasks[1].title)).toBeInTheDocument();
    });
  });
});
