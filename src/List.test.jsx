import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const taskList = [
    {
      id: 1,
      title: '코딩은',
    },
    {
      id: 2,
      title: '즐거워',
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

  context('with no task', () => {
    it('doesnt have task , renders 할 일이 없어요', () => {
      const { container } = renderList({ tasks: [] });
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with task', () => {
    it('renders tasks', () => {
      const { container } = renderList({ tasks: taskList });

      taskList.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });

    it('clicked 완료 button then calls handleClickDelete function', () => {
      const { getAllByText } = renderList({ tasks: taskList });

      fireEvent.click(getAllByText('완료')[0]);
      expect(handleClickDelete).toBeCalledWith(1);
    });
  });
});
