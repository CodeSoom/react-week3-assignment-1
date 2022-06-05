import {
  fireEvent, getAllByText, render,
} from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('tasks가 비어 있으면', () => {
    const tasks = [];

    const onClickDelete = jest.fn();

    it('"할 일이 없어요!"가 나와야 한다.', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={onClickDelete} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(onClickDelete).not.toBeCalled();
    });
  });

  context('tasks가 있으면', () => {
    const tasks = [
      { id: 1, title: '아리 산책가기' },
      { id: 2, title: '공부하기' },
    ];

    const handleClickDelete = jest.fn();

    it('When : 리스트가 나와야 한다.', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={handleClickDelete} />
      ));

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });

      expect(handleClickDelete).not.toBeCalled();

      tasks.forEach((task, index) => {
        const button = getAllByText(container, '완료')[index];
        fireEvent.click(button);
        expect(handleClickDelete).toBeCalledWith(1);
      });
    });
  });
});
