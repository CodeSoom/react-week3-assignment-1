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

  context('without tasks', () => {
    it('renders no task message', () => {
      const tasks = [];

      const { getByText } = renderList(tasks);

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '과제1' },
      { id: 2, title: '과제2' },
      { id: 3, title: '과제3' },
    ];

    it('renders tasks', () => {
      const { getByText } = renderList(tasks);

      expect(getByText(/과제1/)).not.toBeNull();
      expect(getByText(/과제2/)).not.toBeNull();
      expect(getByText(/과제3/)).not.toBeNull();
    });

    it('renders "완료" button to delete a task', () => {
      const { getAllByText } = renderList(tasks);

      const renderedItems = getAllByText('완료');

      expect(renderedItems.length).toBe(tasks.length);

      fireEvent.click(renderedItems[0]);
      expect(handleClickDeleteTask).toBeCalledWith(1);
    });
  });
});
