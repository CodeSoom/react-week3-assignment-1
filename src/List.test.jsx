import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));
  }

  describe('With tasks', () => {
    const tasks = [
      { id: 1, title: 'Task-1' },
      { id: 2, title: 'Task-2' },
    ];

    it('renders task', () => {
      const { getByText } = renderList(tasks);

      expect(getByText(/Task-1/)).not.toBeNull();
      expect(getByText(/Task-2/)).not.toBeNull();
    });

    it('renders "완료" buttons with tasks', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText(/완료/);

      fireEvent.click(buttons[1]);

      expect(onClickDelete).toBeCalledWith(2);
    });
  });

  describe('Without tasks', () => {
    it('renders no tasks message', () => {
      const tasks = [];

      const { getByText } = renderList(tasks);

      expect(getByText(/할 일이 없어요/)).not.toBeNull();
    });
  });
});
