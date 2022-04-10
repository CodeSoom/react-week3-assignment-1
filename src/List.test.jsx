import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const taskList = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '맛있는 음식 먹기',
    },
  ];

  const handleClickDelete = jest.fn();

  function renderList({ tasks }) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with tasks', () => {
    it('renders task title', () => {
      const { container } = renderList({ tasks: taskList });

      taskList.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });

    it('calls handleClickDelete', () => {
      const { getAllByText } = renderList({ tasks: taskList });

      fireEvent.click(getAllByText('완료')[0]);

      expect(handleClickDelete).toBeCalledWith(1);
    });
  });

  context('without task', () => {
    it('renders message `할 일이 없어요!`', () => {
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
