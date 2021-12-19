import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handlClickDelete = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handlClickDelete}
      />
    ))
  };

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: 'Task-1' },
      { id: 2, title: 'Task-2' },
    ];

    it('renders tasks with valid task list', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('Task-1');
      expect(container).toHaveTextContent('Task-2');
    })

    it('renders "완료" button to delete task', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handlClickDelete).toBeCalledWith(1);
    });
  })

  context('without tasks', () => {
    const tasks = [];

    it('render empty message with empty tasks', () => {
      const { container } = renderList(tasks);;

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  })
})

