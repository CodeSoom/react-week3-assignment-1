import { render } from '@testing-library/react';

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
    it('task 수 만큼 아이템이 보여야 한다.', () => {
      const tasks = [{
        id: 1,
        title: '뭐라도 하기1',
      },
      {
        id: 2,
        title: '뭐라도 하기2',
      }];

      const { container, getAllByTestId } = renderList(tasks);

      expect(container).not.toHaveTextContent('할 일이 없어요!');

      const countOfItems = getAllByTestId('task-item').length;
      expect(countOfItems).toBe(tasks.length);
    });
  });
});
