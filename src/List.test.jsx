import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  describe('tasks exist', () => {
    const tasks = [
      { id: 1, title: 'Task-1' },
    ];

    it('render "완료" button to delete a task', () => {
      const { getByText } = renderList(tasks);

      expect(getByText('Task-1')).not.toBeNull();
    });

    it('render delete button to delete a task', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handleClickDelete).toBeCalled();
    });
  });

  describe('without task', () => {
    it('renders no task message', () => {
      const tasks = [];

      const { getByText } = renderList(tasks);

      expect(getByText('할 일이 없어요!')).not.toBeNull();
    });
  });
});
