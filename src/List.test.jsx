import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const sampleTasks = [
    { id: 100, title: '운동하기' },
    { id: 101, title: '공부하기' },
  ];

  const handleClickDelete = jest.fn();

  const renderList = ({ tasks }) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with tasks', () => {
    it('renders title', () => {
      const { container } = renderList({ tasks: sampleTasks });

      sampleTasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });
  });
});
