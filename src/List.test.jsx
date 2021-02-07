import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDeleteTask = jest.fn();
  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDeleteTask}
      />
    ));
  }

  context('without task', () => {
    it('show "할 일이 없어요!"', () => {
      const tasks = [];

      const { container } = renderList(tasks);

      expect(container).toHaveTextContent(/할 일이 없어요!/);
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: 'task-1' },
      { id: 2, title: 'task-2' },
    ];

    it('render tasks', () => {
      const { container } = renderList(tasks);
      expect(container).toHaveTextContent('task-1');
      expect(container).toHaveTextContent('task-2');
    });

    it('render "완료" button to delete task', () => {
      const { getAllByText } = renderList(tasks);
      const deleteButtons = getAllByText('완료');
      fireEvent.click(deleteButtons[0]);
      expect(handleClickDeleteTask).toBeCalled();
    });
  });
});
