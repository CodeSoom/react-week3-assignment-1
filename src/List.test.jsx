import { render } from '@testing-library/react';

import List from './List';

describe('List component', () => {
  const handleClickDelete = jest.fn();
  const setup = (tasks = []) => render(<List tasks={tasks} onClickDelete={handleClickDelete} />);

  context('When tasks is empty', () => {
    it('render paragraph', () => {
      const { getByText } = setup();

      expect(getByText('할 일이 없어요!')).not.toBeNull();
    });
  });

  context('When tasks exist', () => {
    const tasks = [
      {
        id: 1,
        title: 'Task-1',
      },
      {
        id: 2,
        title: 'Task-2',
      },
      {
        id: 3,
        title: 'Task-3',
      },
    ];

    it('renders list', () => {
      const { getByText } = setup(tasks);

      tasks.forEach((task) => {
        expect(getByText(task.title)).not.toBeNull();
      });
    });
  });
});
