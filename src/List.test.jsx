import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const renderList = (tasks) => (
    render(<List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />)
  );

  context('task 가 없을 때', () => {
    it('"할 일이 없어요" 메시지를 보여준다', () => {
      const tasks = [];
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('task 아이템이 하나도 없어야 한다.', () => {
      const tasks = [];
      const { getAllByTestId } = renderList(tasks);

      expect(() => getAllByTestId('task-item').length).toThrowError();
    });
  });

  context('task 가 있을 떄', () => {
    it('task 들이 보여야 한다.', () => {
      const tasks = [
        { id: 1, title: 'Task-1' },
        { id: 2, title: 'Task-2' },
      ];

      const { getByText } = renderList(tasks);

      expect(getByText(/Task-1/)).not.toBeNull();
      expect(getByText(/Task-2/)).not.toBeNull();
    });

    it('"완료" 버튼을 누르면 task가 삭제된다.', () => {
      const tasks = [
        { id: 1, title: 'Task-1' },
        { id: 2, title: 'Task-2' },
      ];

      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      fireEvent.click(buttons[0]);

      expect(handleClickDelete).toBeCalledWith(1);
    });
  });
});
