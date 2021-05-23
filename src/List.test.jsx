import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();
  function renderTasks(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />
    ));
  }

  context('List has task', () => {
    const tasks = [
      { id: 1, title: 'Task-1' },
      { id: 2, title: 'Task-2' },
    ];

    it('List text Render', () => {
      const { getByText } = renderTasks(tasks);

      expect(getByText(/Task-1/)).not.toBeNull();
      expect(getByText(/Task-2/)).not.toBeNull();
    });

    it('List button Test', () => {
      const { getAllByText } = renderTasks(tasks);
      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handleClick).toBeCalledWith(1);
    });
  });

  context('List is empty Test', () => {
    const tasks = [];
    it('render has empty THing', () => {
      const { getByText } = renderTasks(tasks);

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });
  });
});

// expect(container).toHaveTextContent('할 일이 없어요!');
