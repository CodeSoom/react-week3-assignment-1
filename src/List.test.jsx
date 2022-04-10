import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const sampleTasks = [
    { id: 100, title: '운동하기' },
    { id: 101, title: '공부하기' },
  ];

  const handleClickDeleteTask = jest.fn();

  const renderList = ({ tasks }) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDeleteTask}
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

    it('calls handleClickDeleteTask', () => {
      const { container, getAllByText } = renderList({ tasks: sampleTasks });

      expect(container).toHaveTextContent('운동하기');
      expect(container).toHaveTextContent('공부하기');
      expect(handleClickDeleteTask).not.toBeCalled();

      sampleTasks.forEach((task, index) => {
        fireEvent.click(getAllByText('완료')[index]);
        expect(handleClickDeleteTask).toBeCalledWith(task.id);
      });
    });
  });

  context('without task', () => {
    it('renders message `할 일이 없어요!`', () => {
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
